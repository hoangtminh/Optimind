"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Smile, Paperclip } from "lucide-react";
import { useRealtime, useTypingIndicator } from "@/hooks/use-real-time";

export function RealTimeChat({ roomId, className = "" }) {
	const [message, setMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);

	const { isConnected, messages, sendMessage } = useRealtime(roomId);
	const { typingUsers, startTyping, stopTyping } = useTypingIndicator();

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = () => {
		if (message.trim() && isConnected) {
			sendMessage({
				content: message.trim(),
				sender: "Me",
				isMe: true,
			});
			setMessage("");
			stopTyping("me");
			setIsTyping(false);
		}
	};

	const handleTyping = (value) => {
		setMessage(value);

		if (value.trim() && !isTyping) {
			setIsTyping(true);
			startTyping("me", "Bạn");
		} else if (!value.trim() && isTyping) {
			setIsTyping(false);
			stopTyping("me");
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<Card className={`flex flex-col h-full ${className}`}>
			<CardHeader className="pb-3 border-b">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">Chat phòng</CardTitle>
					<div className="flex items-center gap-2">
						<div
							className={`w-2 h-2 rounded-full ${
								isConnected ? "bg-green-500" : "bg-red-500"
							}`}
						/>
						<span className="text-xs text-gray-500">
							{isConnected ? "Đã kết nối" : "Đang kết nối..."}
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className="flex-1 p-0 overflow-hidden">
				<ScrollArea className="h-full p-4">
					<div className="space-y-4">
						{messages.map((msg) => (
							<div key={msg.id}>
								{msg.type === "system" ? (
									<div className="text-center">
										<Badge
											variant="secondary"
											className="text-xs"
										>
											{msg.content}
										</Badge>
									</div>
								) : (
									<div
										className={`flex ${
											msg.isMe
												? "justify-end"
												: "justify-start"
										}`}
									>
										<div
											className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
												msg.isMe
													? "bg-blue-500 text-white"
													: "bg-gray-100 text-gray-900"
											}`}
										>
											{!msg.isMe && (
												<p className="text-xs font-medium mb-1 opacity-70">
													{msg.sender}
												</p>
											)}
											<p className="text-sm whitespace-pre-wrap">
												{msg.content}
											</p>
											<p
												className={`text-xs mt-1 ${
													msg.isMe
														? "text-blue-100"
														: "text-gray-500"
												}`}
											>
												{msg.timestamp}
											</p>
										</div>
									</div>
								)}
							</div>
						))}

						{/* Typing Indicators */}
						{typingUsers.filter((u) => u.id !== "me").length >
							0 && (
							<div className="flex justify-start">
								<div className="bg-gray-100 px-4 py-2 rounded-lg">
									<div className="flex items-center space-x-1">
										<div className="flex space-x-1">
											<div
												className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
												style={{
													animationDelay: "0ms",
												}}
											/>
											<div
												className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
												style={{
													animationDelay: "150ms",
												}}
											/>
											<div
												className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
												style={{
													animationDelay: "300ms",
												}}
											/>
										</div>
										<span className="text-xs text-gray-500 ml-2">
											{typingUsers
												.filter((u) => u.id !== "me")
												.map((u) => u.name)
												.join(", ")}{" "}
											đang nhập...
										</span>
									</div>
								</div>
							</div>
						)}

						<div ref={messagesEndRef} />
					</div>
				</ScrollArea>
			</CardContent>

			<div className="p-4 border-t">
				<div className="flex items-end space-x-2">
					<div className="flex-1">
						<Input
							ref={inputRef}
							placeholder="Nhập tin nhắn..."
							value={message}
							onChange={(e) => handleTyping(e.target.value)}
							onKeyPress={handleKeyPress}
							disabled={!isConnected}
							className="resize-none"
						/>
					</div>
					<div className="flex space-x-1">
						<Button
							size="sm"
							variant="ghost"
							disabled={!isConnected}
						>
							<Smile className="h-4 w-4" />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							disabled={!isConnected}
						>
							<Paperclip className="h-4 w-4" />
						</Button>
						<Button
							size="sm"
							onClick={handleSendMessage}
							disabled={!isConnected || !message.trim()}
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
