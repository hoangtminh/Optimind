import z from "zod";

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().trim(),
});

export const registerSchema = z.object({
	username: z.string().min(1).max(40),
	email: z.email(),
	password: z.string().min(6).max(40),
	confirmPassword: z.string().min(6).max(40),
});
