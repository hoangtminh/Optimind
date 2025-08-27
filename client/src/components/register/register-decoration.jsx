import { BookOpen, Brain, Shield, Users } from "lucide-react";
import React from "react";

const RegisterDecoration = () => {
	return (
		<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
			{/* Content */}
			<div className="w-full z-10 flex flex-col justify-center items-center text-white p-12 text-center">
				{/* Logo */}
				<div className="relative mb-6">
					<div className="absolute bg-white/20 rounded-3xl blur-lg" />
					<div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-3xl border border-white/20">
						<Brain className="h-12 w-12 text-white" />
					</div>
				</div>

				{/* System name */}
				<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
					Optimind
				</h1>
				<p className="text-xl text-white/80 mb-6 max-w-md">
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
	);
};

export default RegisterDecoration;
