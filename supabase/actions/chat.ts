"use server";

import { getCurrentUser } from "@/supabase/lib/getCurrentUser";
import { createChatSchema, Message } from "@/supabase/schemas/chat-schema";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import z from "zod";

export const createChat = async (
	formData: z.infer<typeof createChatSchema>
) => {
	const { success, data } = createChatSchema.safeParse(formData);

	if (!success) {
		return { error: true, message: "Invalid chat data" };
	}

	const user = await getCurrentUser();
	if (user === null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();
	const { data: chat, error: chatError } = await supabase
		.from("chat_room")
		.insert({
			name: data.name,
			is_public: data.isPublic,
		});

	if (chatError) {
		return {
			error: true,
			message: chatError.message || "Failed to create chat room",
		};
	}
	const { data: newChat } = await supabase
		.from("chat_room_member")
		.select("chat_room_id")
		.eq("member_id", user.id)
		.order("created_at", { ascending: false })
		.limit(1)
		.single();

	if (!newChat) {
		return {
			error: true,
			message:
				"Failed to retrieve new chat! Please refresh and try again",
		};
	}

	redirect("/chat/" + newChat.chat_room_id);
};

export const sendMessage = async (data: {
	id: string;
	text: string;
	chatId: string;
}): Promise<
	{ error: boolean; message: Message } | { error: boolean; message: string }
> => {
	const user = await getCurrentUser();
	if (user == null) {
		return { error: true, message: "User not authenticated" };
	}

	if (!data.text.trim()) {
		return { error: true, message: "Please enter new message" };
	}

	const supabase = await createClient();

	const { data: memebership, error: membershipError } = await supabase
		.from("chat_room_member")
		.select("member_id, chat_room_id")
		.eq("chat_room_id", data.chatId)
		.eq("member_id", user.id)
		.single();
	if (!memebership || membershipError) {
		return {
			error: true,
			message: membershipError.message || "User is not in the chat",
		};
	}

	const { data: message, error } = await supabase
		.from("messages")
		.insert({
			id: data.id,
			text: data.text.trim(),
			author_id: user.id,
			chat_room_id: data.chatId,
		})
		.select(
			"id, text, created_at, author_id, author:user_profile (name, image_url)"
		)
		.single();
	if (error) {
		return {
			error: true,
			message: error.message || "Failed to send message",
		};
	}

	return { error: false, message };
};

export const addUserToChat = async ({
	chatId,
	userEmail,
}: {
	chatId: string;
	userEmail: string;
}) => {
	const currentUser = await getCurrentUser();
	if (currentUser == null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data: userProfile } = await supabase
		.from("user_profile")
		.select("id")
		.eq("email", userEmail)
		.single();

	if (!userProfile) {
		return { error: true, message: "User not found" };
	}

	const { data: chatMembership, error: chatMembershipError } = await supabase
		.from("chat_room_member")
		.select("member_id")
		.eq("chat_room_id", chatId)
		.eq("member_id", currentUser.id)
		.single();

	if (chatMembershipError || !chatMembership) {
		return {
			error: true,
			message:
				chatMembershipError.message ||
				"Current user is not in the chat",
		};
	}

	const { data: existingMembership } = await supabase
		.from("chat_room_member")
		.select("member_id")
		.eq("chat_room_id", chatId)
		.eq("member_id", userProfile.id)
		.single();

	if (existingMembership) {
		return { error: true, message: "User is already in the chat" };
	}

	const { error: insertError } = await supabase
		.from("chat_room_member")
		.insert({ chat_room_id: chatId, member_id: userProfile.id });

	if (insertError) {
		return {
			error: true,
			message: insertError.message || "Failed to add user",
		};
	}

	return { error: false, message: "Successfully added user to chat" };
};

export const deleteUserFromChat = async ({
	chatId,
	userId,
}: {
	chatId: string;
	userId: string;
}) => {
	const currentUser = await getCurrentUser();
	if (currentUser == null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data: chatMembership, error: chatMembershipError } = await supabase
		.from("chat_room_member")
		.select("member_id")
		.eq("chat_room_id", chatId)
		.eq("member_id", currentUser.id)
		.single();

	if (chatMembershipError || !chatMembership) {
		return {
			error: true,
			message:
				chatMembershipError.message ||
				"Current user is not in the chat",
		};
	}

	const { data: userProfile } = await supabase
		.from("user_profile")
		.select("id")
		.eq("id", userId)
		.single();

	if (!userProfile) {
		return { error: true, message: "User not found" };
	}

	const { data: existingMembership, error } = await supabase
		.from("chat_room_member")
		.select("member_id")
		.eq("chat_room_id", chatId)
		.eq("member_id", userId)
		.single();

	if (!existingMembership) {
		return {
			error: true,
			message: error?.message || "User is not in the chat",
		};
	}

	const { error: deleteError } = await supabase
		.from("chat_room_member")
		.delete()
		.eq("chat_room_id", chatId)
		.eq("member_id", userId);

	if (deleteError) {
		return {
			error: true,
			message: deleteError.message || "Failed to add user",
		};
	}

	return { error: false, message: "Successfully delete user to chat" };
};
