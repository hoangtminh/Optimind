"use client";

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import { UserPlus, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";
import ChatSection from "./chat-tab/chat-section";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FriendSection from "./friend-tab/friend-section";

// --- Component Sidebar ---
const ChatList = ({
	chats,
}: {
	chats: { id: string; name: string; memberCount: number }[];
}) => {
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
				"p-4 flex-2 flex flex-col transition-all duration-300 text-nowrap"
			}
		>
			<Tabs defaultValue="chats">
				{/* Tabs (Bạn bè / Lời mời) */}
				<TabsList className="w-full gap-2 bg-black/50">
					<TabsTrigger
						value="chats"
						className="flex-1 text-white aria-selected:text-black/90"
					>
						<MessageCircle size={16} className="mr-2" /> Đoạn chat
					</TabsTrigger>
					<TabsTrigger
						value="friends"
						className="flex-1 text-white aria-selected:text-black/90"
					>
						<UserPlus size={16} className="mr-2" /> Lời mời
					</TabsTrigger>
				</TabsList>
				<Separator className="my-2" />
				<TabsContent value="chats">
					<Suspense>
						<ChatSection chats={chats} />
					</Suspense>
				</TabsContent>
				<TabsContent value="friends">
					<Suspense>
						<FriendSection />
					</Suspense>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ChatList;
