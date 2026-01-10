"use server";

import { cn } from "@/lib/utils";
import ChatList from "@/components/chat/chat-list";
import { getJoinedChats } from "@/supabase/lib/getChat";
import { getCurrentUser } from "@/supabase/lib/getCurrentUser";
import { redirect } from "next/navigation";

// Hàm tiện ích
const glassEffect =
	"bg-black/40 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

export default async function ChatPage({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();
	if (user == null) {
		redirect("/auth/login");
	}
	const [joinedChats] = await Promise.all([getJoinedChats(user.id)]);

	return (
		<main className="h-screen w-screen text-white p-6 transition-all duration-500">
			{/* === Nội dung chính - Chat === */}
			<div
				className={cn(
					"absolute h-140 max-w-290 top-18 bottom-6 left-24 right-24", // Vị trí
					"flex divide-x divide-white/20",
					glassEffect,
					"overflow-hidden"
				)}
			>
				<ChatList chats={joinedChats} />
				{children}
			</div>
		</main>
	);
}
