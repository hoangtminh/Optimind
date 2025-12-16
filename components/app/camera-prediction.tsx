"use client";
import { User, AlertTriangle } from "lucide-react";

import { useState, useRef, useEffect, useCallback, RefObject } from "react";
import {
	FACE_LANDMARK_DETECTION_MODE,
	ModelLoadResult,
	NO_MODE,
} from "@/mediapipe/definitions";
import Drawing3d from "@/lib/Drawing3d";
import useInterval from "@/hooks/useInterval";
import initMediaPipVision from "@/mediapipe/mediapipe-vision";
import FaceLandmarkDetection from "@/mediapipe/face-landmark";
import { useCamera } from "@/hooks/useCamera";
import Webcam from "react-webcam";
import { useFocus } from "@/hooks/useFocus";

const CameraPrediction = () => {
	const webcamRef = useRef<Webcam | null>(null);
	const canvas3dRef = useRef<HTMLCanvasElement | null>(null);

	const [mirrored, setMirrored] = useState<boolean>(false);
	const [modelLoadResult, setModelLoadResult] = useState<ModelLoadResult[]>();
	const [loading, setLoading] = useState<boolean>(false);
	const [currentMode, setCurrentMode] = useState<number>(NO_MODE);
	const { webcamId, isCamActive, camError } = useCamera();

	const { focusState, calibrate, processLandmarks, resetSystem } = useFocus();

	const initModels = async () => {
		const vision = await initMediaPipVision();

		if (vision) {
			const models = [FaceLandmarkDetection.initModel(vision)];

			const results = await Promise.all(models);
			const enabledModels = results.filter((result) => result.loadResult);
			FaceLandmarkDetection.setDrawingMode(
				FaceLandmarkDetection.CONNECTION_FACE_LANDMARKS_POINTS
			);
			if (enabledModels.length > 0) {
				setCurrentMode(enabledModels[0].mode);
			}
			setModelLoadResult(enabledModels);
		}
	};

	const resizeCanvas = (
		canvasRef: RefObject<HTMLCanvasElement | null>,
		webcamRef: RefObject<Webcam | null>
	) => {
		const canvas = canvasRef.current;
		const video = webcamRef.current?.video;

		if (canvas && video) {
			const { videoWidth, videoHeight } = video;
			canvas.width = videoWidth;
			canvas.height = videoHeight;
		}
	};

	const runPrediction = () => {
		if (webcamRef.current && webcamRef.current.video) {
			if (
				currentMode === FACE_LANDMARK_DETECTION_MODE &&
				!FaceLandmarkDetection.isModelUpdating()
			) {
				const faceLandmarkPrediction = FaceLandmarkDetection.detectFace(
					webcamRef.current.video
				);
				if (faceLandmarkPrediction) {
					const canvas = canvas3dRef.current;
					const video = webcamRef.current?.video;

					const landmarks = faceLandmarkPrediction.faceLandmarks[0];
					const currTime = performance.now() / 1000; // Thời gian hiện tại tính bằng giây
					// 2. GỌI HOOK ĐỂ XỬ LÝ LANDMARK & CẬP NHẬT TRẠNG THÁI
					processLandmarks(landmarks, currTime);

					if (canvas && video) {
						const { videoWidth, videoHeight } = video;
						// FaceLandmarkDetection.draw(
						// 	mirrored,
						// 	faceLandmarkPrediction,
						// 	videoWidth,
						// 	videoHeight
						// );
						console.log("Drawed");
					}
				}
			}
		}
	};

	const canvas3dRefCallback = useCallback((element: any) => {
		canvas3dRef.current = element;
		if (element !== null && !Drawing3d.isRendererInitialized()) {
			Drawing3d.initRenderer(element);
			console.log("init three renderer");
		}
	}, []);

	const webcamRefCallback = useCallback((element: any) => {
		if (element != null) {
			webcamRef.current = element;
		}
	}, []);

	// Trong CameraPrediction.tsx

	useEffect(() => {
		// 1. Xử lý khởi tạo mô hình
		setLoading(true);
		initModels();

		// 2. Xử lý kích thước và Three.js khi video sẵn sàng
		const video = webcamRef.current?.video;
		if (video && canvas3dRef.current) {
			console.log("re-render");
			Drawing3d.initScene(window.innerWidth, window.innerHeight);
			resizeCanvas(canvas3dRef, webcamRef);
		}
	}, [isCamActive]);

	useEffect(() => {
		if (modelLoadResult) {
			setLoading(false);
		}
	}, [modelLoadResult]);

	useInterval({
		callback: runPrediction,
		delay: isCamActive ? 1000 : null,
	});

	if (isCamActive && !camError)
		return (
			<>
				<Webcam
					ref={webcamRefCallback}
					mirrored={mirrored}
					className="h-full w-full object-cover"
					videoConstraints={{
						deviceId: webcamId,
					}}
				/>
				<canvas
					id="3d canvas"
					ref={canvas3dRefCallback}
					className="absolute top-0 left-0 h-full w-full object-contain"
				></canvas>
				<div className="absolute top-4 left-4 p-3 bg-gray-900/80 text-white rounded-lg shadow-xl min-w-[250px]">
					{/* Nút Calibrate */}
					<button
						onClick={() =>
							calibrate(focusState.rawPitch, focusState.rawYaw)
						}
						disabled={
							focusState.isCalibrated ||
							focusState.status === "NO FACE DETECTED"
						}
						className="mt-2 w-full px-2 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700 disabled:bg-gray-500"
					>
						{focusState.isCalibrated
							? "ĐÃ HIỆU CHUẨN"
							: "CALIBRATE"}
					</button>
					{/* Nút Reset */}
					<button
						onClick={resetSystem}
						className="mt-1 w-full px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600"
					>
						RESET SYSTEM
					</button>
				</div>
			</>
		);
	return (
		<div className="flex h-full w-full items-center justify-center bg-black/50 text-center p-4">
			{camError ? (
				<div className="text-red-400 space-y-2">
					<AlertTriangle className="h-10 w-10 mx-auto" />
					<p className="text-sm">Lỗi: {camError}</p>
					<p className="text-xs text-gray-300">
						Vui lòng cấp quyền truy cập camera.
					</p>
				</div>
			) : (
				<User className="h-16 w-16 text-gray-500" />
			)}
		</div>
	);
};

export default CameraPrediction;
