import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import GoogleAuth from "../google-auth";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { registerSchema } from "@/supabase/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { register } from "@/supabase/actions/auth";
import { toast } from "sonner";

type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
	const form = useForm<FormData>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(registerSchema),
	});

	const handleRegister = async (formData: FormData) => {
		const { error, message } = await register(formData);

		if (error) {
			toast.error(message);
		} else {
			toast.success("Đăng ký thành công");
		}
	};

	return (
		<form
			className="space-y-3"
			onSubmit={form.handleSubmit(handleRegister)}
		>
			<FieldGroup className="gap-0 space-y-1.5">
				{/* MỚI: Trường Tên người dùng */}
				<Controller
					name="username"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>
								Username
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter username"
								className="placeholder:text-white/60"
							/>
							{fieldState.error && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				{/* Trường Mật khẩu */}
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

				{/* MỚI: Trường Xác nhận Mật khẩu */}
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
								className="placeholder:text-white/60"
								type="password"
							/>
							{fieldState.error && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				{/* MỚI: Trường Xác nhận Mật khẩu */}
				<Controller
					name="confirmPassword"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								className="p-0 m-0"
								htmlFor={field.name}
							>
								Confirm Password
							</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Confirm your password"
								className="placeholder:text-white/60"
								type="password"
							/>
							{fieldState.error && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>

				{/* Link Đăng nhập */}
				<div className="text-center text-gray-100 pt-2">
					Đã có tài khoản?{" "}
					<Link
						href="/auth/login"
						className="font-semibold text-blue-400 hover:underline"
					>
						Đăng nhập
					</Link>
				</div>

				{/* Nút Đăng ký */}
				<Button
					type="submit"
					className="w-full text-md h-10 cursor-pointer bg-blue-600 hover:bg-blue-700"
				>
					Tạo tài khoản
				</Button>

				{/* "Or register with" Separator */}
				<div className="flex items-center gap-2">
					<div className="grow h-px bg-white/20"></div>
					<span className="text-gray-200 text-sm">Hoặc</span>
					<div className="grow h-px bg-white/20"></div>
				</div>
				<GoogleAuth />
			</FieldGroup>
		</form>
	);
};

export default RegisterForm;
