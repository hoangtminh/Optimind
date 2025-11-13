// Tên file: app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Brain, Mail, Lock, Chrome, Apple, ArrowLeft } from "lucide-react"; // Thêm icon
import { cn } from "@/lib/utils";

// Đảm bảo bạn đã tạo file .env.local với 2 biến này
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Hàm tiện ích cho hiệu ứng "kính mờ"
const glassEffect =
	"bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl";

export default function LoginPage() {
	// === State ===
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Khởi tạo Supabase client và router
	const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
	const router = useRouter();

	// === Handlers ===
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (signInError) {
			setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
			setIsLoading(false);
		} else {
			// Đăng nhập thành công, chuyển hướng đến trang chủ
			router.push("/");
			router.refresh(); // Làm mới session phía server
		}
	};

	// MỚI: Xử lý đăng nhập OAuth (Google, Apple)
	const handleOAuthLogin = async (provider: "google" | "apple") => {
		setIsLoading(true);
		setError(null);
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${location.origin}/auth/callback`,
			},
		});
		// Không cần setIsLoading(false) vì trang sẽ tự chuyển hướng
	};

	return (
		<main
			className="h-screen w-screen text-white p-6 transition-all duration-500"
			style={{
				backgroundImage: `url(https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop)`, // Hình nền sống động
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Container để căn giữa form */}
			<div className="relative w-full h-full flex items-center justify-center">
				{/* === THAY ĐỔI: Bố cục 2 cột === */}
				<div
					className={cn(
						"w-full max-w-4xl h-auto md:h-[650px] flex overflow-hidden", // Tăng chiều rộng
						glassEffect // Áp dụng hiệu ứng
					)}
				>
					{/* === CỘT TRÁI (Ảnh nền + Quote) === */}
					<div
						className="w-1/2 relative h-full hidden md:flex flex-col justify-between p-8"
						style={{
							backgroundImage: `url(https://i.pinimg.com/736x/30/e7/cb/30e7cb6ab85a69c8e57e9e591e73b776.jpg)`, // Ảnh nền cột trái
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						{/* Lớp phủ mờ */}
						<div className="absolute inset-0 bg-black/40 z-0" />

						{/* Logo */}
						<div className="relative z-10 flex items-center gap-2">
							<Brain className="w-8 h-8 text-white" />
							<h1 className="text-2xl font-bold text-white">
								Optimind
							</h1>
						</div>

						{/* Quote */}
						<div className="relative z-10">
							<blockquote className="text-3xl font-semibold text-white">
								"Tối ưu tâm trí. Thay đổi cuộc đời."
							</blockquote>
							<p className="text-gray-200 mt-2">
								- Sứ mệnh của chúng tôi
							</p>
						</div>
					</div>

					{/* === CỘT PHẢI (Form đăng nhập) === */}
					<div className="w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
						<Button
							asChild
							variant="ghost"
							className="absolute top-4 right-4 text-gray-300 hover:text-white"
						>
							<Link href="/">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Về trang chủ
							</Link>
						</Button>

						<h1 className="text-3xl font-bold text-white mb-2">
							Đăng nhập
						</h1>
						<p className="text-gray-300 mb-6">
							Chưa có tài khoản?{" "}
							<Link
								href="/register"
								className="font-semibold text-blue-300 hover:underline"
							>
								Đăng ký
							</Link>
						</p>

						{/* Form */}
						<form className="space-y-4" onSubmit={handleLogin}>
							{/* Trường Email */}
							<div className="relative space-y-2">
								<Label
									htmlFor="email"
									className="text-gray-100 text-sm"
								>
									Email
								</Label>
								<Mail className="absolute left-3 top-[42px] h-5 w-5 text-gray-300" />
								<Input
									id="email"
									type="email"
									placeholder="vidu@optimind.vn"
									className="pl-10 text-base bg-white/10 border-white/20 placeholder:text-gray-300 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							{/* Trường Mật khẩu */}
							<div className="relative space-y-2">
								<div className="flex justify-between items-center">
									<Label
										htmlFor="password"
										className="text-gray-100 text-sm"
									>
										Mật khẩu
									</Label>
									<Link
										href="/forgot-password"
										className="text-sm text-blue-300 hover:underline"
									>
										Quên mật khẩu?
									</Link>
								</div>
								<Lock className="absolute left-3 top-[42px] h-5 w-5 text-gray-300" />
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									className="pl-10 text-base bg-white/10 border-white/20 placeholder:text-gray-300 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>

							{/* Hiển thị thông báo lỗi */}
							{error && (
								<p className="text-yellow-300 text-sm text-center">
									{error}
								</p>
							)}

							{/* Nút Đăng nhập */}
							<Button
								type="submit"
								className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700"
								disabled={isLoading}
							>
								{isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
							</Button>
						</form>

						{/* "Or register with" Separator */}
						<div className="flex items-center gap-4 my-6">
							<div className="flex-grow h-px bg-white/20"></div>
							<span className="text-gray-300 text-sm">
								Hoặc đăng nhập với
							</span>
							<div className="flex-grow h-px bg-white/20"></div>
						</div>

						{/* Social Logins */}
						<div className="flex flex-col gap-4">
							<Button
								variant="outline"
								className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
								onClick={() => handleOAuthLogin("google")}
								disabled={isLoading}
							>
								<Chrome className="w-5 h-5 mr-2" /> Google
							</Button>
							<Button
								variant="outline"
								className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
								onClick={() => handleOAuthLogin("apple")}
								disabled={isLoading}
							>
								<Apple className="w-5 h-5 mr-2" /> Apple
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
