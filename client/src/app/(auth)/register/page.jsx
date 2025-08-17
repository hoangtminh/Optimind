"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	BookOpen,
	Eye,
	EyeOff,
	Sparkles,
	GraduationCap,
	User,
	Mail,
	Lock,
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
		// Handle register logic here
		console.log("Register attempt:", formData);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 relative overflow-hidden">
			{/* Background decorations */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-green-400/10 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
					<CardHeader className="text-center pb-8">
						<div className="flex justify-center mb-6">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur-lg opacity-75" />
								<div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-2xl">
									<BookOpen className="h-12 w-12 text-white" />
								</div>
							</div>
						</div>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
							Tạo tài khoản
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 mt-2">
							Bắt đầu hành trình học tập của bạn
						</CardDescription>
						<div className="flex items-center justify-center gap-2 mt-4">
							<Sparkles className="h-4 w-4 text-yellow-500" />
							<span className="text-sm text-gray-500">
								Miễn phí và dễ sử dụng
							</span>
							<GraduationCap className="h-4 w-4 text-green-500" />
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
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
									className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white/50"
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
									className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white/50"
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
										className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white/50 pr-12"
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
										className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500/20 bg-white/50 pr-12"
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
									className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1"
									required
								/>
								<Label
									htmlFor="terms"
									className="text-sm text-gray-600 leading-relaxed"
								>
									Tôi đồng ý với{" "}
									<Link
										href="/terms"
										className="text-green-600 hover:text-green-700 hover:underline font-medium"
									>
										Điều khoản sử dụng
									</Link>{" "}
									và{" "}
									<Link
										href="/privacy"
										className="text-green-600 hover:text-green-700 hover:underline font-medium"
									>
										Chính sách bảo mật
									</Link>
								</Label>
							</div>

							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Tạo tài khoản
							</Button>
						</form>

						<div className="relative">
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
							className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-all duration-300"
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

						<div className="text-center">
							<p className="text-sm text-gray-600">
								Đã có tài khoản?{" "}
								<Link
									href="/login"
									className="text-green-600 hover:text-green-700 font-medium hover:underline"
								>
									Đăng nhập ngay
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
