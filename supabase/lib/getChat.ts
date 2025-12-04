import { createAdminClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";

export const getChat = async (id: string) => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = createAdminClient();
	const { data: chat, error } = await supabase
		.from("chat_room")
		.select("id, name, chat_room_member!inner ()")
		.eq("id", id)
		.eq("chat_room_member.member_id", user.id)
		.single();

	if (error) return null;
	return chat;
};

export const getUsers = async () => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = createAdminClient();

	const { data, error } = await supabase
		.from("user_profile")
		.select("id, name, image_url")
		.eq("id", user.id)
		.single();
	if (error) return null;
	return data;
};

export const getMessages = async (chatId: string) => {
	const supabase = createAdminClient();

	const { data, error } = await supabase
		.from("messages")
		.select(
			"id, text, created_at, author_id, author:user_profile (name, image_url)"
		)
		.eq("chat_room_id", chatId)
		.order("created_at", { ascending: false })
		.limit(50);
	if (error) return [];
	return data;
};

export const getChatMembers = async (chatId: string) => {
	const supabase = createAdminClient();
	const { data, error } = await supabase
		.from("chat_room_member")
		.select("member_id, member:user_profile (name, image_url)")
		.eq("chat_room_id", chatId);

	if (error) return [];
	return data.map((member) => ({
		member_id: member.member_id,
		name: member.member.name,
		image_url: member.member.image_url,
	}));
};
