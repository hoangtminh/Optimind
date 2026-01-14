"use server";

import { createAdminClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";

export const getAllTask = async () => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = createAdminClient();
	const { data: task, error } = await supabase
		.from("task")
		.select(
			"id, title, note, due_date, is_completed, tag, repeated, status, priority, project_id"
		)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) return null;

	return task;
};

export const getTasksByProject = async (projectId: string) => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = createAdminClient();
	const { data: task, error } = await supabase
		.from("task")
		.select(
			"id, title, note, due_date, is_completed, tag, repeated, status, priority"
		)
		.eq("user_id", user.id)
		.eq("project_id", projectId)
		.order("created_at", { ascending: false });

	if (error) return null;

	return task;
};
