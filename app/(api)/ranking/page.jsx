// Tên file: app/leaderboard/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Trophy,
	BarChart2,
	Settings,
	Bell,
	User,
	Video,
	Music,
	Waves,
	Image as ImageIcon,
	X,
	UserPlus,
	Crown, // Icon cho độ tập trung
} from "lucide-react";
import { cn } from "@/lib/utils"; // Cần có từ cài đặt shadcn
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
const mockRankingData = {
	system: [
		{
			rank: 1,
			name: "Minh Anh",
			studyTime: "125 giờ",
			focusScore: "92%",
			avatar: "/avatars/04.png",
			note: "Luôn dẫn đầu!",
		},
		{
			rank: 2,
			name: "Thanh Tùng",
			studyTime: "110 giờ",
			focusScore: "88%",
			avatar: "/avatars/02.png",
			note: "Chăm chỉ và nhiệt huyết.",
		},
		{
			rank: 3,
			name: "Ngọc Lan",
			studyTime: "105 giờ",
			focusScore: "90%",
			avatar: "/avatars/03.png",
			note: "Tập trung cao độ.",
		},
		{
			rank: 4,
			name: "Hoàng Phúc",
			studyTime: "98 giờ",
			focusScore: "85%",
			avatar: "/avatars/05.png",
		},
		{
			rank: 5,
			name: "Kim Ngân",
			studyTime: "90 giờ",
			focusScore: "87%",
			avatar: "/avatars/01.png",
		},
		{
			rank: 6,
			name: "Gia Bảo",
			studyTime: "85 giờ",
			focusScore: "80%",
			avatar: "/avatars/06.png",
		},
		{
			rank: 7,
			name: "Mỹ Linh",
			studyTime: "82 giờ",
			focusScore: "78%",
			avatar: "/avatars/07.png",
		},
		{
			rank: 8,
			name: "Quang Minh",
			studyTime: "79 giờ",
			focusScore: "81%",
			avatar: "/avatars/08.png",
		},
	],
	friends: [
		{
			rank: 1,
			name: "Ngọc Lan",
			studyTime: "105 giờ",
			focusScore: "90%",
			avatar: "/avatars/03.png",
			note: "Bestie của tôi!",
		},
		{
			rank: 2,
			name: "Kim Ngân",
			studyTime: "90 giờ",
			focusScore: "87%",
			avatar: "/avatars/01.png",
		},
		{
			rank: 3,
			name: "Hoàng Phúc",
			studyTime: "98 giờ",
			focusScore: "85%",
			avatar: "/avatars/05.png",
		},
	],
	group: [
		{
			rank: 1,
			name: "Thanh Tùng",
			studyTime: "110 giờ",
			focusScore: "88%",
			avatar: "/avatars/02.png",
			note: "Leader nhóm A.",
		},
		{
			rank: 2,
			name: "Minh Anh",
			studyTime: "125 giờ",
			focusScore: "92%",
			avatar: "/avatars/04.png",
			note: "Thành viên tích cực.",
		},
	],
};

const userSelfInfo = {
	rank: 4,
	name: "Bạn",
	studyTime: "98 giờ",
	focusScore: "85%",
	avatar: "/avatars/user.png",
	note: "Bạn đang trong top 5 hệ thống!",
};

export default function LeaderboardPage() {
	// === State quản lý giao diện ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format=fit=crop"
	);
	const [isCameraOn, setCameraOn] = useState(false);

	// Hàm tiện ích
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	// --- STATE ---
	// State để quản lý tab xếp hạng đang được chọn
	const [selectedRankCategory, setSelectedRankCategory] = useState("system"); // 'system', 'friends', 'group'
	// State để lưu thông tin của người dùng được click để xem chi tiết
	const [selectedUser, setSelectedUser] = useState(null);
	// State để ẩn/hiện cột chi tiết người dùng
	const [showUserDetails, setShowUserDetails] = useState(false);
	// --- END STATE ---

	// --- HANDLERS ---
	// Xử lý khi click vào một người dùng trong bảng xếp hạng
	const handleUserClick = (user) => {
		setSelectedUser(user);
		setShowUserDetails(true); // Hiển thị cột chi tiết
	};

	return (
		<main
			className="h-screen w-screen text-white p-6 transition-all duration-500"
			style={{
				backgroundImage: `url(${backgroundUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="relative w-full h-full">
				{/* === 1. Sidebar bên trái === */}
				<nav
					className={cn(
						"absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
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
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
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
						<Settings />
					</Button>
				</nav>

				{/* === 5. Thanh công cụ (Bên phải) === */}
				<div
					className={cn(
						"absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
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
							// Ví dụ đổi hình nền
							const backgrounds = [
								"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
								"https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format&fit=crop",
								"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
							];
							const newBg =
								backgrounds[
									Math.floor(
										Math.random() * backgrounds.length
									)
								];
							setBackgroundUrl(newBg);
						}}
					>
						<ImageIcon />
					</Button>
				</div>

				{/* === 6. Popup Camera (Góc trên phải) === */}
				{isCameraOn && (
					<div
						className={cn(
							"absolute top-6 right-20 w-64 h-48 rounded-lg overflow-hidden",
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
						{/* Giả lập Camera Feed */}
						<div className="w-full h-full bg-black/50 flex items-center justify-center">
							<User size={64} className="opacity-30" />
						</div>
					</div>
				)}

				{/* === 7. Avatar người dùng (Góc trên phải) === */}
				<div className="absolute top-6 right-6 flex items-center gap-3">
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

				{/* --- CỘT 2: BẢNG XẾP HẠNG CHÍNH (Giữa-Trái) --- */}
				<section
					className={cn(
						"absolute max-h-screen w-130 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 flex flex-col gap-4",
						glassEffect
					)}
				>
					<div className="p-4 border-b border-white/10">
						<h2 className="text-2xl font-bold">Ranks</h2>
						<Tabs
							value={selectedRankCategory}
							onValueChange={setSelectedRankCategory}
							className="mt-4"
						>
							<TabsList className="grid w-full grid-cols-3 bg-white/10 text-white">
								<TabsTrigger value="system">
									Hệ thống
								</TabsTrigger>
								<TabsTrigger value="friends">
									Bạn bè
								</TabsTrigger>
								<TabsTrigger value="group">Nhóm</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>
					<ScrollArea className="flex-1 max-h-80 overflow-auto">
						{mockRankingData[selectedRankCategory].map((user) => (
							<div
								key={user.rank}
								className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-white/10"
								onClick={() => handleUserClick(user)} // Xử lý khi click
							>
								<span
									className={`w-8 text-center text-lg font-bold ${
										user.rank <= 3
											? "text-yellow-400"
											: "text-gray-300"
									}`}
								>
									{user.rank === 1 ? (
										<Crown className="inline-block h-5 w-5 text-yellow-400 -mt-1" />
									) : (
										user.rank
									)}
								</span>
								<Avatar className="h-10 w-10">
									<AvatarImage
										src={user.avatar}
										alt={user.name}
									/>
									<AvatarFallback>
										{user.name.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 overflow-hidden">
									<p className="font-semibold truncate text-white">
										{user.name}
									</p>
								</div>
								<span className="text-sm text-gray-300">
									{user.studyTime}
								</span>
							</div>
						))}
					</ScrollArea>
					{/* Thông tin của chính người dùng (Your Rank) */}
					<div className="border-t border-white/10 bg-white/10 rounded-md p-4 mt-auto">
						<div className="flex items-center gap-3">
							<span
								className={`w-8 text-center text-lg font-bold ${
									userSelfInfo.rank <= 3
										? "text-yellow-400"
										: "text-gray-300"
								}`}
							>
								{userSelfInfo.rank === 1 ? (
									<Crown className="inline-block h-5 w-5 text-yellow-400 -mt-1" />
								) : (
									userSelfInfo.rank
								)}
							</span>
							<Avatar className="h-10 w-10 border-2 border-blue-400">
								<AvatarImage
									src={userSelfInfo.avatar}
									alt={userSelfInfo.name}
								/>
								<AvatarFallback>Bạn</AvatarFallback>
							</Avatar>
							<div className="flex-1 overflow-hidden">
								<p className="font-semibold truncate text-white">
									Bạn
								</p>
							</div>
							<span className="text-sm text-gray-300">
								{userSelfInfo.studyTime}
							</span>
						</div>
					</div>

					{/* --- CỘT 3: CHI TIẾT NGƯỜI DÙNG (Giữa-Phải) --- */}
					{/* Cột này chỉ hiển thị khi `showUserDetails` là true */}
					{showUserDetails && selectedUser && (
						<aside
							className={cn(
								"absolute top-0 right-[-260px] flex w-[250px] p-2 flex-col rounded-md border-r border-white/10 backdrop-blur-lg",
								glassEffect
							)}
						>
							<div className="flex items-center justify-between p-1 border-b border-white/10">
								<h3 className="text-xl font-bold">Thông tin</h3>
								<Button
									onClick={() => setShowUserDetails(false)}
									variant="ghost"
									size="icon"
									className="text-gray-300 hover:bg-white/20 hover:text-white"
								>
									<X className="h-5 w-5" />
								</Button>
							</div>
							<div className="flex gap-4 justify-center items-center p-2">
								<Avatar className="h-10 w-10 border-4 border-blue-400">
									<AvatarImage
										src={selectedUser.avatar}
										alt={selectedUser.name}
									/>
									<AvatarFallback className="text-3xl">
										{selectedUser.name.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<p className="text-xl font-bold text-white">
										{selectedUser.name}
									</p>
									{selectedUser.note && (
										<p className="text-sm text-gray-300 italic">
											{selectedUser.note}
										</p>
									)}
								</div>
							</div>
							<div>
								<Separator className="my-4 bg-white/20 w-3/4" />
								<div className="grid grid-cols-2 gap-2 text-center w-full mb-3">
									<div>
										<p className="text-sm text-gray-400">
											Tổng thời gian học
										</p>
										<p className="text-lg font-semibold text-white">
											{selectedUser.studyTime}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-400">
											Độ tập trung TB
										</p>
										<p className="text-lg font-semibold text-white">
											{selectedUser.focusScore}
										</p>
									</div>
								</div>
								<Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
									<UserPlus className="h-4 w-4" /> Kết bạn
								</Button>
							</div>
						</aside>
					)}
				</section>
			</div>
		</main>
	);
}
