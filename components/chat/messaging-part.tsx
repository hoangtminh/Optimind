"use client";

import { Message } from "@/supabase/schemas/chat-schema";
import ChatInput from "@/components/chat/chat-input";
import ChatMessage from "@/components/chat/chat-message";
import InviteUserModal from "@/components/chat/invite-user-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useInfiniteScrollChat } from "@/supabase/hooks/useInfiniteScrollChat";
import { useRealtimeChat } from "@/supabase/hooks/useRealtimeChat";
import { Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MessagingPart = ({
	chat,
	user,
	messages,
	toggleInfoPanel,
	isInfoPanelOpen,
}: {
	chat: { id: string; name: string };
	user: { id: string; name: string; image_url: string | null };
	messages: Message[];
	toggleInfoPanel: () => void;
	isInfoPanelOpen: boolean;
}) => {
	const {
		loadMoreMessage,
		triggerQueryRef,
		status,
		messages: oldMessages,
	} = useInfiniteScrollChat({
		chatId: chat.id,
		startingMessages: messages.toReversed(),
	});

	const [sentMessages, setSentMessages] = useState<
		(Message & { status: "pending" | "success" | "error" })[]
	>([]);

	const { connectedUsers, messages: realtimeMessages } = useRealtimeChat({
		chatId: chat.id,
		userId: user.id,
	});

	const visibleMessages = oldMessages.concat(
		realtimeMessages,
		sentMessages.filter(
			(m) => !realtimeMessages.find((rm) => rm.id === m.id)
		)
	);

	return (
		<div
			className={cn(
				"flex flex-col w-full h-full transition-all duration-700",
				isInfoPanelOpen ? "w-150" : ""
			)}
		>
			{/* Header của Chat */}
			<div className="px-6 py-4 flex items-center justify-between border-b border-white/20">
				<div className="flex items-center gap-4">
					{/* <Avatar>
						<AvatarImage src={selectedChat.avatar} />
						<AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
					</Avatar> */}
					<div className="text-2xl font-bold">{chat.name}</div>
					<p className="text-muted/80 text-sm">
						{connectedUsers}{" "}
						{connectedUsers === 1 ? "user" : "users"} online
					</p>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="text-white/70 hover:text-white hover:bg-white/20"
					onClick={toggleInfoPanel}
				>
					<Info size={20} />
				</Button>
			</div>

			{/* Messages part*/}
			<div
				className="grow overflow-y-auto h-full flex flex-col-reverse"
				style={{
					scrollbarWidth: "thin",
					scrollbarColor: "var(--border) transparent",
					scrollbarGutter: "auto",
				}}
			>
				<div className="">
					{status === "loading" && (
						<p className="text-center text-sm text-muted/70 py-2">
							Loading more messages...
						</p>
					)}
					{status === "error" && (
						<div className="text-center">
							<p className="text-sm text-destructive py-2">
								Error loading messages
							</p>
							<Button
								onClick={loadMoreMessage}
								variant={"outline"}
							>
								Retry
							</Button>
						</div>
					)}
					{visibleMessages.map((message, index) => (
						<ChatMessage
							key={message.id}
							{...message}
							ref={
								index === 0 && status === "idle"
									? triggerQueryRef
									: null
							}
						/>
					))}
				</div>
			</div>
			{/* Khung nhập tin nhắn */}
			<ChatInput
				chatId={chat.id}
				onSend={(message) => {
					setSentMessages((prev) => [
						...prev,
						{
							id: message.id,
							text: message.text,
							created_at: new Date().toISOString(),
							author_id: user.id,
							author: {
								name: user.name,
								image_url: user.image_url,
							},
							status: "pending",
						},
					]);
				}}
				onSuccessfulSend={(message) => {
					setSentMessages((prev) =>
						prev.map((m) =>
							m.id === message.id
								? { ...message, status: "success" }
								: m
						)
					);
				}}
				onErrorSend={(id) => {
					setSentMessages((prev) =>
						prev.map((m) =>
							m.id === id ? { ...m, status: "error" } : m
						)
					);
				}}
			/>
		</div>
	);
};

export default MessagingPart;
