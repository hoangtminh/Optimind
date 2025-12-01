import React from "react";
import { Input } from "@/components/ui/input";
import z from "zod";
import { loginSchema } from "@/supabase/schemas/auth-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { googleLogin, login } from "@/supabase/actions/auth";
import { toast } from "sonner";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import GoogleAuth from "../google-auth";

type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
	const form = useForm<FormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	const handleSubmit = async (data: FormData) => {
		const { error, message } = await login(data);

		if (error) {
			toast.error(message);
		} else {
			toast.success("Đăng nhập thành công");
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-1">
			<FieldGroup className="gap-2">
				<Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Email</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your email"
								className="placeholder:text-white/60"
							/>
							{fieldState.error && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>
								Password
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your password"
								type="password"
								className="placeholder:text-white/60"
							/>
							{fieldState.error && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				<Field orientation={"horizontal"} className="w-full">
					<Button
						type="submit"
						className="mt-2 h-10 text-md grow bg-blue-600 cursor-pointer hover:bg-blue-700"
						disabled={form.formState.isSubmitting}
					>
						<LoadingSwap isLoading={form.formState.isSubmitting}>
							Đăng nhập
						</LoadingSwap>
					</Button>
				</Field>

				<div className="text-center text-gray-100">
					{/* THAY ĐỔI: text-gray-100, pt-2 */}
					Chưa có tài khoản?{" "}
					<Link
						href="/auth/register"
						className="font-semibold text-blue-400 hover:underline" // THAY ĐỔI: text-blue-400
					>
						Đăng ký
					</Link>
				</div>

				{/* "Or register with" Separator */}
				<div className="flex items-center gap-2">
					<div className="grow h-px bg-white/20"></div>
					<span className="text-gray-200 text-sm">Hoặc</span>
					{/* THAY ĐỔI: text-gray-200 */}
					<div className="grow h-px bg-white/20"></div>
				</div>

				{/* Social Logins */}
				<GoogleAuth />
			</FieldGroup>
		</form>
	);
};

export default LoginForm;
