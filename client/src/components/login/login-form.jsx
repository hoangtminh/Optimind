"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [remember, setRemember] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		setIsSubmitting(() => true);
		login(
			{
				email: formData.email.toLowerCase().trim(),
				password: formData.password.trim(),
			},
			remember
		);
		setIsSubmitting(() => false);
	};

	return (
		<form onSubmit={handleLogin} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="email" className="text-gray-700 font-medium">
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
					className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="password" className="text-gray-700 font-medium">
					Mật khẩu
				</Label>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Nhập mật khẩu"
						value={formData.password}
						onChange={(e) =>
							setFormData({
								...formData,
								password: e.target.value,
							})
						}
						required
						className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 pr-12"
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
						onClick={() => setShowPassword(!showPassword)}
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
						className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						value={remember}
						onClick={() => setRemember(!remember)}
					/>
					<Label htmlFor="remember" className="text-sm text-gray-600">
						Ghi nhớ đăng nhập
					</Label>
				</div>
				<Link
					href="/forgot-password"
					className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
				>
					Quên mật khẩu?
				</Link>
			</div>

			<Button
				type="submit"
				disabled={isSubmitting}
				className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
			>
				Đăng nhập
			</Button>
		</form>
	);
};

export default LoginForm;
