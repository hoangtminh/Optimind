"use server";

import { createAdminClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";

export const getAllProject = async () => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = createAdminClient();
	const { data: project, error } = await supabase
		.from("project")
		.select("id, name, description")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) return null;

	return project;
};
