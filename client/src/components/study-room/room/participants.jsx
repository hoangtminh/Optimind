"use client";

import React, { useEffect, useState } from "react";

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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const Participants = () => {
	const [participants] = useState([
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

	const [lastUpdated, setLastUpdated] = useState(new Date());
	// Update timestamp when participants change
	useEffect(() => {
		setLastUpdated(new Date());
	}, [participants]);

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

	const handleStatusChange = (participantId, newStatus) => {
		updateParticipant(participantId, { status: newStatus });
	};

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

	return (
		<Card className={`bg-green-50 border border-green-300`}>
			<CardHeader>
				<CardTitle className="text-lg text-green-600">
					Thành viên ({participants.length})
				</CardTitle>
			</CardHeader>

			<CardContent className="p-0">
				<ScrollArea className="h-full">
					<div className="space-y-3 px-2">
						{participants.map((participant) => (
							<div key={participant.id} className="">
								<div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
									<div className="relative">
										<Avatar className="h-10 w-10">
											<AvatarImage
												src={
													participant.avatar ||
													"/placeholder.svg"
												}
											/>
											<AvatarFallback
												className={`bg-white border-2`}
											>
												{participant.name[0]}
											</AvatarFallback>
										</Avatar>
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
											{participant.focusTime && (
												<div className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													<span>
														{participant.focusTime}
													</span>
												</div>
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
										</div>

										{/* Actions Menu */}
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													size="sm"
													variant="ghost"
													className="h-6 w-6 p-0 group-hover:opacity-100 transition-opacity"
												>
													<MoreVertical className="text-black h-3 w-3" />
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
												{participant.id !== 1 && ( // Don't show for current user
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
											<span>Vừa cập nhật focus time</span>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default Participants;
