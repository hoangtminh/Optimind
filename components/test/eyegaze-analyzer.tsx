"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as ort from "onnxruntime-web";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// =========================================================
// 1. CẤU HÌNH VÀ THAM SỐ (ĐÃ ĐIỀU CHỈNH ỔN ĐỊNH)
// =========================================================
const MODEL_PATH = "/eye_openness_model.onnx";
const INPUT_NAME = "input_eye_img";
const OUTPUT_NAME = "eye_openness_score";
const IMG_SIZE = 64;

// THROTTHLING (1 lần/giây)
const TARGET_INTERVAL_MS = 1000;

// NGƯỠNG ĐÃ ĐIỀU CHỈNH ĐỂ ỔN ĐỊNH HƠN
const X_THRESHOLD = 100; // Tăng ngưỡng Head Pose X (bớt nhạy cảm với quay đầu nhẹ)
const Y_THRESHOLD = 100; // Tăng ngưỡng Head Pose Y
const MAR_THRESHOLD = 0.6; // Ngưỡng Ngáp (giữ nguyên)
const EYE_OPENNESS_THRESHOLD = 0.3; // Ngưỡng Mở mắt DL (giữ nguyên)

// Indices cho mắt và miệng (MediaPipe Face Mesh)
const LEFT_EYE_INDICES = [33, 160, 158, 133, 153, 144];
const RIGHT_EYE_INDICES = [362, 385, 387, 263, 373, 380];
const MOUTH_INDICES = {
	P1: 13,
	P2: 14,
	P3: 78,
	P4: 308,
};

// =========================================================
// 2. CÁC HÀM HÌNH HỌC & TIỀN XỬ LÝ
// =========================================================

type Point = { x: number; y: number };

const dist = (p1: Point, p2: Point): number => {
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

const calculateMar = (
	landmarks: any[],
	image_dims: { w: number; h: number }
): number => {
	const getPoint = (i: number): Point => ({
		x: landmarks[i].x * image_dims.w,
		y: landmarks[i].y * image_dims.h,
	});

	const p1 = getPoint(MOUTH_INDICES.P1);
	const p2 = getPoint(MOUTH_INDICES.P2);
	const p3 = getPoint(MOUTH_INDICES.P3);
	const p4 = getPoint(MOUTH_INDICES.P4);

	const vertical_dist = dist(p1, p2);
	const horizontal_dist = dist(p3, p4);

	if (horizontal_dist === 0) return 0;
	return vertical_dist / horizontal_dist;
};

const calculateHeadOffset = (
	landmarks: any[],
	image_dims: { w: number; h: number }
): { xOffset: number; yOffset: number } => {
	const NOSE_TIP_INDEX = 1;
	const LEFT_EYE_CORNER = 33;
	const RIGHT_EYE_CORNER = 263;

	const getPoint = (i: number): Point => ({
		x: landmarks[i].x * image_dims.w,
		y: landmarks[i].y * image_dims.h,
	});

	const noseTip = getPoint(NOSE_TIP_INDEX);
	const leftEye = getPoint(LEFT_EYE_CORNER);
	const rightEye = getPoint(RIGHT_EYE_CORNER);

	const centerEyeX = (leftEye.x + rightEye.x) / 2;
	const centerEyeY = (leftEye.y + rightEye.y) / 2;

	const xOffset = noseTip.x - centerEyeX;
	const yOffset = noseTip.y - centerEyeY;

	return { xOffset, yOffset };
};

/**
 * Tái tạo logic preprocess_image (Chuyển xám, Resize, Chuẩn hóa 0-1)
 */
const preprocessEyeFrame = (
	eyeCanvas: HTMLCanvasElement
): Float32Array | null => {
	const ctx = eyeCanvas.getContext("2d");
	if (!ctx) return null;
	const imageData = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE);
	const data = imageData.data;
	const eyeTensorData = new Float32Array(IMG_SIZE * IMG_SIZE * 1);

	for (let i = 0; i < data.length; i += 4) {
		const pixelIndex = i / 4;
		const R = data[i];
		const G = data[i + 1];
		const B = data[i + 2];
		const gray = 0.299 * R + 0.587 * G + 0.114 * B;
		eyeTensorData[pixelIndex] = gray / 255.0;
	}
	return eyeTensorData;
};

// =========================================================
// 3. COMPONENT CHÍNH
// =========================================================

export default function EyeGazeAnalyzer() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ortSessionRef = useRef<ort.InferenceSession | null>(null);
	const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);

	// REF CHO THROTTLING
	const lastAnalysisTimeRef = useRef(0);
	const lastVideoTimeRef = useRef(-1);
	const rafIdRef = useRef<number | null>(null);

	const [status, setStatus] = useState<string>("Đang tải mô hình...");
	const [focusScore, setFocusScore] = useState<number | null>(null);
	const [eyeOpenness, setEyeOpenness] = useState<number | null>(null);
	const [drowsinessStatus, setDrowsinessStatus] =
		useState<string>("Bình thường"); // TRẠNG THÁI MỚI

	// Helper function để hiển thị kết quả cuối cùng
	const displayFinalScore = useCallback(
		(
			score: number,
			status: string,
			eyeScore: number,
			drowsyStatus: string
		) => {
			setFocusScore(score);
			setEyeOpenness(eyeScore);
			setStatus(`Dự đoán: ${status}`);
			setDrowsinessStatus(drowsyStatus); // CẬP NHẬT TRẠNG THÁI
		},
		[]
	);

	/**
	 * TRUNG TÂM XỬ LÝ: Trích xuất mắt, chạy DL, tính toán các chỉ số hình học và tính điểm cuối
	 */
	const runEyeInference = useCallback(
		async (results: { faceLandmarks: any[] }) => {
			if (
				!ortSessionRef.current ||
				!canvasRef.current ||
				!videoRef.current
			)
				return;

			const ortSession = ortSessionRef.current;
			const faceLandmarks = results.faceLandmarks[0];
			const video = videoRef.current;
			const mainCanvas = canvasRef.current;
			const mainCtx = mainCanvas.getContext("2d");
			const videoDims = { w: video.videoWidth, h: video.videoHeight };
			if (!mainCtx) return;

			let baseScore = 100;
			let statusText = "Tập trung";
			let drowsiness = "Tỉnh táo";
			let eyeOpennessScore = 0.5;

			// --- LOGIC CẮT ẢNH VÀ CHẠY DL CHO TỪNG MẮT ---
			const allEyeScores: number[] = [];
			const EYE_INDEX_SETS = [LEFT_EYE_INDICES, RIGHT_EYE_INDICES];

			for (const indices of EYE_INDEX_SETS) {
				// ... (Logic Cắt ảnh và Inference giữ nguyên) ...
				const tempEyeCanvas = document.createElement("canvas");
				const tempCtx = tempEyeCanvas.getContext("2d");
				if (!tempCtx) continue;

				// 1. Get Bounding Box
				const xCoords = indices.map(
					(i) => faceLandmarks[i].x * video.videoWidth
				);
				const yCoords = indices.map(
					(i) => faceLandmarks[i].y * video.videoHeight
				);
				let xMin = Math.min(...xCoords);
				let xMax = Math.max(...xCoords);
				let yMin = Math.min(...yCoords);
				let yMax = Math.max(...yCoords);

				// 2. Padding
				const padding = 15;
				xMin = Math.max(0, xMin - padding);
				xMax = Math.min(video.videoWidth, xMax + padding);
				yMin = Math.max(0, yMin - padding);
				yMax = Math.min(video.videoHeight, yMax + padding);

				const cropWidth = xMax - xMin;
				const cropHeight = yMax - yMin;
				if (cropWidth <= 0 || cropHeight <= 0) continue;

				// 3. Cut and Resize
				tempEyeCanvas.width = cropWidth;
				tempEyeCanvas.height = cropHeight;
				tempCtx.drawImage(
					video,
					xMin,
					yMin,
					cropWidth,
					cropHeight,
					0,
					0,
					cropWidth,
					cropHeight
				);

				mainCanvas.width = IMG_SIZE;
				mainCanvas.height = IMG_SIZE;
				mainCtx.drawImage(tempEyeCanvas, 0, 0, IMG_SIZE, IMG_SIZE);

				// 4. Preprocess (Grayscale, Normalize 0-1)
				const processedEyeData = preprocessEyeFrame(mainCanvas);
				if (!processedEyeData) continue;

				// 5. Create ONNX Tensor (1, 64, 64, 1)
				const inputTensor = new ort.Tensor(
					"float32",
					processedEyeData,
					[1, IMG_SIZE, IMG_SIZE, 1]
				);

				// 6. Run Inference
				try {
					const feeds = { [INPUT_NAME]: inputTensor };
					const results = await ortSession.run(feeds);
					const score = (
						results[OUTPUT_NAME].data as Float32Array
					)[0];
					allEyeScores.push(score);
				} catch (e) {
					console.error("Lỗi ORT Inference khi chạy mắt:", e);
				}
			}

			// --- TÍNH ĐIỂM TỔNG HỢP ---

			if (allEyeScores.length > 0) {
				eyeOpennessScore =
					allEyeScores.reduce((a, b) => a + b, 0) /
					allEyeScores.length;
			} else {
				eyeOpennessScore = 0.5;
			}

			// 1. ÁP DỤNG ĐIỂM MẮT (DL) VÀ XÁC ĐỊNH SỰ BUỒN NGỦ
			baseScore = Math.max(
				0,
				baseScore * (1 + (eyeOpennessScore - 0.5) * 1.5)
			);

			if (eyeOpennessScore < EYE_OPENNESS_THRESHOLD) {
				baseScore -= 40;
				statusText = "Buồn ngủ do nhắm mắt";
				drowsiness = "Buồn ngủ"; // Cập nhật trạng thái buồn ngủ
			}

			// 2. TÍNH MAR (Ngáp)
			const mar = calculateMar(faceLandmarks, videoDims);
			if (mar > MAR_THRESHOLD) {
				baseScore -= 60;
				statusText = "Đang ngáp";
				drowsiness = "Buồn ngủ"; // Ngáp cũng là dấu hiệu buồn ngủ
			}

			// 3. TÍNH HEAD POSE (Tư thế Đầu)
			const { xOffset, yOffset } = calculateHeadOffset(
				faceLandmarks,
				videoDims
			);

			// CẬP NHẬT: Giảm hệ số phạt xuống 0.4 và 0.2 để ổn định hơn
			const X_PENALTY = 0.4;
			const Y_PENALTY = 0.2;

			// Phạt ngang
			if (xOffset < -X_THRESHOLD) {
				baseScore -= (Math.abs(xOffset) - X_THRESHOLD) * X_PENALTY;
				statusText = "Nhìn sang trái";
			} else if (xOffset > X_THRESHOLD) {
				baseScore -= (xOffset - X_THRESHOLD) * X_PENALTY;
				statusText = "Nhìn sang phải";
			}

			// Phạt dọc
			if (yOffset > Y_THRESHOLD) {
				baseScore -= (yOffset - Y_THRESHOLD) * Y_PENALTY;
				statusText = "Nhìn xuống";
			} else if (yOffset < -Y_THRESHOLD) {
				baseScore -= (Math.abs(yOffset) - Y_THRESHOLD) * Y_PENALTY;
				statusText = "Nhìn lên";
			}

			// QUYẾT ĐỊNH CUỐI CÙNG VỀ SỰ BUỒN NGỦ
			const finalScore = Math.max(
				0,
				Math.min(100, Math.floor(baseScore))
			); // <-- DI CHUYỂN LÊN TRƯỚC

			// QUYẾT ĐỊNH CUỐI CÙNG VỀ SỰ BUỒN NGỦ (Sử dụng finalScore đã được tính)
			if (finalScore < 50) {
				drowsiness = "Buồn ngủ nghiêm trọng";
			} else if (finalScore < 75 && drowsiness !== "Buồn ngủ") {
				drowsiness = "Giảm tập trung";
			} else if (drowsiness === "Tỉnh táo") {
				drowsiness = "Tập trung";
			}

			displayFinalScore(
				finalScore,
				statusText,
				eyeOpennessScore,
				drowsiness
			);
		},
		[preprocessEyeFrame, displayFinalScore]
	);

	/**
	 * Vòng lặp chính quản lý frame (requestAnimationFrame) VÀ ÁP DỤNG THROTTLING
	 */
	const processVideoLoop = useCallback(() => {
		const faceLandmarker = faceLandmarkerRef.current;
		const video = videoRef.current;

		rafIdRef.current = requestAnimationFrame(processVideoLoop);

		if (!faceLandmarker || !video || video.paused || video.ended) {
			return;
		}

		// --- BƯỚC 1: KIỂM TRA ĐIỀU TIẾT (THROTTLE CHECK - 1 LẦN/GIÂY) ---
		const now = Date.now();
		if (now - lastAnalysisTimeRef.current < TARGET_INTERVAL_MS) {
			return;
		}

		const videoTime = video.currentTime;
		if (videoTime === lastVideoTimeRef.current) {
			return;
		}
		lastVideoTimeRef.current = videoTime;

		lastAnalysisTimeRef.current = now; // Cập nhật thời điểm phân tích cuối cùng

		// --- BƯỚC 2: THỰC HIỆN PHÂN TÍCH ---

		const timestampInMs = Math.round(videoTime * 1000);
		const results = faceLandmarker.detectForVideo(video, timestampInMs);

		if (
			results &&
			results.faceLandmarks &&
			results.faceLandmarks.length > 0
		) {
			runEyeInference(results);
		} else {
			setStatus("Đang tìm khuôn mặt...");
			setEyeOpenness(null);
			setFocusScore(null);
			setDrowsinessStatus("Không phát hiện");
		}
	}, [runEyeInference]);

	// =========================================================
	// 4. useEffect: Khởi tạo và Dọn dẹp
	// =========================================================
	useEffect(() => {
		let stream: MediaStream | null = null;

		const loadModels = async () => {
			try {
				// 1. Khởi tạo MediaPipe Face Landmarker
				const filesetResolver = await FilesetResolver.forVisionTasks(
					"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
				);

				const landmarker = await FaceLandmarker.createFromOptions(
					filesetResolver,
					{
						baseOptions: {
							modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
							delegate: "GPU",
						},
						runningMode: "VIDEO",
						numFaces: 1,
					}
				);
				faceLandmarkerRef.current = landmarker;
				setStatus("✅ Landmarker sẵn sàng. Đang tải mô hình AI...");

				// 2. Tải mô hình ONNX
				ort.env.wasm.numThreads = 1;
				ort.env.wasm.proxy = true;

				const session = await ort.InferenceSession.create(MODEL_PATH, {
					executionProviders: ["wasm"],
				});
				ortSessionRef.current = session;
				setStatus("✅ Mô hình AI sẵn sàng. Đang chờ camera...");

				await startCamera();
			} catch (e) {
				console.error("Lỗi khởi tạo:", e);
				setStatus(
					`LỖI: Không tải được tài nguyên. ${(e as Error).message}`
				);
			}
		};

		const startCamera = async () => {
			try {
				// Yêu cầu camera chất lượng cao hơn (720p)
				stream = await navigator.mediaDevices.getUserMedia({
					video: {
						width: { ideal: 1280, min: 640 },
						height: { ideal: 720, min: 480 },
					},
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.onloadeddata = () => {
						videoRef.current?.play();
						// Bắt đầu vòng lặp processVideoLoop
						rafIdRef.current =
							requestAnimationFrame(processVideoLoop);
					};
				}
			} catch (e) {
				console.error("Lỗi truy cập camera:", e);
				setStatus(
					`LỖI: Không truy cập được camera. Vui lòng cấp quyền.`
				);
			}
		};

		loadModels();

		return () => {
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
			if (stream) stream.getTracks().forEach((track) => track.stop());
			if (faceLandmarkerRef.current) faceLandmarkerRef.current.close();
		};
	}, [processVideoLoop]);

	// =========================================================
	// 5. JSX Render
	// =========================================================
	return (
		<div style={{ padding: "20px", textAlign: "center" }}>
			<h1>Phân tích Độ Tập trung & Trạng thái Buồn ngủ (1 Lần/Giây)</h1>
			<p>
				Sử dụng MediaPipe, ONNX Runtime và điều tiết tốc độ để ổn định
				hệ thống.
			</p>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "20px",
				}}
			>
				<video
					ref={videoRef}
					autoPlay
					muted
					playsInline
					width="640"
					height="480"
					style={{
						border: "1px solid #007bff",
						transform: "scaleX(-1)",
					}}
				/>

				{/* Canvas ẩn dùng để xử lý cắt ảnh mắt */}
				<canvas
					ref={canvasRef}
					width={IMG_SIZE}
					height={IMG_SIZE}
					style={{ display: "none" }}
				/>
			</div>

			<div
				style={{
					marginTop: "30px",
					border: "1px solid #ccc",
					padding: "15px",
					maxWidth: "600px",
					margin: "30px auto",
				}}
			>
				<strong>Trạng thái Hệ thống:</strong>{" "}
				<span
					style={{ color: status.startsWith("LỖI") ? "red" : "gray" }}
				>
					{status}
				</span>
				{focusScore !== null && (
					<div style={{ marginTop: "15px", textAlign: "left" }}>
						<h3>
							TRẠNG THÁI TỔNG HỢP:{" "}
							<span
								style={{
									color:
										drowsinessStatus.includes("Buồn ngủ") ||
										drowsinessStatus.includes("Giảm")
											? "red"
											: "green",
								}}
							>
								{drowsinessStatus}
							</span>
						</h3>
						<p>
							<strong>ĐIỂM TẬP TRUNG CUỐI CÙNG:</strong>{" "}
							<span
								style={{
									color:
										focusScore < 50
											? "red"
											: focusScore < 75
											? "orange"
											: "green",
								}}
							>
								{focusScore}%
							</span>
						</p>
						<p>
							<strong>Điểm Mở Mắt (DL):</strong>{" "}
							{(eyeOpenness! * 100).toFixed(1)}%
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
