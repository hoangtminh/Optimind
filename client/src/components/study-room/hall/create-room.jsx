"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const CreateRoom = () => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	// Room creation form
	const [roomName, setRoomName] = useState("");
	const [roomDescription, setRoomDescription] = useState("");
	const [roomSubject, setRoomSubject] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [roomPassword, setRoomPassword] = useState("");
	const [maxParticipants, setMaxParticipants] = useState("10");

	const handleCreateRoom = () => {
		if (roomName.trim()) {
			// In a real app, this would create the room on the server
			console.log("Creating room:", {
				name: roomName,
				description: roomDescription,
				subject: roomSubject,
				isPrivate,
				password: roomPassword,
				maxParticipants,
			});

			// Reset form
			setRoomName("");
			setRoomDescription("");
			setRoomSubject("");
			setIsPrivate(false);
			setRoomPassword("");
			setMaxParticipants("10");
			setIsCreateDialogOpen(false);

			toast({
				title: "Phòng học đã được tạo",
				description: "Phòng học của bạn đã được tạo thành công!",
			});
		}
	};

	return (
		<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
			<DialogTrigger asChild>
				<Button variant={`primary`}>
					<Plus className="h-4 w-4 mr-2" />
					Tạo phòng
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className={"text-blue-600"}>
						Tạo phòng học mới
					</DialogTitle>
					<DialogDescription>
						Tạo phòng học để mời bạn bè cùng học tập
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="room-name"
								className={"text-blue-700"}
							>
								Tên phòng
							</Label>
							<Input
								id="room-name"
								placeholder="Nhập tên phòng"
								value={roomName}
								onChange={(e) => setRoomName(e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label
								htmlFor="room-description"
								className={"text-blue-700"}
							>
								Mô tả
							</Label>
							<Textarea
								id="room-description"
								placeholder="Mô tả về phòng học"
								value={roomDescription}
								onChange={(e) =>
									setRoomDescription(e.target.value)
								}
							/>
						</div>

						<div className="flex items-center space-x-2">
							<Switch
								id="private-room"
								checked={isPrivate}
								onCheckedChange={setIsPrivate}
								className={`bg-green-700 text-green-700`}
								color="green"
							/>
							<Label
								htmlFor="private-room"
								className={"text-blue-700"}
							>
								Phòng riêng tư
							</Label>
						</div>

						{isPrivate && (
							<div className="space-y-2">
								<Label
									htmlFor="room-password"
									className={"text-blue-700"}
								>
									Mật khẩu
								</Label>
								<Input
									id="room-password"
									type="password"
									placeholder="Nhập mật khẩu phòng"
									value={roomPassword}
									onChange={(e) =>
										setRoomPassword(e.target.value)
									}
								/>
							</div>
						)}
					</div>
					<div className="flex w-full justify-end">
						<Button
							onClick={handleCreateRoom}
							className="bg-blue-500 px-5 hover:bg-blue-700"
						>
							Tạo phòng
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreateRoom;
