// Tên file: app/study-room/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	LayoutDashboard,
	CheckSquare,
	Users, // Icon chính của trang
	Trophy,
	BarChart2,
	Settings,
	Bell,
	User,
	Video,
	VideoOff,
	Music,
	Waves,
	Image as ImageIcon,
	X,
	Star,
	Plus,
	LogIn, // Icon tham gia
	UserCheck, // Icon chủ phòng
	Users2, // Icon số người
	Mic,
	MicOff,
	Send,
	DoorOpen, // Icon rời phòng
	Swords, // Icon thi đấu
	Brain, // Icon độ tập trung
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dữ liệu giả lập ---
const mockStudyRooms = [
	{
		id: "s1",
		name: "Học tập trung 24/7",
		host: "Minh Anh",
		participants: 15,
		max: 20,
	},
	{
		id: "s2",
		name: "Code & Chill",
		host: "Thanh Tùng",
		participants: 8,
		max: 10,
	},
	{
		id: "s3",
		name: "Pomodoro 50/10",
		host: "Ngọc Lan",
		participants: 5,
		max: 10,
	},
];
const mockBattleRooms = [
	{
		id: "b1",
		name: "Đấu trường 60 phút",
		host: "Admin",
		participants: 2,
		max: 2,
	},
	{
		id: "b2",
		name: "Tập trung cuối tuần",
		host: "Gia Bảo",
		participants: 2,
		max: 2,
	},
];

// --- Component Chính ---
export default function StudyRoomPage() {
	// === State quản lý giao diện (GIỮ NGUYÊN) ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
	);
	const [isCameraOn, setCameraOn] = useState(false);

	// === State cho Phòng học ===
	const [roomState, setRoomState] = useState("browsing");
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [selectedRoomType, setSelectedRoomType] = useState("study"); // MỚI: Thêm state loại phòng
	const [isMicOn, setMicOn] = useState(true);
	const [isUserCamOn, setUserCamOn] = useState(true);

	// Hàm tiện ích (GIỮ NGUYÊN)
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	// --- HANDLERS ---
	const handleJoinClick = (room, type) => {
		// MỚI: Thêm type
		setSelectedRoom(room);
		setSelectedRoomType(type); // MỚI: Set loại phòng
		setRoomState("prejoin"); // Chuyển sang màn hình cài đặt
	};

	const handleConfirmJoin = () => {
		setRoomState("in_room"); // Chuyển vào phòng
	};

	const handleLeaveRoom = () => {
		setRoomState("browsing"); // Quay lại danh sách
		setSelectedRoom(null);
		setSelectedRoomType(null); // MỚI: Reset loại phòng
	};

	return (
		<TooltipProvider>
			<main
				className="h-screen w-screen text-white p-6 transition-all duration-500"
				style={{
					backgroundImage: `url(${backgroundUrl})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="relative w-full h-full">
					{/* === 1. Sidebar bên trái (GIỮ NGUYÊN) === */}
					<nav
						className={cn(
							"absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3 z-30",
							glassEffect
						)}
					>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<LayoutDashboard />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<CheckSquare />
						</Button>
						{/* THAY ĐỔI: Active nút Users */}
						<Button
							variant="secondary"
							size="icon"
							className="text-white bg-white/20 hover:bg-white/30"
						>
							<Users />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<Trophy />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<BarChart2 />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<Star />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<Settings />
						</Button>
					</nav>

					{/* === 5. Thanh công cụ (Bên phải) (GIỮ NGUYÊN) === */}
					<div
						className={cn(
							"absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3 z-30",
							glassEffect
						)}
					>
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								"hover:bg-white/20",
								isCameraOn ? "text-blue-300" : "text-white"
							)}
							onClick={() => setCameraOn(!isCameraOn)}
						>
							{isCameraOn ? <VideoOff /> : <Video />}
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<Music />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<Waves />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
							onClick={() => {
								/* ... (logic đổi nền) ... */
							}}
						>
							<ImageIcon />
						</Button>
					</div>

					{/* === 6. Popup Camera (Góc trên phải) (GIỮ NGUYÊN) === */}
					{isCameraOn && (
						<div
							className={cn(
								"absolute top-6 right-20 w-64 h-48 rounded-lg overflow-hidden z-20",
								glassEffect
							)}
						>
							<div className="absolute top-2 right-2 z-10">
								<Button
									variant="destructive"
									size="icon"
									className="h-7 w-7 bg-red-500/80 hover:bg-red-500"
									onClick={() => setCameraOn(false)}
								>
									<X size={16} />
								</Button>
							</div>
							<div className="w-full h-full bg-black/50 flex items-center justify-center">
								<User size={64} className="opacity-30" />
							</div>
						</div>
					)}

					{/* === 7. Avatar người dùng (Góc trên phải) (GIỮ NGUYÊN) === */}
					<div className="absolute top-6 right-6 flex items-center gap-3 z-20">
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/20"
						>
							<Bell />
						</Button>
						<Avatar>
							<AvatarImage
								src="https://github.com/shadcn.png"
								alt="@shadcn"
							/>
							<AvatarFallback>U</AvatarFallback>
						</Avatar>
					</div>

					{/* === NỘI DUNG CHÍNH (THAY ĐỔI THEO STATE) === */}
					<section
						className={cn(
							"absolute w-[900px] h-fit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col",
							glassEffect,
							"overflow-hidden" // Đảm bảo các con không bị tràn
						)}
					>
						{/* --- TRẠNG THÁI 1: DUYỆT PHÒNG (BROWSING) --- */}
						{roomState === "browsing" && (
							<div className="flex flex-col h-full">
								{/* Header */}
								<div className="flex justify-between items-center p-6 border-b border-white/10">
									<h2 className="text-3xl font-bold">
										Phòng Học Chung
									</h2>
									<Button className="gap-2 bg-blue-600 hover:bg-blue-700">
										<Plus className="w-5 h-5" />
										Tạo phòng
									</Button>
								</div>
								{/* Tabs */}
								<Tabs
									defaultValue="study"
									className="flex flex-col flex-1"
								>
									<TabsList className="grid w-full grid-cols-2 bg-white/10 text-white rounded-none">
										<TabsTrigger value="study">
											Phòng học
										</TabsTrigger>
										<TabsTrigger value="battle">
											Phòng thi đấu
										</TabsTrigger>
									</TabsList>
									{/* Danh sách phòng học */}
									<TabsContent
										value="study"
										className="flex-1 overflow-hidden"
									>
										<ScrollArea className="h-full p-6">
											<div className="flex flex-col gap-4">
												{mockStudyRooms.map((room) => (
													<div
														key={room.id}
														className="flex items-center justify-between rounded-lg bg-white/10 p-4"
													>
														<div className="flex items-center gap-4">
															<Avatar className="h-12 w-12">
																<AvatarFallback>
																	<Users2 />
																</AvatarFallback>
															</Avatar>
															<div>
																<p className="text-lg font-semibold">
																	{room.name}
																</p>
																<div className="flex gap-4 text-sm text-gray-300">
																	<span className="flex items-center gap-1">
																		<UserCheck className="w-4 h-4" />{" "}
																		{
																			room.host
																		}
																	</span>
																	<span className="flex items-center gap-1">
																		<Users2 className="w-4 h-4" />{" "}
																		{
																			room.participants
																		}
																		/
																		{
																			room.max
																		}
																	</span>
																</div>
															</div>
														</div>
														<Button
															className="gap-2"
															onClick={() =>
																handleJoinClick(
																	room,
																	"study"
																)
															}
														>
															{" "}
															{/* MỚI: Thêm "study" */}
															<LogIn className="w-4 h-4" />{" "}
															Tham gia
														</Button>
													</div>
												))}
											</div>
										</ScrollArea>
									</TabsContent>
									{/* Danh sách phòng thi đấu */}
									<TabsContent
										value="battle"
										className="flex-1 overflow-hidden"
									>
										<ScrollArea className="h-full p-6">
											<div className="flex flex-col gap-4">
												{mockBattleRooms.map((room) => (
													<div
														key={room.id}
														className="flex items-center justify-between rounded-lg bg-white/10 p-4"
													>
														<div className="flex items-center gap-4">
															<Avatar className="h-12 w-12">
																<AvatarFallback>
																	<Swords />
																</AvatarFallback>
															</Avatar>
															<div>
																<p className="text-lg font-semibold">
																	{room.name}
																</p>
																<div className="flex gap-4 text-sm text-gray-300">
																	<span className="flex items-center gap-1">
																		<UserCheck className="w-4 h-4" />{" "}
																		{
																			room.host
																		}
																	</span>
																	<span className="flex items-center gap-1">
																		<Users2 className="w-4 h-4" />{" "}
																		{
																			room.participants
																		}
																		/
																		{
																			room.max
																		}
																	</span>
																</div>
															</div>
														</div>
														<Button
															className="gap-2"
															onClick={() =>
																handleJoinClick(
																	room,
																	"battle"
																)
															}
														>
															{" "}
															{/* MỚI: Thêm "battle" */}
															<LogIn className="w-4 h-4" />{" "}
															Tham gia
														</Button>
													</div>
												))}
											</div>
										</ScrollArea>
									</TabsContent>
								</Tabs>
							</div>
						)}

						{/* --- TRẠNG THÁI 2: CÀI ĐẶT TRƯỚC KHI VÀO (PREJOIN) --- */}
						{roomState === "prejoin" && selectedRoom && (
							<div className="flex flex-col items-center justify-center h-full p-6 gap-4">
								<h2 className="text-3xl font-bold">
									Vào phòng: {selectedRoom.name}
								</h2>
								<p className="text-lg text-gray-300">
									Kiểm tra camera và micro của bạn
								</p>
								{/* Khung camera giả lập */}
								<div className="w-full h-96 rounded-lg bg-black/50 flex items-center justify-center">
									{isUserCamOn ? (
										<User
											size={128}
											className="opacity-30"
										/>
									) : (
										<VideoOff
											size={128}
											className="opacity-30"
										/>
									)}
								</div>
								{/* Nút điều khiển Mic / Cam */}
								<div className="flex gap-4">
									<Button
										variant={
											isMicOn ? "outline" : "destructive"
										}
										size="icon"
										className="h-14 w-14 rounded-full bg-white/20 border-white/30"
										onClick={() => setMicOn(!isMicOn)}
									>
										{isMicOn ? (
											<Mic className="w-6 h-6" />
										) : (
											<MicOff className="w-6 h-6" />
										)}
									</Button>
									<Button
										variant={
											isUserCamOn
												? "outline"
												: "destructive"
										}
										size="icon"
										className="h-14 w-14 rounded-full bg-white/20 border-white/30"
										onClick={() =>
											setUserCamOn(!isUserCamOn)
										}
									>
										{isUserCamOn ? (
											<Video className="w-6 h-6" />
										) : (
											<VideoOff className="w-6 h-6" />
										)}
									</Button>
								</div>
								<Separator className="bg-white/20 w-1/2 my-4" />
								<div className="flex gap-4">
									<Button
										variant="outline"
										size="lg"
										onClick={handleLeaveRoom}
										className="bg-white/10 hover:bg-white/20"
									>
										Hủy
									</Button>
									<Button
										size="lg"
										onClick={handleConfirmJoin}
										className="bg-blue-600 hover:bg-blue-700"
									>
										Xác nhận tham gia
									</Button>
								</div>
							</div>
						)}

						{/* --- TRẠNG THÁI 3: TRONG PHÒNG HỌC (IN_ROOM - STUDY) --- */}
						{roomState === "in_room" &&
							selectedRoomType === "study" &&
							selectedRoom && (
								<div className="flex flex-col h-full">
									{/* Header trong phòng */}
									<div className="flex justify-between items-center p-4 border-b border-white/10">
										<h2 className="text-2xl font-bold">
											{selectedRoom.name}
										</h2>
										<Button
											variant="destructive"
											className="gap-2"
											onClick={handleLeaveRoom}
										>
											<DoorOpen className="w-5 h-5" />
											Rời phòng
										</Button>
									</div>
									{/* Nội dung phòng (Grid + Chat) */}
									<div className="flex flex-1 overflow-hidden">
										{/* Grid người tham gia */}
										<div className="flex-1 p-4 overflow-auto">
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{/* Giả lập người tham gia */}
												{[
													...Array(
														selectedRoom.participants
													),
												]
													.slice(0, 9)
													.map((_, i) => (
														<div
															key={i}
															className="aspect-video rounded-lg bg-black/50 flex items-center justify-center"
														>
															<User
																size={48}
																className="opacity-30"
															/>
															<span className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-sm">
																User {i + 1}
															</span>
														</div>
													))}
											</div>
										</div>
										{/* Khung Chat (giống bản phác thảo) */}
										<aside className="w-80 flex flex-col border-l border-white/10 bg-white/5">
											<h3 className="p-4 text-lg font-semibold border-b border-white/10">
												Chat
											</h3>
											<ScrollArea className="flex-1 p-4">
												{/* ... Tin nhắn ... */}
												<p className="text-sm text-gray-300">
													Minh Anh: Chào mọi người!
												</p>
											</ScrollArea>
											<div className="p-4 border-t border-white/10">
												<form className="flex gap-2">
													<Input
														placeholder="Nhập..."
														className="bg-white/10 border-white/20"
													/>
													<Button size="icon">
														<Send className="w-4 h-4" />
													</Button>
												</form>
											</div>
										</aside>
									</div>
								</div>
							)}

						{/* --- MỚI: TRẠNG THÁI 4: TRONG PHÒNG THI ĐẤU (IN_ROOM - BATTLE) --- */}
						{roomState === "in_room" &&
							selectedRoomType === "battle" &&
							selectedRoom && (
								<div className="flex flex-col h-fit">
									{/* Header phòng thi đấu */}
									<div className="flex justify-between items-center p-4 border-b border-white/10">
										<h2 className="text-2xl font-bold flex items-center gap-2">
											<Swords className="w-6 h-6 text-red-400" />
											{selectedRoom.name}
										</h2>
										<Button
											variant="destructive"
											className="gap-2"
											onClick={handleLeaveRoom}
										>
											<DoorOpen className="w-5 h-5" />
											Rời phòng
										</Button>
									</div>
									{/* Nội dung phòng (Battle + Chat) */}
									<div className="flex flex-1 overflow-hidden">
										{/* Khu vực thi đấu */}
										<div className="flex-1 p-6 flex flex-col items-center justify-center gap-6">
											<p className="text-xl font-semibold">
												Thời gian còn lại: 59:30
											</p>
											{/* Thanh điểm tập trung */}
											<div className="flex flex-row items-center gap-4 px-6">
												<div className="flex items-center gap-2">
													<Brain className="w-6 h-6 text-blue-300" />
													<span className="text-3xl font-bold">
														92%
													</span>
												</div>
												<Separator
													orientation="vertical"
													className="h-20 bg-white/30"
												/>
												<span className="text-2xl font-bold text-gray-400">
													VS
												</span>
												<Separator
													orientation="vertical"
													className="h-20 bg-white/30"
												/>
												<div className="flex items-center gap-2">
													<Brain className="w-6 h-6 text-red-300" />
													<span className="text-3xl font-bold">
														88%
													</span>
												</div>
											</div>
											<div className="flex w-full items-center justify-around">
												{/* Người chơi 1 (Bạn) */}
												<div className="flex flex-col items-center gap-2">
													<div className="w-full h-36 aspect-video rounded-lg bg-black/50 flex items-center justify-center border-2 border-blue-500 relative overflow-hidden">
														<User
															size={64}
															className="opacity-30"
														/>
														<span className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-sm">
															Bạn
														</span>
													</div>
													<p className="text-lg font-semibold">
														Bạn
													</p>
												</div>

												{/* Người chơi 2 (Đối thủ) */}
												<div className="flex flex-col items-center gap-2">
													<div className="w-full h-36 aspect-video rounded-lg bg-black/50 flex items-center justify-center border-2 border-gray-500 relative overflow-hidden">
														<User
															size={64}
															className="opacity-30"
														/>
														<span className="absolute bottom-2 left-2 bg-black/50 px-2 py-0.5 rounded text-sm">
															Minh Anh
														</span>
													</div>
													<p className="text-lg font-semibold">
														Minh Anh
													</p>
												</div>
											</div>
										</div>

										{/* Khung Chat (giữ nguyên) */}
										<aside className="w-80 flex flex-col border-l border-white/10 bg-white/5">
											<h3 className="p-4 text-lg font-semibold border-b border-white/10">
												Chat
											</h3>
											<ScrollArea className="flex-1 p-4">
												<p className="text-sm text-gray-300">
													Minh Anh: Sẵn sàng chưa?
												</p>
												<p className="text-sm text-white">
													Bạn: Vào thôi!
												</p>
											</ScrollArea>
											<div className="p-4 border-t border-white/10">
												<form className="flex gap-2">
													<Input
														placeholder="Nhập..."
														className="bg-white/10 border-white/20"
													/>
													<Button size="icon">
														<Send className="w-4 h-4" />
													</Button>
												</form>
											</div>
										</aside>
									</div>
								</div>
							)}
					</section>
				</div>
			</main>
		</TooltipProvider>
	);
}
