import React, { useState } from "react";
import { PenSquareIcon, Search } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import ChatCard from "./chat-card";
import { ScrollArea } from "../../ui/scroll-area";
import CreateChat from "./create-chat";

const ChatSection = ({
	chats,
}: {
	chats: { id: string; name: string; memberCount: number }[];
}) => {
	const [isCreateChatOpen, setIsCreateChatOpen] = useState<boolean>(false);

	return (
		<div className="grid h-full">
			<div className="flex items-center gap-2 mb-2">
				{/* Thanh tìm kiếm */}
				<div className="relative p-1 flex-1">
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
				<Button
					className="bg-blue-600 hover:bg-blue-700"
					onClick={() => setIsCreateChatOpen(true)}
				>
					<PenSquareIcon />
				</Button>
			</div>
			<div className="grid w-full max-h-105">
				<ScrollArea
					type="auto"
					className="-mr-4 pr-3 space-y-3 overflow-hidden"
				>
					{chats.map((chat) => (
						<ChatCard key={chat.id} {...chat} />
					))}
				</ScrollArea>
			</div>
			<CreateChat
				isCreateChatOpen={isCreateChatOpen}
				setIsCreateChatOpen={setIsCreateChatOpen}
			/>
		</div>
	);
};

export default ChatSection;
