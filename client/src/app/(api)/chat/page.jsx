"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	UserPlus,
	MessageCircle,
	Send,
	Search,
	Check,
	X,
	MoreVertical,
	Phone,
	Video,
	Settings,
	UserMinus,
	Crown,
	Plus,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function SocialPage() {
	const [activeChat, setActiveChat] = useState(null);
	const [message, setMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [friendRequest, setFriendRequest] = useState("");
	const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
	const [groupName, setGroupName] = useState("");
	const [selectedFriends, setSelectedFriends] = useState([]);
	const messagesEndRef = useRef(null);

	// Mock data
	const [friends] = useState([
		{
			id: 1,
			name: "Nguyễn Văn A",
			email: "nguyenvana@email.com",
			status: "online",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		{
			id: 2,
			name: "Trần Thị B",
			email: "tranthib@email.com",
			status: "offline",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		{
			id: 3,
			name: "Lê Văn C",
			email: "levanc@email.com",
			status: "studying",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		{
			id: 4,
			name: "Phạm Thị D",
			email: "phamthid@email.com",
			status: "online",
			avatar: "/placeholder.svg?height=40&width=40",
		},
	]);

	const [friendRequests] = useState([
		{
			id: 5,
			name: "Hoàng Văn E",
			email: "hoangvane@email.com",
			avatar: "/placeholder.svg?height=40&width=40",
			type: "received",
		},
		{
			id: 6,
			name: "Vũ Thị F",
			email: "vuthif@email.com",
			avatar: "/placeholder.svg?height=40&width=40",
			type: "sent",
		},
	]);

	const [chats] = useState([
		{
			id: 1,
			type: "direct",
			name: "Nguyễn Văn A",
			avatar: "/placeholder.svg?height=40&width=40",
			lastMessage: "Chào bạn! Hôm nay học thế nào?",
			timestamp: "10:30",
			unread: 2,
			messages: [
				{
					id: 1,
					sender: "Nguyễn Văn A",
					content: "Chào bạn!",
					timestamp: "10:25",
					isMe: false,
				},
				{
					id: 2,
					sender: "Me",
					content: "Chào! Hôm nay thế nào?",
					timestamp: "10:26",
					isMe: true,
				},
				{
					id: 3,
					sender: "Nguyễn Văn A",
					content: "Chào bạn! Hôm nay học thế nào?",
					timestamp: "10:30",
					isMe: false,
				},
			],
		},
		{
			id: 2,
			type: "group",
			name: "Nhóm học Toán",
			avatar: "/placeholder.svg?height=40&width=40",
			lastMessage: "Ai có bài tập chương 3 không?",
			timestamp: "09:45",
			unread: 0,
			members: 5,
			messages: [
				{
					id: 1,
					sender: "Trần Thị B",
					content: "Chào mọi người!",
					timestamp: "09:40",
					isMe: false,
				},
				{
					id: 2,
					sender: "Lê Văn C",
					content: "Ai có bài tập chương 3 không?",
					timestamp: "09:45",
					isMe: false,
				},
			],
		},
		{
			id: 3,
			type: "direct",
			name: "Trần Thị B",
			avatar: "/placeholder.svg?height=40&width=40",
			lastMessage: "Cảm ơn bạn đã giúp!",
			timestamp: "Yesterday",
			unread: 0,
			messages: [
				{
					id: 1,
					sender: "Trần Thị B",
					content: "Bạn có thể giúp mình bài này không?",
					timestamp: "Yesterday",
					isMe: false,
				},
				{
					id: 2,
					sender: "Me",
					content: "Được, mình gửi cho bạn nhé",
					timestamp: "Yesterday",
					isMe: true,
				},
				{
					id: 3,
					sender: "Trần Thị B",
					content: "Cảm ơn bạn đã giúp!",
					timestamp: "Yesterday",
					isMe: false,
				},
			],
		},
	]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [activeChat]);

	const handleSendMessage = () => {
		if (message.trim() && activeChat) {
			console.log("Sending message:", message, "to chat:", activeChat.id);
			setMessage("");
		}
	};

	const handleAddFriend = () => {
		if (friendRequest.trim()) {
			// In a real app, this would send a friend request
			console.log("Sending friend request to:", friendRequest);
			setFriendRequest("");
		}
	};

	const handleCreateGroup = () => {
		if (groupName.trim() && selectedFriends.length > 0) {
			// In a real app, this would create a group chat
			console.log(
				"Creating group:",
				groupName,
				"with members:",
				selectedFriends
			);
			setGroupName("");
			setSelectedFriends([]);
			setIsGroupDialogOpen(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "studying":
				return "bg-blue-500";
			case "offline":
				return "bg-gray-400";
			default:
				return "bg-gray-400";
		}
	};

	const getStatusText = (status) => {
		switch (status) {
			case "online":
				return "Trực tuyến";
			case "studying":
				return "Đang học";
			case "offline":
				return "Ngoại tuyến";
			default:
				return "Không xác định";
		}
	};

	return (
		<div className="container mx-auto max-w-7xl">
			<div className="mb-4">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Kết nối bạn bè
				</h1>
				<p className="text-muted-foreground mt-1">
					Kết nối với bạn bè và tạo nhóm học tập cùng nhau
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
				{/* Friends and Chat List */}
				<div className="lg:col-span-1">
					<Tabs defaultValue="chats" className="h-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="chats">Chat</TabsTrigger>
							<TabsTrigger value="friends">Bạn bè</TabsTrigger>
							<TabsTrigger value="requests">Yêu cầu</TabsTrigger>
						</TabsList>

						<TabsContent value="chats" className="h-full mt-4">
							<Card className="h-full">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="text-lg">
											Tin nhắn
										</CardTitle>
										<Dialog
											open={isGroupDialogOpen}
											onOpenChange={setIsGroupDialogOpen}
										>
											<DialogTrigger asChild>
												<Button
													size="sm"
													variant="outline"
												>
													<Plus className="h-4 w-4 mr-2" />
													Nhóm
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>
														Tạo nhóm chat
													</DialogTitle>
													<DialogDescription>
														Tạo nhóm chat mới để học
														tập cùng bạn bè
													</DialogDescription>
												</DialogHeader>
												<div className="space-y-4">
													<Input
														placeholder="Tên nhóm"
														value={groupName}
														onChange={(e) =>
															setGroupName(
																e.target.value
															)
														}
													/>
													<div>
														<p className="text-sm font-medium mb-2">
															Chọn bạn bè:
														</p>
														<div className="space-y-2 max-h-40 overflow-y-auto">
															{friends.map(
																(friend) => (
																	<div
																		key={
																			friend.id
																		}
																		className="flex items-center space-x-2"
																	>
																		<input
																			type="checkbox"
																			id={`friend-${friend.id}`}
																			checked={selectedFriends.includes(
																				friend.id
																			)}
																			onChange={(
																				e
																			) => {
																				if (
																					e
																						.target
																						.checked
																				) {
																					setSelectedFriends(
																						[
																							...selectedFriends,
																							friend.id,
																						]
																					);
																				} else {
																					setSelectedFriends(
																						selectedFriends.filter(
																							(
																								id
																							) =>
																								id !==
																								friend.id
																						)
																					);
																				}
																			}}
																		/>
																		<label
																			htmlFor={`friend-${friend.id}`}
																			className="flex items-center space-x-2 cursor-pointer"
																		>
																			<Avatar className="h-6 w-6">
																				<AvatarImage
																					src={
																						friend.avatar ||
																						"/placeholder.svg"
																					}
																				/>
																				<AvatarFallback>
																					{
																						friend
																							.name[0]
																					}
																				</AvatarFallback>
																			</Avatar>
																			<span className="text-sm">
																				{
																					friend.name
																				}
																			</span>
																		</label>
																	</div>
																)
															)}
														</div>
													</div>
													<Button
														onClick={
															handleCreateGroup
														}
														className="w-full"
													>
														Tạo nhóm
													</Button>
												</div>
											</DialogContent>
										</Dialog>
									</div>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
										<Input
											placeholder="Tìm kiếm cuộc trò chuyện..."
											className="pl-10"
											value={searchQuery}
											onChange={(e) =>
												setSearchQuery(e.target.value)
											}
										/>
									</div>
								</CardHeader>
								<CardContent className="p-0">
									<ScrollArea className="h-[calc(100vh-350px)]">
										<div className="space-y-1">
											{chats.map((chat) => (
												<div
													key={chat.id}
													className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
														activeChat?.id ===
														chat.id
															? "bg-blue-50 border border-blue-200"
															: "hover:bg-gray-50"
													}`}
													onClick={() =>
														setActiveChat(chat)
													}
												>
													<div className="relative">
														<Avatar className="h-10 w-10">
															<AvatarImage
																src={
																	chat.avatar ||
																	"/placeholder.svg"
																}
															/>
															<AvatarFallback>
																{chat.name[0]}
															</AvatarFallback>
														</Avatar>
														{chat.type ===
															"group" && (
															<Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
														)}
													</div>
													<div className="flex-1 min-w-0">
														<div className="flex items-center justify-between">
															<p className="text-sm font-medium truncate">
																{chat.name}
															</p>
															<span className="text-xs text-gray-500">
																{chat.timestamp}
															</span>
														</div>
														<p className="text-sm text-gray-500 truncate">
															{chat.lastMessage}
														</p>
														{chat.type ===
															"group" && (
															<p className="text-xs text-gray-400">
																{chat.members}{" "}
																thành viên
															</p>
														)}
													</div>
													{chat.unread > 0 && (
														<Badge
															variant="destructive"
															className="h-5 w-5 p-0 flex items-center justify-center text-xs"
														>
															{chat.unread}
														</Badge>
													)}
												</div>
											))}
										</div>
									</ScrollArea>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="friends" className="h-full mt-4">
							<Card className="h-full">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg">
										Bạn bè ({friends.length})
									</CardTitle>
									<div className="flex space-x-2">
										<Input
											placeholder="Email hoặc tên người dùng"
											value={friendRequest}
											onChange={(e) =>
												setFriendRequest(e.target.value)
											}
											className="flex-1"
										/>
										<Button
											onClick={handleAddFriend}
											size="sm"
										>
											<UserPlus className="h-4 w-4" />
										</Button>
									</div>
								</CardHeader>
								<CardContent className="p-0">
									<ScrollArea className="h-[calc(100vh-350px)]">
										<div className="space-y-1 p-4">
											{friends.map((friend) => (
												<div
													key={friend.id}
													className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
												>
													<div className="relative">
														<Avatar className="h-10 w-10">
															<AvatarImage
																src={
																	friend.avatar ||
																	"/placeholder.svg"
																}
															/>
															<AvatarFallback>
																{friend.name[0]}
															</AvatarFallback>
														</Avatar>
														<div
															className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
																friend.status
															)}`}
														/>
													</div>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium truncate">
															{friend.name}
														</p>
														<p className="text-xs text-gray-500">
															{getStatusText(
																friend.status
															)}
														</p>
													</div>
													<div className="flex space-x-1">
														<Button
															size="sm"
															variant="ghost"
															onClick={() =>
																setActiveChat(
																	chats.find(
																		(c) =>
																			c.name ===
																			friend.name
																	)
																)
															}
														>
															<MessageCircle className="h-4 w-4" />
														</Button>
														<DropdownMenu>
															<DropdownMenuTrigger
																asChild
															>
																<Button
																	size="sm"
																	variant="ghost"
																>
																	<MoreVertical className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent>
																<DropdownMenuItem>
																	<Phone className="h-4 w-4 mr-2" />
																	Gọi thoại
																</DropdownMenuItem>
																<DropdownMenuItem>
																	<Video className="h-4 w-4 mr-2" />
																	Gọi video
																</DropdownMenuItem>
																<DropdownMenuItem className="text-red-600">
																	<UserMinus className="h-4 w-4 mr-2" />
																	Xóa bạn
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>
											))}
										</div>
									</ScrollArea>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="requests" className="h-full mt-4">
							<Card className="h-full">
								<CardHeader>
									<CardTitle className="text-lg">
										Yêu cầu kết bạn
									</CardTitle>
								</CardHeader>
								<CardContent className="p-0">
									<ScrollArea className="h-[calc(100vh-350px)]">
										<div className="space-y-1 p-4">
											{friendRequests.map((request) => (
												<div
													key={request.id}
													className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
												>
													<Avatar className="h-10 w-10">
														<AvatarImage
															src={
																request.avatar ||
																"/placeholder.svg"
															}
														/>
														<AvatarFallback>
															{request.name[0]}
														</AvatarFallback>
													</Avatar>
													<div className="flex-1 min-w-0">
														<p className="text-sm font-medium truncate">
															{request.name}
														</p>
														<p className="text-xs text-gray-500">
															{request.email}
														</p>
													</div>
													<div className="flex space-x-2">
														{request.type ===
														"received" ? (
															<>
																<Button
																	size="sm"
																	variant="default"
																>
																	<Check className="h-4 w-4" />
																</Button>
																<Button
																	size="sm"
																	variant="outline"
																>
																	<X className="h-4 w-4" />
																</Button>
															</>
														) : (
															<Badge variant="secondary">
																Đã gửi
															</Badge>
														)}
													</div>
												</div>
											))}
										</div>
									</ScrollArea>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>

				{/* Chat Area */}
				<div className="lg:col-span-2">
					{activeChat ? (
						<Card className="h-full flex flex-col">
							<CardHeader className="pb-3 border-b">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<Avatar className="h-10 w-10">
											<AvatarImage
												src={
													activeChat.avatar ||
													"/placeholder.svg"
												}
											/>
											<AvatarFallback>
												{activeChat.name[0]}
											</AvatarFallback>
										</Avatar>
										<div>
											<h3 className="font-semibold">
												{activeChat.name}
											</h3>
											{activeChat.type === "group" ? (
												<p className="text-sm text-gray-500">
													{activeChat.members} thành
													viên
												</p>
											) : (
												<p className="text-sm text-gray-500">
													Trực tuyến
												</p>
											)}
										</div>
									</div>
									<div className="flex space-x-2">
										<Button size="sm" variant="ghost">
											<Phone className="h-4 w-4" />
										</Button>
										<Button size="sm" variant="ghost">
											<Video className="h-4 w-4" />
										</Button>
										<Button size="sm" variant="ghost">
											<Settings className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</CardHeader>

							<CardContent className="flex-1 p-0 overflow-hidden">
								<ScrollArea className="h-full p-4">
									<div className="space-y-4">
										{activeChat.messages.map((msg) => (
											<div
												key={msg.id}
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
													{!msg.isMe &&
														activeChat.type ===
															"group" && (
															<p className="text-xs font-medium mb-1 opacity-70">
																{msg.sender}
															</p>
														)}
													<p className="text-sm">
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
										))}
										<div ref={messagesEndRef} />
									</div>
								</ScrollArea>
							</CardContent>

							<div className="p-4 border-t">
								<div className="flex space-x-2">
									<Input
										placeholder="Nhập tin nhắn..."
										value={message}
										onChange={(e) =>
											setMessage(e.target.value)
										}
										onKeyPress={(e) =>
											e.key === "Enter" &&
											handleSendMessage()
										}
										className="flex-1"
									/>
									<Button onClick={handleSendMessage}>
										<Send className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</Card>
					) : (
						<Card className="h-full flex items-center justify-center">
							<div className="text-center">
								<MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Chọn cuộc trò chuyện
								</h3>
								<p className="text-gray-500">
									Chọn một cuộc trò chuyện để bắt đầu nhắn tin
								</p>
							</div>
						</Card>
					)}
				</div>
			</div>
		</div>
	);
}
