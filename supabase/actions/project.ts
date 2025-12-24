"use server";

import { createAdminClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../lib/getCurrentUser";
import { createProjectSchema } from "../schemas/project-schema";
import z from "zod";

export const createProject = async (
	formData: z.infer<typeof createProjectSchema>
) => {
	const { success, data } = createProjectSchema.safeParse(formData);

	if (!success) {
		return { error: true, message: "Invalid task data" };
	}

	const user = await getCurrentUser();
	if (user === null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = createAdminClient();
	const { data: project, error: projectError } = await supabase
		.from("project")
		.insert({
			user_id: user.id,
			name: data.name,
			description: data.description,
		})
		.select("id")
		.single();

	if (project === null) {
		return {
			error: true,
			message: projectError?.message || "Failed to create project",
		};
	}

	return { error: false, message: "Create project successfully" };
};
