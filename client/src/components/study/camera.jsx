"use client";

import { CameraIcon, CameraOffIcon, SquareIcon, VideoIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useCamera } from "@/hooks/use-camera";
import { Label } from "../ui/label";

const Camera = () => {
	const { cameraStream, videoRef, isRecording, startCamera, stopCamera } =
		useCamera();

	console.log(videoRef);

	return (
		<div>
			<Label className="text-md font-medium block">Camera</Label>
			<div className="rounded-lg p-3 flex flex-col gap-3">
				{cameraStream ? (
					<div className="flex-1 relative">
						<div className="w-full h-[380px]  p-3 bg-white rounded-lg border border-green-300 shadow-md">
							<video
								ref={videoRef}
								autoPlay
								muted
								playsInline
								style={{
									background: "white",
									srcObject: "stream",
									height: "350px",
								}}
							/>
						</div>

						{isRecording && (
							<div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
								REC
							</div>
						)}
					</div>
				) : (
					<div className="flex-1 flex h-[380px] items-center justify-center text-gray-500">
						<div className="text-center h-full">
							<CameraIcon className="h-8 w-8 mx-auto my-2 text-gray-400" />
							<p className="text-xs">Camera chưa kích hoạt</p>
						</div>
					</div>
				)}
				{!cameraStream ? (
					<Button
						onClick={startCamera}
						size="sm"
						className="flex-1 p-2 bg-green-600 hover:bg-green-700"
					>
						<CameraIcon className="h-4 w-4 mr-1" />
						Bật camera
					</Button>
				) : (
					<Button
						onClick={stopCamera}
						size="sm"
						variant="destructive"
						className="flex-1 p-2 "
					>
						<CameraOffIcon className="h-4 w-4 mr-1" />
						Tắt
					</Button>
				)}
			</div>
		</div>
	);
};

export default Camera;
