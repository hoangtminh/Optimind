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

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleRegister = (e) => {
		e.preventDefault();
		console.log("Register attempt:", formData);
	};

	return (
		<div className="min-h-screen flex">
			{/* Left decorative side */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
				{/* Animated blur objects */}
				<div className="absolute inset-0">
					<div className="absolute top-16 left-24 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse" />
					<div
						className="absolute top-32 right-28 w-20 h-20 bg-emerald-300/20 rounded-full blur-lg animate-bounce"
						style={{ animationDuration: "2.5s" }}
					/>
					<div
						className="absolute bottom-28 left-20 w-44 h-44 bg-teal-300/15 rounded-full blur-2xl animate-pulse"
						style={{ animationDelay: "1.5s" }}
					/>
					<div
						className="absolute bottom-16 right-16 w-32 h-32 bg-cyan-300/20 rounded-full blur-xl animate-bounce"
						style={{
							animationDuration: "3.5s",
							animationDelay: "1s",
						}}
					/>
					<div
						className="absolute top-1/3 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "0.8s" }}
					/>
				</div>

				{/* Content */}
				<div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
					{/* Logo */}
					<div className="mb-8">
						<div className="relative">
							<div className="absolute inset-0 bg-white/20 rounded-3xl blur-lg" />
							<div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
								<Brain className="h-16 w-16 text-white" />
							</div>
						</div>
					</div>

					{/* System name */}
					<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
						Optimind
					</h1>
					<p className="text-xl text-white/80 mb-12 max-w-md">
						Bắt đầu hành trình học tập thông minh cùng chúng tôi
					</p>

					{/* 3 advantages for register */}
					<div className="space-y-6 max-w-sm">
						<div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
							<div className="bg-white/20 p-2 rounded-lg">
								<BookOpen className="h-6 w-6 text-white" />
							</div>
							<div className="text-left">
								<h3 className="font-semibold text-white">
									Học tập cá nhân hóa
								</h3>
								<p className="text-sm text-white/70">
									Lộ trình học tập phù hợp với bạn
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
							<div className="bg-white/20 p-2 rounded-lg">
								<Users className="h-6 w-6 text-white" />
							</div>
							<div className="text-left">
								<h3 className="font-semibold text-white">
									Cộng đồng học tập
								</h3>
								<p className="text-sm text-white/70">
									Kết nối với người học khác
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
							<div className="bg-white/20 p-2 rounded-lg">
								<Shield className="h-6 w-6 text-white" />
							</div>
							<div className="text-left">
								<h3 className="font-semibold text-white">
									Hoàn toàn miễn phí
								</h3>
								<p className="text-sm text-white/70">
									Không phí ẩn, trải nghiệm đầy đủ
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right form side */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-bold text-gray-900 mb-2">
								Tạo tài khoản
							</h2>
							<p className="text-gray-600">
								Bắt đầu hành trình học tập của bạn
							</p>
						</div>

						<form onSubmit={handleRegister} className="space-y-6">
							<div className="space-y-2">
								<Label
									htmlFor="name"
									className="text-gray-700 font-medium flex items-center gap-2"
								>
									<User className="h-4 w-4" />
									Họ và tên
								</Label>
								<Input
									id="name"
									type="text"
									placeholder="Nguyễn Văn A"
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
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
										placeholder="Tối thiểu 8 ký tự"
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
										type={
											showConfirmPassword
												? "text"
												: "password"
										}
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
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
										onClick={() =>
											setShowConfirmPassword(
												!showConfirmPassword
											)
										}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-4 w-4 text-gray-500" />
										) : (
											<Eye className="h-4 w-4 text-gray-500" />
										)}
									</Button>
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

						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t border-gray-200" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-gray-500">
									Hoặc
								</span>
							</div>
						</div>

						<Button
							variant="outline"
							className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-all duration-300 bg-transparent"
						>
							<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Đăng ký với Google
						</Button>

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
