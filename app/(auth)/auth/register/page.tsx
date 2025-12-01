"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import RegisterForm from "@/components/auth/register/register-form";

// Giảm độ trong suốt
const glassEffect =
	"bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl";

export default function RegisterPage() {
	return (
		<main
			className="h-screen w-screen text-white p-3 transition-all duration-500"
			style={{
				backgroundImage: `url(https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2070&auto=format&fit=crop)`, // Hình nền sống động khác
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Container để căn giữa form */}
			<div className="relative w-full h-full flex items-center justify-center">
				{/* Bố cục 1 cột, max-w-md */}
				<div
					className={cn(
						"w-full max-w-md px-8 py-4 flex flex-col gap-4",
						glassEffect
					)}
				>
					{/* Header bên trong card */}
					<div className="flex justify-between items-center w-full">
						{/* Logo */}
						<div className="flex items-center gap-2">
							<Brain className="w-8 h-8 text-white" />
							<h1 className="text-2xl font-bold text-white">
								Optimind
							</h1>
						</div>
						{/* Nút quay lại */}
						<Button
							asChild
							variant="ghost"
							className="text-gray-300 hover:text-white"
						>
							<Link href="/">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Về trang chủ
							</Link>
						</Button>
					</div>

					{/* Đường kẻ ngang */}
					<div className="h-px bg-white/20 w-full" />

					{/* === Form Đăng Ký === */}
					<div className="w-full flex flex-col justify-center">
						{/* THAY ĐỔI: Tiêu đề động */}
						<h1 className="text-3xl font-bold text-white mb-2 text-center">
							Tạo tài khoản mới
						</h1>
						{/* THAY ĐỔI: Hiển thị form hoặc thông báo thành công */}
						<RegisterForm />
					</div>
				</div>
			</div>
		</main>
	);
}
