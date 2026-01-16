"use server";

import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";

export const getLeaderBoard = async () => {
	const user = await getCurrentUser();
	if (!user) return null;
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("user_profile")
		.select("*")
		.limit(100)
		.order("study_time", { ascending: false });
	if (!data || error) return null;
	return data;
};

export const getUserProfile = async () => {
	const user = await getCurrentUser();
	if (!user) return null;
	const supabase = await createClient();
	const { data: user_profile } = await supabase
		.from("user_profile")
		.select("*")
		.eq("id", user.id)
		.single();

	return user_profile;
};

export const getFriendProfile = async () => {
	const user = await getCurrentUser();
	if (!user) return null;
	const supabase = await createClient();

	// Get all friend IDs from the friendships table
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
			return record.user_1.id === user.id
				? record.user_2.id
				: record.user_1.id;
		}) || [];

	// Get all friend profiles
	const { data: friend_profiles, error: profilesError } = await supabase
		.from("user_profile")
		.select("*")
		.in("id", friendsOnly);

	if (!friend_profiles || profilesError) return null;

	return friend_profiles;
};
