import z from "zod";

export const createTaskSchema = z.object({
	title: z.string().min(1).trim(),
	note: z.string(),
	status: z.string(),
	due_date: z.date().optional(),
	repeated: z.string(),
	tag: z.array(z.string()),
	priority: z.string(),
});

export const updateTaskSchema = z.object({
	title: z.string().min(1).trim(),
	note: z.string(),
	due_date: z.date().optional(),
	repeated: z.string(),
	tag: z.array(z.string()),
	priority: z.string(),
});
