"use client";

import Link from "next/link";
import RegisterDecoration from "@/components/register/register-decoration";
import RegisterForm from "@/components/register/register-form";

export default function RegisterPage() {
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

						<RegisterForm />

						<div className="text-center mt-6">
							<p className="text-sm text-gray-600">
								Đã có tài khoản?{" "}
								<Link
									href="/auth/login"
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
