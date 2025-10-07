"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
	Users,
	Search,
	Lock,
	Globe,
	Settings,
	Crown,
	Clock,
	BookOpen,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RealTimeChat } from "@/components/chat/chat";
import CreateRoom from "@/components/study-room/hall/create-room";
import RoomCard from "@/components/study-room/hall/room-card";

export default function StudyRoomsPage() {
	const [activeRoom, setActiveRoom] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [password, setPassword] = useState("");

	// Mock data
	const [publicRooms] = useState([
		{
			id: 1,
			name: "Học Toán Cao Cấp",
			description:
				"Cùng nhau học toán cao cấp, giải bài tập và thảo luận",
			subject: "Toán học",
			host: "Nguyễn Văn A",
			participants: 8,
			maxParticipants: 15,
			isPrivate: false,
			createdAt: "2 giờ trước",
			status: "active",
			tags: ["Toán", "Cao cấp", "Giải tích"],
		},
		{
			id: 2,
			name: "English Speaking Practice",
			description: "Practice English conversation and pronunciation",
			subject: "Tiếng Anh",
			host: "Trần Thị B",
			participants: 5,
			maxParticipants: 10,
			isPrivate: false,
			createdAt: "1 giờ trước",
			status: "active",
			tags: ["English", "Speaking", "Practice"],
		},
		{
			id: 3,
			name: "Lập trình Python",
			description: "Học Python từ cơ bản đến nâng cao",
			subject: "Lập trình",
			host: "Lê Văn C",
			participants: 12,
			maxParticipants: 20,
			isPrivate: false,
			createdAt: "30 phút trước",
			status: "active",
			tags: ["Python", "Programming", "Coding"],
		},
	]);

	const [myRooms] = useState([
		{
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
		},
	]);

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
		<div className="container mx-auto max-w-7xl">
			<div className="mb-6">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Phòng học tập
				</h1>
				<p className="text-muted-foreground mt-2">
					Tham gia hoặc tạo phòng học để cùng nhau học tập và chia sẻ
					kiến thức
				</p>
			</div>

			{!activeRoom ? (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Room List */}
					<div className="lg:col-span-2">
						<Tabs defaultValue="public" className="w-full">
							<div className="flex items-center justify-between mb-4">
								<TabsList
									className={`flex gap-3 bg-green-200 h-10`}
								>
									<TabsTrigger value="public">
										Phòng công khai
									</TabsTrigger>
									<TabsTrigger value="my-rooms">
										Phòng của tôi
									</TabsTrigger>
								</TabsList>

								<CreateRoom />
							</div>

							<div className="mb-4">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<Input
										placeholder="Tìm kiếm phòng học..."
										className="pl-10"
										value={searchQuery}
										onChange={(e) =>
											setSearchQuery(e.target.value)
										}
									/>
								</div>
							</div>

							<TabsContent value="public">
								<div className="grid gap-4">
									{publicRooms.map((room) => (
										<RoomCard key={room.id} room={room} />
									))}
								</div>
							</TabsContent>

							<TabsContent value="my-rooms">
								<div className="grid gap-4">
									{myRooms.map((room) => (
										<Card
											key={room.id}
											className="hover:shadow-md transition-shadow"
										>
											<CardHeader className="pb-3">
												<div className="flex items-start justify-between">
													<div className="flex-1">
														<div className="flex items-center gap-2 mb-2">
															<CardTitle className="text-lg">
																{room.name}
															</CardTitle>
															<Crown className="h-4 w-4 text-yellow-500" />
															{room.isPrivate ? (
																<Lock className="h-4 w-4 text-gray-500" />
															) : (
																<Globe className="h-4 w-4 text-green-500" />
															)}
														</div>
														<CardDescription className="mb-2">
															{room.description}
														</CardDescription>
														<div className="flex items-center gap-4 text-sm text-gray-500">
															<span className="flex items-center gap-1">
																<BookOpen className="h-4 w-4" />
																{room.subject}
															</span>
															<span className="flex items-center gap-1">
																<Users className="h-4 w-4" />
																{
																	room.participants
																}
																/
																{
																	room.maxParticipants
																}
															</span>
															<span className="flex items-center gap-1">
																<Clock className="h-4 w-4" />
																{room.createdAt}
															</span>
														</div>
													</div>
													<div className="flex gap-2">
														<Button
															variant="outline"
															size="sm"
														>
															<Settings className="h-4 w-4" />
														</Button>
														<Button
															onClick={() =>
																handleJoinRoom(
																	room
																)
															}
														>
															Vào phòng
														</Button>
													</div>
												</div>
											</CardHeader>
											<CardContent className="pt-0">
												<div className="flex gap-1">
													{room.tags.map(
														(tag, index) => (
															<Badge
																key={index}
																variant="secondary"
																className="text-xs"
															>
																{tag}
															</Badge>
														)
													)}
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</TabsContent>
						</Tabs>
					</div>

					{/* Quick Stats */}
					<div className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									Thống kê nhanh
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Phòng đang hoạt động
									</span>
									<Badge variant="secondary">
										{publicRooms.length + myRooms.length}
									</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Tổng người tham gia
									</span>
									<Badge variant="secondary">
										{publicRooms.reduce(
											(sum, room) =>
												sum + room.participants,
											0
										)}
									</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-600">
										Phòng của tôi
									</span>
									<Badge variant="secondary">
										{myRooms.length}
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									Môn học phổ biến
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm">Toán học</span>
									<div className="w-20 bg-gray-200 rounded-full h-2">
										<div
											className="bg-blue-500 h-2 rounded-full"
											style={{ width: "80%" }}
										></div>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Lập trình</span>
									<div className="w-20 bg-gray-200 rounded-full h-2">
										<div
											className="bg-green-500 h-2 rounded-full"
											style={{ width: "65%" }}
										></div>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Tiếng Anh</span>
									<div className="w-20 bg-gray-200 rounded-full h-2">
										<div
											className="bg-purple-500 h-2 rounded-full"
											style={{ width: "45%" }}
										></div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			) : (
				<div>
					{/* Sidebar */}
					<div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
						{/* Real-time Chat */}
						<RealTimeChat
							roomId={activeRoom.id}
							className="h-full"
						/>
					</div>
				</div>
			)}

			{/* Join Private Room Dialog */}
			<Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Tham gia phòng riêng tư</DialogTitle>
						<DialogDescription>
							Phòng "{selectedRoom?.name}" yêu cầu mật khẩu để
							tham gia
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<Input
							type="password"
							placeholder="Nhập mật khẩu phòng"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyPress={(e) =>
								e.key === "Enter" && handleJoinPrivateRoom()
							}
						/>
						<Button
							onClick={handleJoinPrivateRoom}
							className="w-full"
						>
							Tham gia
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
