"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, registerSchema } from "../schemas/auth-schema";

import z from "zod";

export async function login(formData: z.infer<typeof loginSchema>) {
	const supabase = await createClient();

	const { success, data } = loginSchema.safeParse(formData);
	if (!success) {
		return { error: true, message: "Invalid login data" };
	}

	const { data: loginData, error } = await supabase.auth.signInWithPassword({
		email: data?.email,
		password: data?.password,
	});

	if (error) {
		return {
			error: true,
			message: error.message || "Sai tên đăng nhập hoặc mật khẩu",
		};
	}

	revalidatePath("/", "layout");
	redirect("/study");
}

export async function register(formData: z.infer<typeof registerSchema>) {
	const supabase = await createClient();

	const { success, data } = registerSchema.safeParse(formData);
	if (!success) {
		return { error: true, message: "Invalid register data" };
	}

	const { error } = await supabase.auth.signUp({
		email: data?.email,
		password: data?.password,
	});

	if (error) {
		return { error: true, message: error.message || "Đăng ký thất bại" };
	}

	revalidatePath("/", "layout");
	redirect("/auth/login");
}

export const googleLogin = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo:
				"https://waykdidpohnajspzrvnl.supabase.co/auth/v1/callback",
		},
	});

	// Chỉ kiểm tra lỗi khởi tạo (ví dụ: client bị lỗi)
	if (error) {
		console.error("Lỗi khởi tạo OAuth:", error);
		return { error: true, message: "Lỗi khởi tạo đăng nhập" };
	}

	if (data.url) {
		redirect(data.url); // use the redirect API for your server framework
	}
	return { error: false, message: "Quay về trang đăng nhập" };
};

export const logout = async () => {
	const supabase = await createClient();

	// Check if a user's logged in
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { error: true, message: "User not authenticated" };
	}
	await supabase.auth.signOut();

	revalidatePath("/", "layout");
	redirect("/auth/login");
};
