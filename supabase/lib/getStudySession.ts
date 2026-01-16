"use server";

import { createAdminClient, createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./getCurrentUser";

export const getStudySessions = async () => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = await createClient();
	const { data: sessions, error } = await supabase
		.from("study_session")
		.select(
			"id, average_focus, start_time, end_time, total_time, session_type, focus_time, break_time, cycles, created_at"
		)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.error(error);
		return null;
	}

	return sessions;
};

export const getLogOfSession = async (sessionId: string) => {
	const user = await getCurrentUser();
	if (user == null) return null;

	const supabase = await createClient();

	// Verify the current user owns the session
	const { data: session, error: sessionError } = await supabase
		.from("study_session")
		.select("id")
		.eq("id", sessionId)
		.eq("user_id", user.id)
		.single();

	if (session == null || sessionError) return null;

	const { data: logs, error } = await supabase
		.from("session_log")
		.select("id, focus_point, timestamp, created_at")
		.eq("session_id", sessionId)
		.order("created_at", { ascending: true });

	if (error) {
		console.error(error);
		return null;
	}

	return logs;
};
