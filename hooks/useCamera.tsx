"use client";

import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	RefObject,
	createContext,
	useContext,
	useMemo,
} from "react";

// --- 1. Định nghĩa Types và Context ---

interface CameraContextType {
	videoRef: RefObject<HTMLVideoElement | null>;
	cameraStream: MediaStream | null;
	camError: string | null;
	isCamActive: boolean;
	toggleCamera: (active: boolean) => void;
	isWidgetVisible: boolean;
	setIsWidgetVisible: (visible: boolean) => void;
	webcamId: string | undefined;
	webcamList: MediaDeviceInfo[];
}

const CameraContext = createContext<CameraContextType | null>(null);

// --- 2. Custom Hook để sử dụng Context ---

export const useCamera = () => {
	const context = useContext(CameraContext);
	if (!context) {
		throw new Error(
			"useCameraContext must be used within a CameraProvider"
		);
	}
	return context;
};

// --- 3. Provider Component (Quản lý State và Logic) ---
export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
	const [isCamActive, setIsCamActive] = useState(false);
	const [isAttemptingToStart, setIsAttemptingToStart] = useState(false);
	const [camError, setCamError] = useState<string | null>(null);
	const [isWidgetVisible, setIsWidgetVisible] = useState(false);

	const [webcamId, setWebcamId] = useState<string | undefined>();
	const [webcamList, setWebcamList] = useState<MediaDeviceInfo[]>([]);

	// --- HÀM TẮT CAMERA ---
	const stopCamera = useCallback(() => {
		if (cameraStream) {
			cameraStream.getTracks().forEach((track) => track.stop());
			setCameraStream(null);
		}
		setIsCamActive(false);
		setIsAttemptingToStart(false);
		setCamError(null);
	}, [cameraStream]);

	// --- HÀM KHỞI ĐỘNG CAMERA (Callback) ---
	const startCamera = useCallback(() => {
		if (isAttemptingToStart || cameraStream) {
			return;
		}

		setIsAttemptingToStart(true);
		setCamError(null);

		// Sử dụng các tham số lý tưởng cho camera (720p)
		const constraints = {
			// video: {
			// 	width: 640,
			// 	height: 480,
			// },
			video: true,
		};

		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((stream) => {
				setCameraStream(stream);
				setIsCamActive(true);
				setIsAttemptingToStart(false);
			})
			.catch((err) => {
				console.error("Không thể truy cập camera:", err);
				setCamError(
					"Không thể bật camera. Vui lòng kiểm tra quyền truy cập."
				);
				setIsCamActive(false);
				setIsAttemptingToStart(false);
			});
	}, [isAttemptingToStart, cameraStream]);

	const loadCameraDeviceList = async () => {
		try {
			await navigator.mediaDevices.getUserMedia({
				video: true,
			});

			const deviceList: MediaDeviceInfo[] =
				await navigator.mediaDevices.enumerateDevices();

			const webcamList: MediaDeviceInfo[] = deviceList.filter(
				(device) => device.kind === "videoinput"
			);

			if (webcamList.length > 0) {
				setWebcamId(webcamList[0].deviceId);
				setWebcamList(webcamList);
			} else {
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log("Webcam error: ", error.message);
			} else {
				console.log("webcam error: ", error);
			}
		}
	};

	// --- Điều khiển Luồng Video ---
	useEffect(() => {
		if (cameraStream && videoRef.current) {
			videoRef.current.srcObject = cameraStream;
			videoRef.current.muted = true;
			videoRef.current.playsInline = true;
		}
	}, [cameraStream]);

	// --- Interface Điều khiển từ bên ngoài (Toolbar) ---
	const toggleCamera = useCallback(
		(active: boolean) => {
			if (active) {
				startCamera();
			} else {
				stopCamera();
			}
		},
		[startCamera, stopCamera]
	);

	// Dọn dẹp khi component unmount
	useEffect(() => {
		return () => {
			stopCamera();
		};
	}, [stopCamera]);

	useEffect(() => {
		loadCameraDeviceList();
		if (navigator) {
			navigator.mediaDevices.ondevicechange = (event: Event) => {
				loadCameraDeviceList();
			};
		}
		stopCamera();
	}, []);

	// Giá trị Context
	const contextValue = useMemo(
		() => ({
			videoRef,
			cameraStream,
			camError,
			isCamActive: !!cameraStream,
			toggleCamera,
			isWidgetVisible,
			setIsWidgetVisible,
			webcamId,
			webcamList,
		}),
		[camError, cameraStream, toggleCamera, isWidgetVisible]
	);

	return (
		<CameraContext.Provider value={contextValue}>
			{children}
		</CameraContext.Provider>
	);
};
