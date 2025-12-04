"use server";

import {
	getChat,
	getChatMembers,
	getMessages,
	getUsers,
} from "@/supabase/lib/getChat";
import { notFound } from "next/navigation";
import ChatClient from "./_client";

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const [chat, user, messages, members] = await Promise.all([
		getChat(id),
		getUsers(),
		getMessages(id),
		getChatMembers(id),
	]);

	if (chat == null || user == null) return notFound();

	return (
		<ChatClient
			chat={chat}
			user={user}
			messages={messages}
			members={members}
		/>
	);
};

export default ChatPage;
