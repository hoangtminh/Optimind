// Tên file: app/connect/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	LayoutDashboard,
	CheckSquare,
	Users,
	Bell,
	Video,
	Music,
	Search,
	Send,
	UserPlus,
	MessageCircle,
	Users as GroupIcon,
	X,
	Info, // Thêm icon Info
} from "lucide-react";
import { cn } from "@/lib/utils"; // Cần có từ cài đặt shadcn

// --- Dữ liệu giả (Mock Data) ---
const mockFriends = [
	{
		id: "friend-1",
		name: "Alice",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "OK, hẹn gặp bạn chiều nay!",
		isGroup: false,
	},
	{
		id: "friend-2",
		name: "Bob",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Bạn đã xem tài liệu mình gửi chưa?",
		isGroup: false,
	},
	{
		id: "group-1",
		name: "Nhóm Dự án Optimind",
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Alice: Nhớ push code trước 5h nhé.",
		isGroup: true,
	},
];

const mockRequests = [
	{ id: "req-1", name: "Charlie", avatar: "https://github.com/shadcn.png" },
	{ id: "req-2", name: "David", avatar: "https://github.com/shadcn.png" },
];

const allMessages = {
	"friend-1": [
		{
			id: "m1",
			senderId: "friend-1",
			text: "Hey! Đang làm gì đó?",
			timestamp: "10:30",
		},
		{
			id: "m2",
			senderId: "me",
			text: "Chào, mình đang code trang chat.",
			timestamp: "10:31",
		},
		{
			id: "m3",
			senderId: "friend-1",
			text: "OK, hẹn gặp bạn chiều nay!",
			timestamp: "10:32",
		},
	],
	"friend-2": [
		{
			id: "m4",
			senderId: "friend-2",
			text: "Bạn đã xem tài liệu mình gửi chưa?",
			timestamp: "11:00",
		},
	],
	"group-1": [
		{
			id: "m5",
			senderId: "friend-1",
			text: "Nhớ push code trước 5h nhé.",
			timestamp: "11:30",
		},
		{
			id: "m6",
			senderId: "friend-2",
			text: "Ok, mình đang làm dở.",
			timestamp: "11:31",
		},
	],
};
// --- Kết thúc Mock Data ---

export default function ConnectPage() {
	// === State quản lý giao diện ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
	);

	// === State cho Chat ===
	const [activeTab, setActiveTab] = useState("friends");
	const [selectedChat, setSelectedChat] = useState(null || mockFriends[0]);
	const [isInfoPanelOpen, setInfoPanelOpen] = useState(false); // State mới

	const currentMessages = selectedChat
		? allMessages[selectedChat.id] || []
		: [];

	// Hàm tiện ích
	const glassEffect =
		"bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

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
				{/* === 1. Sidebar bên trái (Giữ nguyên) === */}
				<nav
					className={cn(
						"absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					{/* ... Các nút sidebar ... */}
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
						<Users /> {/* Active */}
					</Button>
				</nav>

				{/* === 2. Thanh công cụ (Bên phải) (Giữ nguyên) === */}
				<div
					className={cn(
						"absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					{/* ... Các nút toolbar ... */}
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Video />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Music />
					</Button>
				</div>

				{/* === 3. Avatar người dùng (Góc trên phải) (Giữ nguyên) === */}
				<div className="absolute top-6 right-6 flex items-center gap-3">
					{/* ... Avatar & Bell ... */}
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

				{/* === 4. Nội dung chính - Chat (Nội dung mới) === */}
				<div
					className={cn(
						"absolute top-20 bottom-6 left-24 right-24",
						"flex divide-x divide-white/20",
						glassEffect,
						"overflow-hidden"
					)}
				>
					{/* --- Cột 1: Sidebar Chat (Bạn bè & Requests) --- */}
					<div className="flex-[0.35] p-4 flex flex-col gap-4">
						{/* ... Thanh tìm kiếm, Nút tạo nhóm, Tabs ... */}
						<div className="relative">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
								size={18}
							/>
							<Input
								placeholder="Tìm kiếm người dùng..."
								className="bg-white/10 border-none pl-10 focus-visible:ring-1 focus-visible:ring-white/80"
							/>
						</div>
						<Button
							variant="outline"
							className="bg-transparent hover:bg-white/20 text-white"
						>
							<GroupIcon size={16} className="mr-2" /> Tạo nhóm
							chat
						</Button>
						<div className="grid grid-cols-2 gap-2">
							<Button
								variant={
									activeTab === "friends"
										? "secondary"
										: "ghost"
								}
								className={cn(
									activeTab === "friends" &&
										"bg-white/30 hover:bg-white/40 text-white",
									activeTab !== "friends" &&
										"hover:bg-white/10 text-white/70"
								)}
								onClick={() => setActiveTab("friends")}
							>
								<MessageCircle size={16} className="mr-2" /> Bạn
								bè ({mockFriends.length})
							</Button>
							<Button
								variant={
									activeTab === "requests"
										? "secondary"
										: "ghost"
								}
								className={cn(
									activeTab === "requests" &&
										"bg-white/30 hover:bg-white/40 text-white",
									activeTab !== "requests" &&
										"hover:bg-white/10 text-white/70"
								)}
								onClick={() => setActiveTab("requests")}
							>
								<UserPlus size={16} className="mr-2" /> Lời mời
								({mockRequests.length})
							</Button>
						</div>

						{/* Danh sách (scrollable) */}
						<div className="flex-1 overflow-y-auto -mr-4 pr-3 space-y-2">
							{activeTab === "friends" &&
								mockFriends.map((friend) => (
									<button
										key={friend.id}
										onClick={() => {
											setSelectedChat(friend);
											setInfoPanelOpen(false); // Ẩn info panel khi đổi chat
										}}
										className={cn(
											"w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors",
											"hover:bg-white/20",
											selectedChat?.id === friend.id &&
												"bg-white/20"
										)}
									>
										{/* ... item bạn bè ... */}
										<Avatar className="h-10 w-10">
											<AvatarImage src={friend.avatar} />
											<AvatarFallback>
												{friend.name[0]}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 overflow-hidden">
											<h4 className="font-semibold truncate">
												{friend.name}
											</h4>
											<p className="text-xs text-white/70 truncate">
												{friend.lastMessage}
											</p>
										</div>
									</button>
								))}

							{activeTab === "requests" &&
								mockRequests.map((req) => (
									<div
										key={req.id}
										className="w-full p-3 rounded-lg flex items-center gap-3 bg-black/20"
									>
										{/* ... item lời mời ... */}
									</div>
								))}
						</div>
					</div>

					{/* --- Cột 2: Khung Chat Chi tiết --- */}
					{/* [THAY ĐỔI] Thêm logic co giãn cho Cột 2 */}
					<div
						className={cn(
							"flex flex-col h-full transition-all duration-300",
							isInfoPanelOpen ? "flex-[0.40]" : "flex-[0.65]"
						)}
					>
						{selectedChat ? (
							<>
								{/* Header của Chat */}
								<div className="p-4 flex items-center justify-between border-b border-white/20">
									<div className="flex items-center gap-3">
										<Avatar>
											<AvatarImage
												src={selectedChat.avatar}
											/>
											<AvatarFallback>
												{selectedChat.name[0]}
											</AvatarFallback>
										</Avatar>
										<h3 className="text-lg font-bold">
											{selectedChat.name}
										</h3>
									</div>
									{/* [MỚI] Nút bật/tắt Info Panel */}
									<Button
										variant="ghost"
										size="icon"
										className="text-white/70 hover:text-white hover:bg-white/20"
										onClick={() =>
											setInfoPanelOpen(!isInfoPanelOpen)
										}
									>
										<Info size={20} />
									</Button>
								</div>

								{/* Nội dung tin nhắn (scrollable) */}
								<div className="flex-1 p-4 space-y-4 overflow-y-auto">
									{currentMessages.map((msg) => {
										const isMe = msg.senderId === "me";
										return (
											// [THAY ĐỔI] Cập nhật layout tin nhắn
											<div
												key={msg.id}
												className={cn(
													"flex items-end gap-2", // Thêm items-end và gap
													isMe
														? "justify-end"
														: "justify-start"
												)}
											>
												{/* [MỚI] Hiển thị Avatar cho người gửi */}
												{!isMe && (
													<Avatar className="h-8 w-8">
														<AvatarImage
															src={
																selectedChat.avatar
															}
														/>
														<AvatarFallback>
															{
																selectedChat
																	.name[0]
															}
														</AvatarFallback>
													</Avatar>
												)}

												{/* Bong bóng chat */}
												<div
													className={cn(
														"p-3 rounded-lg max-w-xs",
														isMe
															? "bg-blue-600 text-white"
															: "bg-white/20"
													)}
												>
													<p className="text-sm">
														{msg.text}
													</p>
													<p className="text-xs text-white/70 mt-1 text-right">
														{msg.timestamp}
													</p>
												</div>
											</div>
										);
									})}
								</div>

								{/* Khung nhập tin nhắn (Giữ nguyên) */}
								<div className="p-4 border-t border-white/20">
									<div className="flex gap-2">
										<Input
											placeholder="Nhập tin nhắn..."
											className="bg-white/10 border-none focus-visible:ring-1 focus-visible:ring-white/80"
										/>
										<Button className="bg-blue-600 hover:bg-blue-700">
											<Send size={18} />
										</Button>
									</div>
								</div>
							</>
						) : (
							<div className="h-full flex items-center justify-center text-white/50">
								<p>Chọn một đoạn chat để bắt đầu</p>
							</div>
						)}
					</div>

					{/* [MỚI] --- Cột 3: Info Panel --- */}
					{isInfoPanelOpen && selectedChat && (
						<div className="flex-[0.25] flex flex-col p-4 border-l border-white/20 animate-in slide-in-from-right-10 duration-300">
							{/* Header */}
							<div className="flex justify-between items-center pb-4 mb-4 border-b border-white/20">
								<h3 className="text-xl font-bold">Thông tin</h3>
								<Button
									variant="ghost"
									size="icon"
									className="text-white/70 hover:text-white hover:bg-white/20"
									onClick={() => setInfoPanelOpen(false)}
								>
									<X size={20} />
								</Button>
							</div>

							{/* Nội dung Info */}
							<div className="flex flex-col items-center text-center">
								<Avatar className="h-24 w-24 mb-4">
									<AvatarImage src={selectedChat.avatar} />
									<AvatarFallback className="text-4xl">
										{selectedChat.name[0]}
									</AvatarFallback>
								</Avatar>
								<h2 className="text-2xl font-bold">
									{selectedChat.name}
								</h2>
								<p className="text-sm text-white/70">
									{selectedChat.isGroup
										? "Nhóm"
										: "Hồ sơ cá nhân"}
								</p>

								{/* Các nút hành động */}
								<div className="mt-6 w-full space-y-2">
									<Button
										variant="destructive"
										className="w-full bg-red-600/80 hover:bg-red-600"
									>
										{selectedChat.isGroup
											? "Rời nhóm"
											: "Hủy kết bạn"}
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
