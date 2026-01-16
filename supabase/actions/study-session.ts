"use server";

import { createStudySessionSchema } from "../schemas/study-session-schema";
import { getCurrentUser } from "../lib/getCurrentUser";
import { createAdminClient, createClient } from "@/utils/supabase/server";
import {
	CreateStudySession,
	FocusDataPoint,
	StudySession,
} from "@/lib/type/session-type";

export const createSession = async (
	sessionData: CreateStudySession,
	focusData: FocusDataPoint[]
) => {
	const { success, data } = createStudySessionSchema.safeParse(sessionData);
	if (!success) {
		return { error: true, message: "Invalid session data" };
	}

	const user = await getCurrentUser();
	if (user === null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = createAdminClient();
	const { data: session, error: sessionError } = await supabase
		.from("study_session")
		.insert({
			user_id: user.id,
			start_time: data.start_time,
			end_time: data.end_time,
			focus_time: data.focus_time,
			break_time: data.break_time,
			total_time: data.total_time,
			cycles: data.cycles,
			average_focus: data.average_focus / focusData.length,
			session_type: data.session_type,
		})
		.select("id")
		.single();

	if (session == null) {
		console.log(sessionError);
		return {
			error: true,
			message: "Failed to save session. Please try again",
		};
	}

	const { data: focusLogData, error: focusLogError } = await supabase
		.from("session_log")
		.insert(
			focusData.map((p) => ({
				user_id: user.id,
				session_id: session.id,
				...p,
			}))
		)
		.select("id");

	if (focusLogData == null) {
		await supabase.from("study_session").delete().eq("id", session.id);
		return {
			error: true,
			message: "Failed to save focus data",
		};
	}

	return { error: false, message: "Saved session successfully" };
};
