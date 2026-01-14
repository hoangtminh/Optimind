"use server";

import z from "zod";
import { createTaskSchema, updateTaskSchema } from "../schemas/task-schema";
import { getCurrentUser } from "@/supabase/lib/getCurrentUser";
import { createAdminClient, createClient } from "@/utils/supabase/server";

export const createTask = async (
	formData: z.infer<typeof createTaskSchema>,
	projectId: string
) => {
	const { success, data } = createTaskSchema.safeParse(formData);

	if (!success) {
		return { error: true, message: "Invalid task data" };
	}

	const user = await getCurrentUser();
	if (user === null) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();
	const { data: task, error: taskError } = await supabase
		.from("task")
		.insert({
			project_id: projectId,
			user_id: user.id,
			title: data.title,
			note: data.note,
			priority: data.priority,
			due_date: data.due_date?.toISOString(),
			tag: data.tag || [],
			repeated: "none",
		})
		.select("*")
		.single();

	if (task === null) {
		return {
			error: true,
			message: taskError?.message || "Failed to create task",
		};
	}
	return { error: false, message: task };
};

export const updateTaskStatus = async (taskId: string, newStatus: string) => {
	// 1. Kiểm tra xác thực người dùng
	const user = await getCurrentUser();
	if (!user) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("task")
		.update({
			status: newStatus,
			is_completed: newStatus === "complete",
			updated_at: new Date(Date.now()).toISOString(),
		})
		.eq("id", taskId)
		.eq("user_id", user.id)
		.select()
		.single();

	if (error) {
		return {
			error: true,
			message: error.message || "Failed to update task status",
		};
	}

	return { error: false, data, message: data };
};

export const updateTask = async (
	taskId: string,
	updateData: z.infer<typeof updateTaskSchema>
) => {
	const user = await getCurrentUser();
	if (!user) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	const { data: task, error: updateError } = await supabase
		.from("task")
		.update({
			title: updateData.title,
			note: updateData.note,
			priority: updateData.priority,
			due_date: updateData.due_date
				? updateData.due_date.toISOString()
				: null,
			tag: updateData.tag,
			repeated: updateData.repeated,
		})
		.eq("id", taskId)
		.eq("user_id", user.id) // Bảo mật: chỉ chủ sở hữu mới được sửa
		.select()
		.single();

	if (updateError) {
		return {
			error: true,
			message: updateError.message || "Failed to update task",
		};
	}

	return { error: false, data: task, message: "Updated task successfully" };
};

export const deleteTask = async (taskId: string) => {
	const user = await getCurrentUser();
	if (!user) {
		return { error: true, message: "User not authenticated" };
	}

	const supabase = await createClient();

	// 2. Thực hiện xóa
	const { error: deleteError } = await supabase
		.from("task")
		.delete()
		.eq("id", taskId)
		.eq("user_id", user.id); // Bảo mật: chỉ được xóa task của chính mình

	if (deleteError) {
		return {
			error: true,
			message: deleteError.message || "Failed to delete task",
		};
	}

	return { error: false, message: "Deleted task successfully" };
};
