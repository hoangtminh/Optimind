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
	Clock,
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		// Handle login logic here
		console.log("Login attempt:", { email, password });
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
			{/* Background decorations */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
					<CardHeader className="text-center pb-8">
						<div className="flex justify-center mb-6">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-75" />
								<div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
									<BookOpen className="h-12 w-12 text-white" />
								</div>
							</div>
						</div>
						<CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
							Study Tracker
						</CardTitle>
						<CardDescription className="text-lg text-gray-600 mt-2">
							Đăng nhập để bắt đầu hành trình học tập
						</CardDescription>
						<div className="flex items-center justify-center gap-2 mt-4">
							<Sparkles className="h-4 w-4 text-yellow-500" />
							<span className="text-sm text-gray-500">
								Theo dõi tiến độ một cách thông minh
							</span>
							<GraduationCap className="h-4 w-4 text-blue-500" />
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<form onSubmit={handleLogin} className="space-y-6">
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-gray-700 font-medium"
								>
									Email
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="your@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50"
								/>
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-gray-700 font-medium"
								>
									Mật khẩu
								</Label>
								<div className="relative">
									<Input
										id="password"
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Nhập mật khẩu"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
										className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50 pr-12"
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

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="remember"
										className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<Label
										htmlFor="remember"
										className="text-sm text-gray-600"
									>
										Ghi nhớ đăng nhập
									</Label>
								</div>
								<Link
									href="/forgot-password"
									className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
								>
									Quên mật khẩu?
								</Link>
							</div>

							<Button
								type="submit"
								className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Đăng nhập
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
							Đăng nhập với Google
						</Button>

						<div className="text-center">
							<p className="text-sm text-gray-600">
								Chưa có tài khoản?{" "}
								<Link
									href="/register"
									className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
								>
									Đăng ký ngay
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Features showcase */}
				<div className="mt-8 grid grid-cols-3 gap-4 text-center">
					<div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-lg">
						<Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
						<p className="text-xs text-gray-600 font-medium">
							Theo dõi thời gian
						</p>
					</div>
					<div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-lg">
						<GraduationCap className="h-6 w-6 text-purple-500 mx-auto mb-2" />
						<p className="text-xs text-gray-600 font-medium">
							Quản lý mục tiêu
						</p>
					</div>
					<div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-lg">
						<Sparkles className="h-6 w-6 text-pink-500 mx-auto mb-2" />
						<p className="text-xs text-gray-600 font-medium">
							Thành tích
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
