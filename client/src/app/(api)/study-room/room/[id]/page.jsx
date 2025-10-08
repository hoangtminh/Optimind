"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Copy, Share2, LogOut } from "lucide-react";
import { useRealtime } from "@/hooks/use-real-time";
import { toast } from "sonner";
import VideoGrid from "@/components/study-room/room/video-grid";
import Participants from "@/components/study-room/room/participants";

const Room = () => {
	const roomId = "1";
	const { participants, updateParticipant, setParticipants } =
		useRealtime(roomId);

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
					<VideoGrid stream={stream} setStream={setStream} />
				</div>
				<div>
					<Participants participants={participants} />
				</div>
			</div>
		</div>
	);
};

export default Room;
