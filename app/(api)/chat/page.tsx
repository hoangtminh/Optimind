"use client";

import CreateChat from "@/components/chat/chat-tab/create-chat";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ChatEmptyPage() {
	const [isCreateChatOpen, setIsCreateChatOpen] = useState<boolean>(false);
	return (
		<div className="w-full h-full flex flex-col gap-4 items-center justify-center">
			<div className="text-white/70 text-2xl">
				Select or Create a new Chat
			</div>
			<Button
				onClick={() => setIsCreateChatOpen(true)}
				variant={"outline"}
				className="text-black cursor-pointer hover:bg-gray-200"
			>
				Create New Chat
			</Button>
			<CreateChat
				isCreateChatOpen={isCreateChatOpen}
				setIsCreateChatOpen={setIsCreateChatOpen}
			/>
		</div>
	);
}
