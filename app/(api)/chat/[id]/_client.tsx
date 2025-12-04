"use client";

import ChatInfoPanel from "@/components/chat/chat-info";
import MessagingPart from "@/components/chat/messaging-part";
import { cn } from "@/lib/utils";
import { Message } from "@/supabase/schemas/chat-schema";
import { useState } from "react";

const ChatClient = ({
	chat,
	user,
	messages,
	members,
}: {
	chat: { id: string; name: string };
	user: { id: string; name: string; image_url: string | null };
	messages: Message[];
	members: {
		member_id: string;
		name: string;
		image_url: string | null;
	}[];
}) => {
	const [isInfoPanelOpen, setIsInfoPanelOpen] = useState<boolean>(false);

	return (
		<div className={cn("flex w-full max-w-230 overflow-hidden")}>
			<MessagingPart
				chat={chat}
				user={user}
				messages={messages}
				toggleInfoPanel={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
				isInfoPanelOpen={isInfoPanelOpen}
			/>
			{isInfoPanelOpen && (
				<ChatInfoPanel
					chat={chat}
					onClose={() => setIsInfoPanelOpen(false)}
					members={members}
				/>
			)}
		</div>
	);
};

export default ChatClient;
