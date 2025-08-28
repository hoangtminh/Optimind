"use client";

import Link from "next/link";
import LoginDecorative from "@/components/login/login-decorative";
import LoginForm from "../../../../components/login/login-form";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex">
			{/* Left decorative side */}
			<LoginDecorative />

			{/* Right form side */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
				<div className="w-full max-w-md">
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-bold text-indigo-600 mb-2">
								Chào mừng trở lại
							</h2>
							<p className="text-gray-600">
								Đăng nhập để tiếp tục học tập
							</p>
						</div>

						<LoginForm />

						<div className="text-center mt-6">
							<p className="text-sm text-gray-600">
								Chưa có tài khoản?{" "}
								<Link
									href="/auth/register"
									className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
								>
									Đăng ký ngay
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
