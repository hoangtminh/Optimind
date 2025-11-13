// Tên file: app/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link"; // Dùng Link của Next.js
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Brain, // Icon cho Optimind
	Image as ImageIcon,
	Mail, // Icon cho email
	Lock, // Icon cho mật khẩu
	User, // Icon cho tên
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
	// === State quản lý giao diện (GIỮ NGUYÊN) ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop" // Ảnh núi
	);

	// Hàm tiện ích (GIỮ NGUYÊN)
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	return (
		<main
			className="h-screen w-screen text-white p-6 transition-all duration-500"
			style={{
				backgroundImage: `url(${backgroundUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Container để căn giữa form */}
			<div className="relative w-full h-full flex items-center justify-center">
				{/* === Form Đăng Ký (Nội dung chính) === */}
				<div
					className={cn(
						"w-full max-w-md p-8 flex flex-col gap-6", // Kích thước form
						glassEffect
					)}
				>
					{/* Header */}
					<div className="text-center">
						<div className="flex justify-center items-center gap-2 mb-2">
							<Brain className="w-8 h-8 text-blue-300" />
							<h1 className="text-3xl font-bold">Optimind</h1>
						</div>
						<p className="text-lg text-gray-300">
							Tạo tài khoản mới
						</p>
					</div>

					{/* Form */}
					<form className="space-y-4">
						{/* Trường Tên */}
						<div className="relative space-y-2">
							<Label htmlFor="name" className="text-gray-300">
								Họ và Tên
							</Label>
							<User className="absolute left-3 top-[42px] h-5 w-5 text-gray-400" />
							<Input
								id="name"
								type="text"
								placeholder="Nguyễn Văn A"
								className="pl-10 bg-white/10 border-white/20 placeholder:text-gray-400"
							/>
						</div>

						{/* Trường Email */}
						<div className="relative space-y-2">
							<Label htmlFor="email" className="text-gray-300">
								Email
							</Label>
							<Mail className="absolute left-3 top-[42px] h-5 w-5 text-gray-400" />
							<Input
								id="email"
								type="email"
								placeholder="vidu@optimind.vn"
								className="pl-10 bg-white/10 border-white/20 placeholder:text-gray-400"
							/>
						</div>

						{/* Trường Mật khẩu */}
						<div className="relative space-y-2">
							<Label htmlFor="password" className="text-gray-300">
								Mật khẩu
							</Label>
							<Lock className="absolute left-3 top-[42px] h-5 w-5 text-gray-400" />
							<Input
								id="password"
								type="password"
								placeholder="Tối thiểu 8 ký tự"
								className="pl-10 bg-white/10 border-white/20 placeholder:text-gray-400"
							/>
						</div>

						{/* Trường Xác nhận Mật khẩu */}
						<div className="relative space-y-2">
							<Label
								htmlFor="confirm-password"
								className="text-gray-300"
							>
								Xác nhận mật khẩu
							</Label>
							<Lock className="absolute left-3 top-[42px] h-5 w-5 text-gray-400" />
							<Input
								id="confirm-password"
								type="password"
								placeholder="Nhập lại mật khẩu"
								className="pl-10 bg-white/10 border-white/20 placeholder:text-gray-400"
							/>
						</div>

						{/* Nút Đăng ký */}
						<Button
							type="submit"
							className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700 mt-4"
						>
							Tạo tài khoản
						</Button>
					</form>

					{/* Footer */}
					<div className="text-center text-gray-300">
						Đã có tài khoản?{" "}
						<Link
							href="/login" // Link tới trang Đăng nhập
							className="font-semibold text-blue-400 hover:underline"
						>
							Đăng nhập
						</Link>
					</div>
				</div>

				{/* === Nút Đổi Hình Nền (GIỮ NGUYÊN) === */}
				<div
					className={cn(
						"absolute right-4 bottom-4 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
						onClick={() => {
							// Ví dụ đổi hình nền
							const backgrounds = [
								"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
								"https://images.unsplash.com/photo-1542662565-7e4b66bae529?q=80&w=2070&auto=format&fit=crop",
								"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
							];
							const newBg =
								backgrounds[
									Math.floor(
										Math.random() * backgrounds.length
									)
								];
							setBackgroundUrl(newBg);
						}}
					>
						<ImageIcon />
					</Button>
				</div>
			</div>
		</main>
	);
}
