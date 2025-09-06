"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CameraContext = createContext();
export function useCamera() {
	return useContext(CameraContext);
}

export const CameraProvider = ({ children }) => {
	// Camera-related state variables
	const [cameraStream, setCameraStream] = useState(null);
	const [isRecording, setIsRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const videoRef = useRef(null);

	useEffect(() => {
		return () => {
			stopCamera();
			if (mediaRecorder && isRecording) {
				mediaRecorder.stop();
			}
		};
	}, []);

	useEffect(() => {
		if (cameraStream && videoRef.current) {
			videoRef.current.srcObject = cameraStream;
			videoRef.current.muted = true;
			videoRef.current.playsInline = true;
			videoRef.current.play().catch((err) => toast.error(err));
		}
		console.log(videoRef);
	}, [cameraStream]);

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});

			setCameraStream(stream);

			console.log(videoRef);
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.muted = true; // đảm bảo muted
				videoRef.current.playsInline = true;

				await videoRef.current.play();
			}
		} catch (error) {
			toast.error("Không thể truy cập camera.");
		}
	};

	const stopCamera = () => {
		if (cameraStream) {
			cameraStream.getTracks().forEach((track) => track.stop());
			setCameraStream(null);
		}
		if (videoRef.current) {
			videoRef.current.srcObject = null;
		}
	};

	const startRecording = () => {
		if (!cameraStream) return;

		const recorder = new MediaRecorder(cameraStream);
		const chunks = [];

		recorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				chunks.push(event.data);
			}
		};

		recorder.onstop = () => {
			const blob = new Blob(chunks, { type: "video/webm" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `study-session-${Date.now()}.webm`;
			a.click();
			setRecordedChunks([]);
		};

		recorder.start();
		setMediaRecorder(recorder);
		setIsRecording(true);
	};

	const stopRecording = () => {
		if (mediaRecorder && isRecording) {
			mediaRecorder.stop();
			setMediaRecorder(null);
			setIsRecording(false);
		}
	};

	const contextValue = {
		videoRef,
		cameraStream,
		startCamera,
		stopCamera,
		startRecording,
		stopRecording,
	};
	return (
		<CameraContext.Provider value={contextValue}>
			{children}
		</CameraContext.Provider>
	);
};
