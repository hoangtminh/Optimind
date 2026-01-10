"use server";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";

export const getFriend = async () => {
	const user = await getCurrentUser();
	if (user == null) {
		return null;
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("friendships")
		.select(
			`
            user_1:user_profile!user_id_1 ( id, name, image_url, study_time, email ),
            user_2:user_profile!user_id_2 ( id, name, image_url, study_time, email )
        `
		)
		.or(`user_id_1.eq.${user.id},user_id_2.eq.${user.id}`);

	if (error) {
		return null;
	}
	const friendsOnly =
		data?.map((record) => {
			return record.user_1.id === user.id ? record.user_2 : record.user_1;
		}) || [];

	return friendsOnly;
};

export const getFriendRequest = async () => {
	const user = await getCurrentUser();
	if (user == null) {
		return null;
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("friend_request")
		.select(
			`
			id,
            user: user_profile!sender_id (id, name, image_url, study_time, email)
        `
		)
		.eq("receiver_id", user.id);

	console.log("data", data);
	if (error) {
		return null;
	}
	return data || [];
};

export const getSentRequest = async () => {
	const user = await getCurrentUser();
	if (user == null) {
		return null;
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("friend_request")
		.select(
			`
			id,
            user: user_profile!receiver_id (id, name, image_url, study_time, email)
        `
		)
		.eq("sender_id", user.id);
	if (error) {
		return null;
	}
	return data || [];
};
