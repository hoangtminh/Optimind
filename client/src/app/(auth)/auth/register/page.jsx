"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Brain,
	Eye,
	EyeOff,
	User,
	Mail,
	Lock,
	Shield,
	BookOpen,
	Users,
} from "lucide-react";
import Link from "next/link";
import RegisterDecoration from "@/components/register/register-decoration";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { register } = useAuth();

	const handleRegister = (e) => {
		e.preventDefault();
		register(formData);
		console.log("Register attempt:", formData);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left decorative side */}
			<RegisterDecoration />

			{/* Right form side */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="w-full max-w-120">
					<div className="bg-white rounded-2xl shadow-xl p-6">
						<div className="text-center mb-6">
							<h2 className="text-3xl font-bold text-emerald-600 mb-2">
								Tạo tài khoản
							</h2>
							<p className="text-gray-600">
								Bắt đầu hành trình học tập của bạn
							</p>
						</div>

						<form onSubmit={handleRegister} className="space-y-3">
							<div className="space-y-2">
								<Label
									htmlFor="username"
									className="text-gray-700 font-medium flex items-center gap-2"
								>
									<User className="h-4 w-4" />
									Họ và tên
								</Label>
								<Input
									id="username"
									type="text"
									placeholder="Nguyễn Văn A"
									value={formData.username}
									onChange={(e) =>
										setFormData({
											...formData,
											username: e.target.value,
										})
									}
									required
									className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-gray-700 font-medium flex items-center gap-2"
								>
									<Mail className="h-4 w-4" />
									Email
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="your@email.com"
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									required
									className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-gray-700 font-medium flex items-center gap-2"
								>
									<Lock className="h-4 w-4" />
									Mật khẩu
								</Label>
								<div className="relative">
									<Input
										id="password"
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Tối thiểu 6 ký tự"
										value={formData.password}
										onChange={(e) =>
											setFormData({
												...formData,
												password: e.target.value,
											})
										}
										required
										className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20 pr-12"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4 text-gray-500" />
										) : (
											<Eye className="h-4 w-4 text-gray-500" />
										)}
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="confirmPassword"
									className="text-gray-700 font-medium"
								>
									Xác nhận mật khẩu
								</Label>
								<div className="relative">
									<Input
										id="confirmPassword"
										type={"password"}
										placeholder="Nhập lại mật khẩu"
										value={formData.confirmPassword}
										onChange={(e) =>
											setFormData({
												...formData,
												confirmPassword: e.target.value,
											})
										}
										required
										className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500/20 pr-12"
									/>
								</div>
							</div>

							<div className="flex items-start space-x-2">
								<input
									type="checkbox"
									id="terms"
									className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-1"
									required
								/>
								<Label
									htmlFor="terms"
									className="text-sm text-gray-600 leading-relaxed"
								>
									Tôi đồng ý với{" "}
									<Link
										href="/terms"
										className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
									>
										Điều khoản sử dụng
									</Link>{" "}
									và{" "}
									<Link
										href="/privacy"
										className="text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
									>
										Chính sách bảo mật
									</Link>
								</Label>
							</div>

							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Tạo tài khoản
							</Button>
						</form>

						<div className="text-center mt-6">
							<p className="text-sm text-gray-600">
								Đã có tài khoản?{" "}
								<Link
									href="/login"
									className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
								>
									Đăng nhập ngay
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
