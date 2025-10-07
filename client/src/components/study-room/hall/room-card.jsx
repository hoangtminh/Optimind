"use client";
import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BookOpen, Clock, Globe, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const RoomCard = ({ room }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleJoinRoom = (room) => {
		if (room.isPrivate) {
			setIsJoinDialogOpen(true);
		} else {
			// Join public room directly
			router.replace(router.pathname, undefined, { shallow: true });
			const newSearchParams = new URLSearchParams(
				searchParams.toString()
			);
			newSearchParams.set("roomId", `${room.id}`);

			router.push(
				`/study-room/room/${room.id}?${newSearchParams.toString()}`
			);

			toast({
				title: "Đã tham gia phòng",
				description: `Bạn đã tham gia phòng "${room.name}"`,
			});
		}
	};

	const handleJoinPrivateRoom = () => {
		if (password.trim()) {
			// In a real app, this would verify the password
			setActiveRoom(selectedRoom);
			setPassword("");
			setIsJoinDialogOpen(false);
			toast({
				title: "Đã tham gia phòng",
				description: `Bạn đã tham gia phòng "${selectedRoom.name}"`,
			});
		}
	};
	return (
		<Card
			key={room.id}
			className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border-cyan-200 hover:shadow-md transition-shadow"
		>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<CardTitle className="flex items-center gap-2 text-cyan-800 text-lg">
								{room.name}
							</CardTitle>
							{room.isPrivate ? (
								<Lock className="h-4 w-4 text-gray-500" />
							) : (
								<Globe className="h-4 w-4 text-green-500" />
							)}
						</div>
						<CardDescription className="text-cyan-600">
							{room.description}
						</CardDescription>
					</div>
					<div className="flex items-center gap-4 text-sm text-cyan-600">
						<span className="flex items-center gap-1">
							<Users className="h-4 w-4" />
							{room.participants}/{room.maxParticipants}
						</span>
						<span className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							{room.createdAt}
						</span>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Avatar className="h-6 w-6">
							<AvatarImage src="/placeholder.svg" />
							<AvatarFallback className={`bg-cyan-200`}>
								{room.host[0]}
							</AvatarFallback>
						</Avatar>
						<span className="text-sm text-cyan-600">
							Host: {room.host}
						</span>
					</div>
					<Button
						className={"bg-cyan-500 hover:bg-cyan-700"}
						onClick={() => handleJoinRoom(room)}
					>
						Tham gia
					</Button>
				</div>
			</CardHeader>
		</Card>
	);
};

export default RoomCard;
