"use client";

import { useState, useEffect, useRef } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
	Crown,
	Mic,
	MicOff,
	Video,
	VideoOff,
	Monitor,
	MoreVertical,
	Clock,
	Activity,
	Copy,
	Share2,
	LogOut,
	MonitorOff,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRealtime } from "@/hooks/use-real-time";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Room = () => {
	const searchParams = useSearchParams();
	const roomId = searchParams.get("roomId");
	const { participants, updateParticipant, setParticipants } =
		useRealtime(roomId);
	const [lastUpdated, setLastUpdated] = useState(new Date());

	// User settings in room
	const [cameraEnabled, setCameraEnabled] = useState(false);
	const [micEnabled, setMicEnabled] = useState(false);
	const [screenShareEnabled, setScreenShareEnabled] = useState(false);
	const [focusDataShared, setFocusDataShared] = useState(true);

	const videoRef = useRef(null);
	const [stream, setStream] = useState(null);

	const [activeRoom] = useState({
		id: 4,
		name: "Nhóm học Vật lý",
		description: "Phòng riêng cho nhóm học vật lý lớp 12A1",
		subject: "Vật lý",
		host: "Me",
		participants: 6,
		maxParticipants: 8,
		isPrivate: true,
		createdAt: "1 ngày trước",
		status: "active",
		tags: ["Vật lý", "Lớp 12", "Private"],
	});

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
			micOn: false,
			screenSharing: true,
			focusTime: "3h 15m",
			status: "studying",
		},
	]);

	// Initialize participants
	useEffect(() => {
		if (roomParticipants.length > 0 && participants.length === 0) {
			setParticipants(roomParticipants);
		}
	}, [roomParticipants, participants.length, setParticipants]);

	// Update timestamp when participants change
	useEffect(() => {
		setLastUpdated(new Date());
	}, [participants]);

	const getStatusColor = (status) => {
		switch (status) {
			case "studying":
				return "bg-green-500";
			case "break":
				return "bg-yellow-500";
			case "away":
				return "bg-gray-400";
			default:
				return "bg-gray-400";
		}
	};

	const copyRoomLink = () => {
		const roomLink = `${window.location.origin}/study-rooms/${activeRoom?.id}`;
		navigator.clipboard.writeText(roomLink);
		toast({
			title: "Đã sao chép",
			description: "Link phòng học đã được sao chép vào clipboard",
		});
	};

	const handleLeaveRoom = () => {
		stopCamera();
		toast({
			title: "Đã rời phòng",
			description: "Bạn đã rời khỏi phòng học",
		});
	};

	const getStatusText = (status) => {
		switch (status) {
			case "studying":
				return "Đang học";
			case "break":
				return "Nghỉ giải lao";
			case "away":
				return "Vắng mặt";
			default:
				return "Không xác định";
		}
	};

	const handleStatusChange = (participantId, newStatus) => {
		updateParticipant(participantId, { status: newStatus });
	};

	const toggleCamera = (participantId) => {
		const participant = participants.find((p) => p.id === participantId);
		if (participant) {
			updateParticipant(participantId, {
				cameraOn: !participant.cameraOn,
			});
		}
	};

	const toggleMic = (participantId) => {
		const participant = participants.find((p) => p.id === participantId);
		if (participant) {
			updateParticipant(participantId, { micOn: !participant.micOn });
		}
	};

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

	const stopCamera = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
		setCameraEnabled(false);
	};

	return (
		<div className="space-y-3">
			<div className="lg:col-span-2">
				{/* Room Header */}
				<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl text-cyan-700">
									{activeRoom.name}
								</CardTitle>
								<CardDescription className="text-cyan-600">
									{activeRoom.description}
								</CardDescription>
							</div>
							<div className="flex items-center gap-2">
								<Button
									className={`bg-white border-2 border-cyan-300`}
									variant="outline"
									size="sm"
									onClick={copyRoomLink}
								>
									<Copy className="h-4 w-4 mr-2" />
									Copy link
								</Button>
								<Button variant="outline" size="sm">
									<Share2 className="h-4 w-4 mr-2" />
									Chia sẻ
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={handleLeaveRoom}
								>
									<LogOut className="h-4 w-4 mr-2" />
									Rời phòng
								</Button>
							</div>
						</div>
					</CardHeader>
				</Card>
			</div>
			<div className="grid grid-cols-4 gap-3">
				<div className="col-span-3">
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
												<AvatarFallback>
													You
												</AvatarFallback>
											</Avatar>
										</div>
									)}
									<div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
										Bạn
									</div>
								</div>

								{/* Other Participants */}
								{roomParticipants
									.slice(0, 5)
									.map((participant) => (
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
															{
																participant
																	.name[0]
															}
														</AvatarFallback>
													</Avatar>
												</div>
											) : (
												<div className="w-full h-full flex items-center justify-center">
													<Avatar className="h-16 w-16">
														<AvatarImage
															src={
																participant.avatar ||
																"/placeholder.svg"
															}
														/>
														<AvatarFallback>
															{
																participant
																	.name[0]
															}
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
													<MicOff className="h-4 w-4 text-red-500" />
												)}
												{participant.screenSharing && (
													<Monitor className="h-4 w-4 text-green-500" />
												)}
											</div>
										</div>
									))}
							</div>

							{/* Controls */}
							<div className="flex items-center justify-center gap-4 mt-4">
								<Button
									variant={
										cameraEnabled ? "default" : "outline"
									}
									className={
										cameraEnabled
											? `bg-orange-50 border-2 border-orange-500 hover:bg-orange-200`
											: ``
									}
									size="lg"
									onClick={
										cameraEnabled ? stopCamera : startCamera
									}
								>
									{cameraEnabled ? (
										<Video className="text-orange-600 h-4 w-4" />
									) : (
										<VideoOff className="h-4 w-4" />
									)}
								</Button>
								<Button
									variant={micEnabled ? "default" : "outline"}
									className={`border-2 border-orange-500`}
									size="lg"
									onClick={() => setMicEnabled(!micEnabled)}
								>
									{micEnabled ? (
										<Mic className="h-4 w-4" />
									) : (
										<MicOff className="h-4 w-4" />
									)}
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
				<div>
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg">
									Thành viên ({participants.length})
								</CardTitle>
								<div className="flex items-center gap-1 text-xs text-gray-500">
									<Activity className="h-3 w-3" />
									<span>
										Cập nhật{" "}
										{lastUpdated.toLocaleTimeString(
											"vi-VN",
											{
												hour: "2-digit",
												minute: "2-digit",
											}
										)}
									</span>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-0">
							<ScrollArea className="h-full">
								<div className="space-y-3 p-4">
									{participants.map((participant) => (
										<div
											key={participant.id}
											className="group"
										>
											<div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
												<div className="relative">
													<Avatar className="h-10 w-10">
														<AvatarImage
															src={
																participant.avatar ||
																"/placeholder.svg"
															}
														/>
														<AvatarFallback>
															{
																participant
																	.name[0]
															}
														</AvatarFallback>
													</Avatar>
													<div
														className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
															participant.status
														)}`}
													/>
												</div>

												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-1 mb-1">
														<p className="text-sm font-medium truncate">
															{participant.name}
														</p>
														{participant.isHost && (
															<Crown className="h-3 w-3 text-yellow-500" />
														)}
													</div>

													<div className="flex items-center gap-2 text-xs text-gray-500">
														<span>
															{getStatusText(
																participant.status
															)}
														</span>
														{participant.focusTime && (
															<>
																<span>•</span>
																<div className="flex items-center gap-1">
																	<Clock className="h-3 w-3" />
																	<span>
																		{
																			participant.focusTime
																		}
																	</span>
																</div>
															</>
														)}
													</div>
												</div>

												<div className="flex items-center gap-1">
													{/* Media Status Icons */}
													<div className="flex gap-1">
														{participant.cameraOn ? (
															<Video className="h-3 w-3 text-green-500" />
														) : (
															<VideoOff className="h-3 w-3 text-red-500" />
														)}

														{participant.micOn ? (
															<Mic className="h-3 w-3 text-green-500" />
														) : (
															<MicOff className="h-3 w-3 text-red-500" />
														)}

														{participant.screenSharing && (
															<Monitor className="h-3 w-3 text-blue-500" />
														)}
													</div>

													{/* Actions Menu */}
													<DropdownMenu>
														<DropdownMenuTrigger
															asChild
														>
															<Button
																size="sm"
																variant="ghost"
																className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
															>
																<MoreVertical className="h-3 w-3" />
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															<DropdownMenuItem
																onClick={() =>
																	handleStatusChange(
																		participant.id,
																		"studying"
																	)
																}
															>
																Đang học
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() =>
																	handleStatusChange(
																		participant.id,
																		"break"
																	)
																}
															>
																Nghỉ giải lao
															</DropdownMenuItem>
															<DropdownMenuItem
																onClick={() =>
																	handleStatusChange(
																		participant.id,
																		"away"
																	)
																}
															>
																Vắng mặt
															</DropdownMenuItem>
															{participant.id !==
																1 && ( // Don't show for current user
																<>
																	<DropdownMenuItem
																		onClick={() =>
																			toggleCamera(
																				participant.id
																			)
																		}
																	>
																		{participant.cameraOn
																			? "Tắt camera"
																			: "Bật camera"}
																	</DropdownMenuItem>
																	<DropdownMenuItem
																		onClick={() =>
																			toggleMic(
																				participant.id
																			)
																		}
																	>
																		{participant.micOn
																			? "Tắt mic"
																			: "Bật mic"}
																	</DropdownMenuItem>
																</>
															)}
														</DropdownMenuContent>
													</DropdownMenu>
												</div>
											</div>

											{/* Activity Indicator */}
											{participant.lastActivity && (
												<div className="ml-13 text-xs text-blue-600 opacity-75">
													<div className="flex items-center gap-1">
														<div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
														<span>
															Vừa cập nhật focus
															time
														</span>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Room;
