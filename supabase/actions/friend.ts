"use server";

import z from "zod";
import { getCurrentUser } from "../lib/getCurrentUser";
import { createAdminClient, createClient } from "@/utils/supabase/server";

export const createFriendRequests = async (userEmail: string) => {
	const { success, data } = z.email().safeParse(userEmail);

	if (!success) {
		return {
			error: true,
			message: "Invalid user email",
		};
	}

	const user = await getCurrentUser();
	if (user === null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();
	const { data: targetUser, error: targetUserError } = await supabase
		.from("user_profile")
		.select("id, email")
		.eq("email", data.toLowerCase())
		.single();

	if (targetUser == null) {
		return {
			error: true,
			message: "Target user not found",
		};
	}
	const { data: friendship, error: friendshipError } = await supabase
		.from("friendships")
		.select("id")
		.or(
			`and(user_id_1.eq.${user.id},user_id_2.eq.${targetUser.id}),and(user_id_1.eq.${targetUser.id},user_id_2.eq.${user.id})`
		)
		.single();

	if (friendship) {
		return {
			error: true,
			message: "You are already friends with this user",
		};
	}

	const { data: existingRequest, error: existingRequestError } =
		await supabase
			.from("friend_request")
			.select("id")
			.eq("sender_id", user.id)
			.eq("receiver_id", targetUser.id)
			.single();

	if (existingRequest) {
		return {
			error: true,
			message: "Request already sent to this user ",
		};
	}

	const { data: newRequest, error: newRequestError } = await supabase
		.from("friend_request")
		.insert({
			sender_id: user.id,
			receiver_id: targetUser.id,
		})
		.select(
			`
			id,
            user: user_profile!receiver_id (id, name, image_url, study_time, email)
        `
		)
		.single();

	if (newRequest == null) {
		return {
			error: true,
			message: newRequestError.message || "Failed to send request",
		};
	}

	return { error: false, message: newRequest };
};

export const acceptFriendRequest = async (requestId: string) => {
	const user = await getCurrentUser();
	if (user === null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data: request, error: requestError } = await supabase
		.from("friend_request")
		.select("*")
		.eq("id", requestId)
		.single();

	if (request == null || request.receiver_id !== user.id || requestError) {
		return { error: true, message: "Friend request not found" };
	}

	const { data: newFriend, error: newFriendError } = await supabase
		.from("user_profile")
		.select("id, name, image_url, study_time, email")
		.eq("id", request?.sender_id)
		.single();

	if (newFriend == null || newFriendError) {
		return { error: true, message: "Invalid friend data" };
	}

	const { data: existingFriendship } = await supabase
		.from("friendships")
		.select("id")
		.or(
			`and(user_id_1.eq.${request.sender_id},user_id_2.eq.${request.receiver_id}),and(user_id_1.eq.${request.receiver_id},user_id_2.eq.${request.sender_id})`
		)
		.single();

	if (existingFriendship) {
		return {
			error: true,
			message: "You are already friends with this user",
		};
	}

	const { data: friendship, error: friendshipError } = await supabase
		.from("friendships")
		.insert({
			user_id_1: request.sender_id,
			user_id_2: request.receiver_id,
		})
		.select("id")
		.single();

	if (friendship == null || friendshipError) {
		return { error: true, message: "Failed to accept request" };
	}

	return { error: false, message: newFriend };
};

export const deleteFriendRequest = async (requestId: string) => {
	const user = await getCurrentUser();
	if (user == null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();
	const { data: request, error: requestError } = await supabase
		.from("friend_request")
		.select("*")
		.eq("id", requestId)
		.single();

	if (request == null || requestError) {
		return { error: true, message: "Request does not exist" };
	}

	const { error } = await supabase
		.from("friend_request")
		.delete()
		.or(
			`and(sender_id.eq.${request.sender_id}, receiver_id.eq.${request.receiver_id}),and(sender_id.eq.${request.receiver_id},receiver_id.eq.${request.sender_id})`
		);
	if (error) {
		return { error: true, message: "Please try again!" };
	}

	return {
		error: false,
		message: "Done",
	};
};

export const declineFriendRequest = async (requestId: string) => {
	const user = await getCurrentUser();
	if (user == null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data: request, error: requestError } = await supabase
		.from("friend_request")
		.select("receiver_id")
		.eq("id", requestId)
		.single();

	if (requestError || !request) {
		return { error: true, message: "Request not found" };
	}

	if (request.receiver_id !== user.id) {
		return {
			error: true,
			message: "You are not authorized to decline this request",
		};
	}

	const { error: deleteError } = await supabase
		.from("friend_request")
		.delete()
		.eq("id", requestId);

	if (deleteError) {
		return { error: true, message: "Failed to decline request" };
	}

	return { error: false, message: "Friend request declined" };
};

export const withdrawFriendRequest = async (requestId: string) => {
	const user = await getCurrentUser();
	if (user == null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data: request, error: fetchError } = await supabase
		.from("friend_request")
		.select("sender_id")
		.eq("id", requestId)
		.single();

	if (fetchError || !request) {
		return { error: true, message: "Request not found" };
	}

	if (request.sender_id !== user.id) {
		return {
			error: true,
			message: "You are not authorized to withdraw this request",
		};
	}

	const { error: deleteError } = await supabase
		.from("friend_request")
		.delete()
		.eq("id", requestId);

	if (deleteError) {
		return { error: true, message: "Failed to withdraw request" };
	}

	return { error: false, message: "Friend request withdrawn" };
};

export const deleteFriend = async (friendId: string) => {
	const user = await getCurrentUser();
	if (user == null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();
	const { data: existingFriendship, error: existingFriendshipError } =
		await supabase
			.from("friendships")
			.select("id")
			.or(
				`and(user_id_1.eq.${friendId},user_id_2.eq.${user.id}), and(user_id_1.eq.${user.id},user_id_2.eq.${friendId})`
			)
			.single();

	if (!existingFriendship || existingFriendshipError) {
		return {
			error: true,
			message: "You are not friend with this user",
		};
	}

	const { error: deleteError } = await supabase
		.from("friendships")
		.delete()
		.eq("id", existingFriendship.id);

	if (deleteError) {
		return { error: true, message: "Can not unfriend with this user" };
	}

	return { error: false, message: "Delete friend successfully" };
};
