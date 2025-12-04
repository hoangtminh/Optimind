"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Search, UserPlus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateChat from "./create-chat";
import ChatCard from "./chat-card";
import { redirect, usePathname } from "next/navigation";

// --- Component Sidebar ---
const ChatList = ({
	chats,
}: {
	chats: { id: string; name: string; memberCount: number }[];
}) => {
	const [isCreateChatOpen, setIsCreateChatOpen] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<"chats" | "requests">("chats");
	const pathname = usePathname();

	useEffect(() => {
		if (chats.length > 0 && pathname == "/chat") {
			redirect(`/chat/${chats[0].id}`);
		}
	}, []);

	return (
		<div
			className={
				"p-4 flex flex-col w-fit gap-4 transition-all duration-300 text-nowrap"
			}
		>
			{/* Thanh tìm kiếm */}
			<div className="relative">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
					size={18}
				/>
				<Input
					placeholder="Tìm kiếm người dùng..."
					className="bg-white/10 border-none pl-10 focus-visible:ring-1 focus-visible:ring-white/80 placeholder:text-white/60"
				/>
			</div>

			{/* Nút tạo nhóm chat (MỞ DIALOG) */}
			<Button onClick={() => setIsCreateChatOpen(true)}>
				Tạo đoạn chat mới
			</Button>

			{/* Tabs (Bạn bè / Lời mời) */}
			<div className="flex w-fit gap-2">
				<Button
					variant={activeTab === "chats" ? "secondary" : "ghost"}
					className={cn(
						"w-fit text-nowrap",
						activeTab === "chats" &&
							"bg-white/30 hover:bg-white/40 text-white",
						activeTab !== "chats" &&
							"hover:bg-white/10 text-white/70"
					)}
					onClick={() => setActiveTab("chats")}
				>
					<MessageCircle size={16} className="mr-2" /> Đoạn chat
				</Button>
				<Button
					variant={activeTab === "requests" ? "secondary" : "ghost"}
					className={cn(
						"w-fit text-nowrap",
						activeTab === "requests" &&
							"bg-white/30 hover:bg-white/40 text-white",
						activeTab !== "requests" &&
							"hover:bg-white/10 text-white/70"
					)}
					onClick={() => setActiveTab("requests")}
				>
					<UserPlus size={16} className="mr-2" /> Lời mời
				</Button>
			</div>

			{/* Danh sách (scrollable) */}
			<ScrollArea
				type="auto"
				className="flex-1 -mr-4 pr-3 space-y-3 overflow-hidden"
			>
				{activeTab === "chats" &&
					chats.map((chat) => <ChatCard key={chat.id} {...chat} />)}

				{/* {activeTab === "requests" &&
					requests.map((req) => (
						<div
							key={req.id}
							className="w-full p-3 rounded-lg flex items-center justify-between gap-3 bg-black/20"
						>
							<div className="flex items-center gap-3">
								<Avatar className="h-10 w-10">
									<AvatarImage src={req.avatar} />
									<AvatarFallback>
										{req.name[0]}
									</AvatarFallback>
								</Avatar>
								<h4 className="font-semibold truncate">
									{req.name}
								</h4>
							</div>
							<div className="flex gap-2">
								<Button
									size="sm"
									className="bg-blue-600 hover:bg-blue-700"
									onClick={() => onAcceptRequest(req.id)}
								>
									Chấp nhận
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="hover:bg-white/20"
									onClick={() => onDeclineRequest(req.id)}
								>
									Xóa
								</Button>
							</div>
						</div>
					))} */}
			</ScrollArea>
			<CreateChat
				isCreateChatOpen={isCreateChatOpen}
				setIsCreateChatOpen={setIsCreateChatOpen}
			/>
		</div>
	);
};

export default ChatList;
