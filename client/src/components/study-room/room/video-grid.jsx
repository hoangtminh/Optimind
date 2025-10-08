import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Mic, MicOff, Monitor, Video, VideoOff } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

const VideoGrid = ({ stream, setStream }) => {
	// User settings in room
	const [cameraEnabled, setCameraEnabled] = useState(false);
	const [micEnabled, setMicEnabled] = useState(false);

	const stopCamera = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
		setCameraEnabled(false);
	};

	const [roomParticipants] = useState([
		{
			id: 1,
			name: "Nguyễn Văn A",
			avatar: "/placeholder.svg?height=40&width=40",
			isHost: true,
			cameraOn: true,
			micOn: true,
			screenSharing: false,
			focusTime: "2h 30m",
			status: "studying",
		},
		{
			id: 2,
			name: "Trần Thị B",
			avatar: "/placeholder.svg?height=40&width=40",
			isHost: false,
			cameraOn: false,
			micOn: true,
			screenSharing: false,
			focusTime: "1h 45m",
			status: "break",
		},
		{
			id: 3,
			name: "Lê Văn C",
			avatar: "/placeholder.svg?height=40&width=40",
			isHost: false,
			cameraOn: true,
			micOn: true,
			screenSharing: true,
			focusTime: "3h 15m",
			status: "studying",
		},
		{
			id: 4,
			name: "Hoàng Văn D",
			avatar: "/placeholder.svg?height=40&width=40",
			isHost: false,
			cameraOn: true,
			micOn: true,
			screenSharing: true,
			focusTime: "3h 15m",
			status: "studying",
		},
		{
			id: 5,
			name: "Lại Thị E",
			avatar: "/placeholder.svg?height=40&width=40",
			isHost: false,
			cameraOn: true,
			micOn: true,
			screenSharing: true,
			focusTime: "3h 15m",
			status: "studying",
		},
	]);

	const videoRef = useRef(null);

	const startCamera = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: micEnabled,
			});
			setStream(mediaStream);
			if (videoRef.current) {
				videoRef.current.srcObject = mediaStream;
				videoRef.current.play();
			}
			setCameraEnabled(true);
		} catch (error) {
			console.error("Error accessing camera:", error);
			toast.error({
				title: "Lỗi camera",
				description:
					"Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.",
				variant: "destructive",
			});
		}
	};

	return (
		<div>
			{/* Video Grid */}
			<Card className="flex-1 bg-orange-50 border-orange-200">
				<CardHeader>
					<CardTitle className="text-lg text-orange-600">
						Video Conference
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-96">
						{/* My Video */}
						<div className="relative  bg-gray-900 rounded-lg overflow-hidden">
							{cameraEnabled ? (
								<video
									ref={videoRef}
									className="w-full h-full object-cover"
									muted
									playsInline
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<Avatar className="h-16 w-16">
										<AvatarImage src="/placeholder.svg" />
										<AvatarFallback>You</AvatarFallback>
									</Avatar>
								</div>
							)}
							<div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
								Bạn
							</div>
						</div>

						{/* Other Participants */}
						{roomParticipants.slice(0, 5).map((participant) => (
							<div
								key={participant.id}
								className="relative bg-gray-900 rounded-lg overflow-hidden"
							>
								{participant.cameraOn ? (
									<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
										<Avatar className="h-16 w-16">
											<AvatarImage
												src={
													participant.avatar ||
													"/placeholder.svg"
												}
											/>
											<AvatarFallback>
												{participant.name[0]}
											</AvatarFallback>
										</Avatar>
									</div>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<Avatar className="h-16 w-16">
											<AvatarImage
												src={participant.avatar}
											/>
											<AvatarFallback>
												{participant.name[0]}
											</AvatarFallback>
										</Avatar>
									</div>
								)}
								<div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
									{participant.name}
									{participant.isHost && (
										<Crown className="inline h-3 w-3 ml-1 text-yellow-400" />
									)}
								</div>
								<div className="absolute top-2 right-2 flex gap-1">
									{!participant.micOn && (
										<div className="bg-white/80 rounded-2xl p-1">
											<MicOff className="h-4 w-4 text-red-500" />
										</div>
									)}
								</div>
							</div>
						))}
					</div>

					{/* Controls */}
					<div className="flex items-center justify-center gap-4 mt-4">
						<Button
							variant={cameraEnabled ? "default" : "outline"}
							className={
								cameraEnabled
									? `bg-white border-2 border-orange-500 hover:bg-orange-200`
									: `bg-red-300 border-2 border-red-500 hover:bg-red-100`
							}
							size="lg"
							onClick={cameraEnabled ? stopCamera : startCamera}
						>
							{cameraEnabled ? (
								<Video className="text-orange-600 h-4 w-4" />
							) : (
								<VideoOff className="h-4 w-4" />
							)}
						</Button>
						<Button
							variant={micEnabled ? "default" : "outline"}
							className={
								micEnabled
									? `bg-white border-2 border-orange-500 hover:bg-orange-200`
									: `bg-red-300 border-2 border-red-500 hover:bg-red-100`
							}
							size="lg"
							onClick={() => setMicEnabled(!micEnabled)}
						>
							{micEnabled ? (
								<Mic className="text-black h-4 w-4" />
							) : (
								<MicOff className="h-4 w-4" />
							)}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default VideoGrid;
