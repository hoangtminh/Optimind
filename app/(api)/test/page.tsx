// =================================================================================
// page.tsx - Hệ thống theo dõi tập trung Optimind V5.1 (Web Version)
// =================================================================================

"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import {
	FaceLandmarker,
	FaceLandmarkerOptions,
	FaceLandmarkerResult,
	NormalizedLandmark,
	FilesetResolver,
	RunningMode,
} from "@mediapipe/tasks-vision";

import {
	Object3D,
	Object3DEventMap,
	Vector3,
	Line,
	LineBasicMaterial,
	BufferGeometry,
	BufferAttribute,
} from "three";

// Import Drawing3d từ file bạn cung cấp
import Drawing3d from "@/lib/Drawing3d";
import { DELEGATE_GPU, RUNNING_MODE_VIDEO } from "@/mediapipe/definitions";
// import { drawFaceConnection } from '@/lib/FaceLandmarkDetection';

// --- CONFIGURATION TỪ PYTHON ---
const CONFIG = {
	EAR_THRESH: 0.22,
	FOCUS_TIME: 2.0,
	PITCH_LIMIT: { MIN: -10, MAX: 15 },
	YAW_LIMIT: 20,
	MIN_CUTOFF: 0.05,
	BETA: 0.8,
	DL_CUTOFF: 1.0,
};

// =================================================================================
// LỚP ONEEUROFILTER (Giữ nguyên)
// =================================================================================

class OneEuroFilter {
	private freq: number;
	private min_cutoff: number;
	private beta: number;
	private d_cutoff: number;
	private x_prev: number = 0.0;
	private dx_prev: number = 0.0;
	private t_prev: number | null = null;

	constructor(min_cutoff = 1.0, beta = 0.0, d_cutoff = 1.0, freq = 30) {
		this.freq = freq;
		this.min_cutoff = min_cutoff;
		this.beta = beta;
		this.d_cutoff = d_cutoff;
	}

	private smoothingFactor(t_e: number, cutoff: number): number {
		const r = 2 * Math.PI * cutoff * t_e;
		return r / (r + 1);
	}

	private exponentialSmoothing(a: number, x: number, x_prev: number): number {
		return a * x + (1 - a) * x_prev;
	}

	public filter(t: number, x: number): number {
		if (this.t_prev === null) {
			this.t_prev = t;
			this.x_prev = x;
			this.dx_prev = 0.0;
			return x;
		}

		const t_e = t - this.t_prev;
		if (t_e <= 0) return this.x_prev;

		const a_d = this.smoothingFactor(t_e, this.d_cutoff);
		const dx = (x - this.x_prev) / t_e;
		const dx_hat = this.exponentialSmoothing(a_d, dx, this.dx_prev);

		const cutoff = this.min_cutoff + this.beta * Math.abs(dx_hat);
		const a = this.smoothingFactor(t_e, cutoff);

		const x_hat = this.exponentialSmoothing(a, x, this.x_prev);
		this.x_prev = x_hat;
		this.dx_prev = dx_hat;
		this.t_prev = t;

		return x_hat;
	}
}

// =================================================================================
// CÁC HÀM TÍNH TOÁN HÌNH HỌC (Giữ nguyên)
// =================================================================================

const LEFT_EYE_IDXS = [362, 385, 387, 266, 373, 380];
const RIGHT_EYE_IDXS = [33, 160, 158, 133, 153, 144];
const NOSE_IDX = 1;
const LEFT_EYE_INNER_IDX = 33;
const RIGHT_EYE_INNER_IDX = 266;

function euclideanDistance(
	p1: NormalizedLandmark,
	p2: NormalizedLandmark
): number {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function getEar(landmarks: NormalizedLandmark[]): number {
	const _ear = (idxs: number[]): number => {
		const p = idxs.map((i) => landmarks[i]);
		if (p.length !== 6) return 0;

		const v1 = euclideanDistance(p[1], p[5]);
		const v2 = euclideanDistance(p[2], p[4]);
		const hor = euclideanDistance(p[0], p[3]);

		return hor > 0 ? (v1 + v2) / (2.0 * hor) : 0;
	};

	const leftEar = _ear(LEFT_EYE_IDXS);
	const rightEar = _ear(RIGHT_EYE_IDXS);

	return (leftEar + rightEar) / 2.0;
}

function getOrientationVector(landmarks: NormalizedLandmark[]): {
	pitch: number;
	yaw: number;
	nose: Vector3;
} {
	if (
		!landmarks[NOSE_IDX] ||
		!landmarks[LEFT_EYE_INNER_IDX] ||
		!landmarks[RIGHT_EYE_INNER_IDX]
	) {
		return { pitch: 0, yaw: 0, nose: new Vector3(0, 0, 0) };
	}

	const nose = new Vector3(
		landmarks[NOSE_IDX].x,
		landmarks[NOSE_IDX].y,
		landmarks[NOSE_IDX].z
	);
	const lEye = new Vector3(
		landmarks[LEFT_EYE_INNER_IDX].x,
		landmarks[LEFT_EYE_INNER_IDX].y,
		landmarks[LEFT_EYE_INNER_IDX].z
	);
	const rEye = new Vector3(
		landmarks[RIGHT_EYE_INNER_IDX].x,
		landmarks[RIGHT_EYE_INNER_IDX].y,
		landmarks[RIGHT_EYE_INNER_IDX].z
	);

	const eyeCenter = lEye.clone().add(rEye).divideScalar(2);
	const vecNose = nose.clone().sub(eyeCenter);
	const vecEye = rEye.clone().sub(lEye);

	const faceNormal = vecEye.clone().cross(vecNose).normalize();

	let pitch = Math.asin(faceNormal.y) * (180.0 / Math.PI);
	let yaw = Math.atan2(faceNormal.x, faceNormal.z) * (180.0 / Math.PI);

	pitch = -pitch;
	yaw = -yaw;

	return { pitch, yaw, nose };
}

// =================================================================================
// HỆ THỐNG TRẠNG THÁI VÀ LOGIC
// =================================================================================

interface FocusState {
	status: string;
	color: string;
	score: number;
	rawPitch: number;
	rawYaw: number;
	relPitch: number;
	relYaw: number;
	ear: number;
	rawEar: number; // Thêm rawEar để hiển thị
}

const initialFocusState: FocusState = {
	status: "CHO CALIB...",
	color: "#808080",
	score: 100.0,
	rawPitch: 0,
	rawYaw: 0,
	relPitch: 0,
	relYaw: 0,
	ear: 0,
	rawEar: 0,
};

const FaceTrackingPage: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(
		null
	);
	const [isCalibrated, setIsCalibrated] = useState(false);
	const [basePitch, setBasePitch] = useState(0);
	const [baseYaw, setBaseYaw] = useState(0);
	const [focusState, setFocusState] = useState<FocusState>(initialFocusState);

	const filterPitch = useRef(
		new OneEuroFilter(CONFIG.MIN_CUTOFF, CONFIG.BETA, CONFIG.DL_CUTOFF)
	);
	const filterYaw = useRef(
		new OneEuroFilter(CONFIG.MIN_CUTOFF, CONFIG.BETA, CONFIG.DL_CUTOFF)
	);
	const filterEar = useRef(
		new OneEuroFilter(CONFIG.MIN_CUTOFF, CONFIG.BETA, CONFIG.DL_CUTOFF)
	);
	const eyeClosedStart = useRef<number | null>(null);

	const VIDEO_WIDTH = 640;
	const VIDEO_HEIGHT = 480;

	// --- 1. KHỞI TẠO MEDIA PIPE VÀ CAMERA ---
	useEffect(() => {
		const initMediapipe = async () => {
			const filesetResolver = await FilesetResolver.forVisionTasks(
				"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
			);

			const options: FaceLandmarkerOptions = {
				baseOptions: {
					modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task`,
					delegate: DELEGATE_GPU,
				},
				runningMode: RUNNING_MODE_VIDEO as RunningMode,
				numFaces: 1,
				outputFacialTransformationMatrixes: true,
				// refineLandmarks: true,
				minDetectionConfidence: 0.7,
				minTrackingConfidence: 0.7,
			};

			const landmarker = await FaceLandmarker.createFromOptions(
				filesetResolver,
				options
			);
			setFaceLandmarker(landmarker);
		};

		const initCamera = async () => {
			if (videoRef.current && canvasRef.current) {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: { width: VIDEO_WIDTH, height: VIDEO_HEIGHT },
					});
					videoRef.current.srcObject = stream;
					videoRef.current.onloadedmetadata = () => {
						videoRef.current?.play();
						// --- GỌI HÀM INIT CỦA Drawing3d ---
						Drawing3d.initRenderer(canvasRef.current!);
						Drawing3d.initScene(VIDEO_WIDTH, VIDEO_HEIGHT);
						Drawing3d.resizeCamera(VIDEO_WIDTH, VIDEO_HEIGHT);
						// ----------------------------------
						requestAnimationFrame(detectAndRender);
					};
				} catch (error) {
					console.error("Lỗi truy cập camera:", error);
				}
			}
		};

		initMediapipe();
		initCamera();

		return () => {
			if (videoRef.current && videoRef.current.srcObject) {
				const stream = videoRef.current.srcObject as MediaStream;
				stream.getTracks().forEach((track) => track.stop());
			}
			// Drawing3d không có hàm dispose trong file bạn cung cấp, nên tôi sẽ bỏ qua.
		};
	}, []);

	// --- 2. HÀM XỬ LÝ FRAME CHÍNH (TƯƠNG ĐƯƠNG process_frame) ---
	const detectAndRender = useCallback(async () => {
		const video = videoRef.current;
		const landmarker = faceLandmarker;

		if (video && landmarker && video.readyState >= 2) {
			const startTime = performance.now();
			const results: FaceLandmarkerResult | null =
				landmarker.detectForVideo(video, startTime);
			const currTime = startTime / 1000;

			Drawing3d.clearScene();

			if (results?.faceLandmarks?.length) {
				const landmarks = results.faceLandmarks[0];
				const { pitch: rawPitch, yaw: rawYaw } =
					getOrientationVector(landmarks);
				const rawEar = getEar(landmarks);

				// Filtering (Lọc)
				const ear = filterEar.current.filter(currTime, rawEar);
				const pitch = filterPitch.current.filter(currTime, rawPitch);
				const yaw = filterYaw.current.filter(currTime, rawYaw);

				if (isCalibrated) {
					// Cập nhật trạng thái
					const relPitch = pitch - basePitch;
					const relYaw = yaw - baseYaw;

					setFocusState((prev) => {
						const newState = evaluateState(
							prev,
							relPitch,
							relYaw,
							ear,
							currTime
						);
						return {
							...newState,
							rawPitch,
							rawYaw,
							relPitch,
							relYaw,
							ear,
							rawEar,
						};
					});

					// Vẽ Gaze Vector 3D
					const focusVector = drawGazeVector(
						landmarks,
						relPitch,
						relYaw,
						focusState.color,
						VIDEO_WIDTH,
						VIDEO_HEIGHT
					);
					if (focusVector) {
						Drawing3d.addToScene(focusVector);
					}
				} else {
					setFocusState((prev) => ({
						...prev,
						rawPitch,
						rawYaw,
						rawEar,
					}));
				}
			} else {
				setFocusState((prev) => ({
					...initialFocusState,
					status: "NO FACE DETECTED",
				}));
			}

			Drawing3d.render();
		}
		requestAnimationFrame(detectAndRender);
	}, [faceLandmarker, isCalibrated, basePitch, baseYaw, focusState.color]);

	// --- 3. LOGIC XỬ LÝ TRẠNG THÁI (evaluate_state) ---
	const evaluateState = (
		prev: FocusState,
		p: number,
		y: number,
		ear: number,
		currTime: number
	): FocusState => {
		let isSleeping = false;
		let newStatus = prev.status;
		let newColor = prev.color;
		let newScore = prev.score;

		// 1. Mắt
		if (ear < CONFIG.EAR_THRESH) {
			if (eyeClosedStart.current === null) {
				eyeClosedStart.current = currTime;
			} else if (currTime - eyeClosedStart.current > CONFIG.FOCUS_TIME) {
				newStatus = "NGU GAT !!!";
				newColor = "#FF0000"; // Red
				isSleeping = true;
				newScore = Math.max(0, newScore - 1.0);
			}
		} else {
			eyeClosedStart.current = null;
		}

		if (!isSleeping) {
			// 2. Tư thế
			if (p > CONFIG.PITCH_LIMIT.MAX) {
				newStatus = "CUI DAU (Hai co)";
				newColor = "#FFA500";
				newScore = Math.max(0, newScore - 0.1);
			} else if (p < CONFIG.PITCH_LIMIT.MIN) {
				newStatus = "NGUA DAU (Lo denh)";
				newColor = "#FFFF00";
			} else if (Math.abs(y) > CONFIG.YAW_LIMIT) {
				newStatus = "MAT TAP TRUNG";
				newColor = "#800080";
				newScore = Math.max(0, newScore - 0.2);
			} else {
				newStatus = "DANG TAP TRUNG";
				newColor = "#00FF00";
				newScore = Math.min(100, newScore + 0.05);
			}
		}

		return {
			...prev,
			status: newStatus,
			color: newColor,
			score: newScore,
		};
	};

	// --- 4. HÀM HIỆU CHUẨN (calibrate) ---
	const handleCalibrate = () => {
		if (
			faceLandmarker &&
			videoRef.current &&
			videoRef.current.readyState >= 2
		) {
			const results = faceLandmarker.detectForVideo(
				videoRef.current,
				performance.now()
			);
			if (results?.faceLandmarks?.length) {
				const landmarks = results.faceLandmarks[0];
				const { pitch, yaw } = getOrientationVector(landmarks);

				setBasePitch(pitch);
				setBaseYaw(yaw);
				setIsCalibrated(true);
				setFocusState((prev) => ({
					...prev,
					status: "DANG TAP TRUNG",
					color: "#00FF00",
				}));
				console.log(
					`[CALIB] Zero Point Set: Pitch=${pitch.toFixed(
						1
					)}, Yaw=${yaw.toFixed(1)}`
				);
			} else {
				alert("Không phát hiện khuôn mặt! Vui lòng căn chỉnh camera.");
			}
		}
	};

	// --- 5. HÀM VẼ GAZE VECTOR (Three.js) ---
	const drawGazeVector = (
		landmarks: NormalizedLandmark[],
		p: number,
		y: number,
		color: string,
		width: number,
		height: number
	): Line<BufferGeometry, LineBasicMaterial> | null => {
		const GAZE_SCALE = 5.0;
		const { nose } = getOrientationVector(landmarks);

		const offsetX = width / 2;
		const offsetY = height / 2;
		// Sử dụng hàm calculateDistance từ Drawing3d
		const dist = Drawing3d.calculateDistance(height);

		// Tọa độ Mũi (start point) trong không gian 3D (Three.js)
		// Lật ngược X
		const startX = -(width * nose.x - offsetX);
		const startY = -height * nose.y + offsetY;
		const startZ = dist;

		// Tính điểm cuối của vector (end point)
		const endX = startX + y * GAZE_SCALE;
		const endY = startY + p * GAZE_SCALE;
		const endZ = startZ;

		const geometry = new BufferGeometry();
		const positions = new Float32Array([
			startX,
			startY,
			startZ,
			endX,
			endY,
			endZ,
		]);

		geometry.setAttribute("position", new BufferAttribute(positions, 3));

		const material = new LineBasicMaterial({ color: color, linewidth: 3 });
		const line = new Line(geometry, material);

		return line;
	};

	// --- 6. RENDER GIAO DIỆN REACT ---
	return (
		<div className="flex flex-col items-center p-4 h-screen overflow-scroll">
			<h1 className="text-2xl font-bold mb-4">
				OPTIMIND V5.1 - HỆ THỐNG THEO DÕI TẬP TRUNG
			</h1>

			<div className="relative w-[640px] h-[480px] bg-gray-900 border-4 border-gray-700 rounded-lg overflow-hidden">
				{/* Video Feed (Lật gương CSS) */}
				<video
					ref={videoRef}
					className="w-full h-full object-cover transform scale-x-[-1]"
					muted
					playsInline
					width={VIDEO_WIDTH}
					height={VIDEO_HEIGHT}
				/>

				{/* Three.js/Canvas 3D Overlay */}
				<canvas
					ref={canvasRef}
					className="absolute top-0 left-0 w-full h-full"
					width={VIDEO_WIDTH}
					height={VIDEO_HEIGHT}
				/>

				{/* Calibration Overlay */}
				{!isCalibrated && (
					<div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white">
						<p className="text-xl font-bold">CALIBRATION</p>
						<p className="text-sm mt-2">
							Nhìn thẳng và bấm nút 'CALIBRATE' để đặt điểm 0.
						</p>
						<p className="text-xs mt-1 text-gray-400">
							Đang chờ khởi tạo model:{" "}
							{faceLandmarker ? "Đã sẵn sàng" : "..."}
						</p>
					</div>
				)}
			</div>

			<div className="mt-4 w-[640px] flex justify-between items-center">
				<button
					onClick={handleCalibrate}
					disabled={isCalibrated || !faceLandmarker}
					className={`px-4 py-2 rounded-lg font-semibold ${
						isCalibrated
							? "bg-gray-500 text-gray-300"
							: "bg-blue-600 text-white hover:bg-blue-700"
					} disabled:opacity-50`}
				>
					{isCalibrated ? "ĐÃ HIỆU CHUẨN" : "CALIBRATE"}
				</button>
				<button
					onClick={() => {
						setIsCalibrated(false);
						setFocusState(initialFocusState);
					}}
					className="px-4 py-2 rounded-lg font-semibold bg-yellow-600 text-white hover:bg-yellow-700"
				>
					RESET CALIB
				</button>
			</div>

			{/* HUD/Score Bar */}
			<div className="mt-4 p-4 w-[640px] bg-gray-800 text-white rounded-lg shadow-lg">
				<div className="flex justify-between items-center mb-2">
					<p
						className="text-xl font-bold"
						style={{ color: focusState.color }}
					>
						{focusState.status}
					</p>
					<p className="text-2xl font-extrabold">
						Score: {Math.round(focusState.score)}%
					</p>
				</div>

				<div className="w-full bg-gray-600 rounded-full h-3 mb-4">
					<div
						className="h-3 rounded-full"
						style={{
							width: `${focusState.score}%`,
							backgroundColor: focusState.color,
							transition: "width 0.5s ease",
						}}
					></div>
				</div>

				<div className="text-sm grid grid-cols-2 gap-2 text-gray-400">
					<p>
						Pitch (Cúi):{" "}
						<span className="text-white">
							{focusState.relPitch.toFixed(1)}°
						</span>
					</p>
					<p>
						Yaw (Xoay):{" "}
						<span className="text-white">
							{focusState.relYaw.toFixed(1)}°
						</span>
					</p>
					<p>
						EAR (Filt/Raw):{" "}
						<span className="text-white">
							{focusState.ear.toFixed(2)} /{" "}
							{focusState.rawEar.toFixed(2)}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default FaceTrackingPage;
