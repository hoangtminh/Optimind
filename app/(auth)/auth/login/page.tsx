"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Brain, ArrowLeft } from "lucide-react"; // Thêm icon
import { cn } from "@/lib/utils";
import LoginForm from "@/components/auth/login/login-form";

// Giảm độ trong suốt
const glassEffect =
	"bg-black/50 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl";

export default function LoginPage() {
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
				{/* === THAY ĐỔI: Bố cục 1 cột, max-w-md === */}
				<div
					className={cn(
						"w-full max-w-md p-8 flex flex-col gap-4", // THAY ĐỔI: gap-6 -> gap-4
						glassEffect // Áp dụng hiệu ứng
					)}
				>
					{/* === MỚI: Header bên trong card === */}
					<div className="flex justify-between items-center w-full">
						{/* Logo */}
						<div className="flex items-center gap-2">
							{/* THAY ĐỔI: Thêm màu gradient cho icon */}
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

					{/* === CỘT PHẢI (Form đăng nhập) === */}
					<div className="w-full flex flex-col justify-center">
						{/* THAY ĐỔI: Tiêu đề căn giữa */}
						<h1 className="text-3xl font-bold text-white mb-4 text-center">
							{/* THAY ĐỔI: mb-6 -> mb-4 */}
							Chào mừng trở lại!
						</h1>

						{/* Form */}
						<LoginForm />
					</div>
				</div>
			</div>
		</main>
	);
}
