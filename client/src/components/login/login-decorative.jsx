import React from "react";
import { Brain, Target, TrendingUp, Zap } from "lucide-react";

const LoginDecorative = () => {
	return (
		<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 relative overflow-hidden">
			{/* Content */}
			<div className="z-10 w-full flex flex-col justify-center items-center text-white text-center">
				{/* Logo */}
				<div className="relative mb-6">
					<div className="absolute bg-white/20 rounded-3xl blur-lg" />
					<div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-3xl border border-white/20">
						<Brain className="h-12 w-12 text-white" />
					</div>
				</div>

				{/* System name */}
				<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
					EduFocus AI
				</h1>
				<p className="text-xl text-white/80 mb-8 max-w-md">
					Nền tảng học tập thông minh giúp bạn đạt được tiềm năng tối
					đa
				</p>

				{/* 3 advantages for login */}
				<div className="space-y-6 max-w-sm">
					<div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
						<div className="bg-white/20 p-2 rounded-lg">
							<Target className="h-6 w-6 text-white" />
						</div>
						<div className="text-left">
							<h3 className="font-semibold text-white">
								Theo dõi tiến độ
							</h3>
							<p className="text-sm text-white/70">
								Quản lý mục tiêu học tập hiệu quả
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
						<div className="bg-white/20 p-2 rounded-lg">
							<Zap className="h-6 w-6 text-white" />
						</div>
						<div className="text-left">
							<h3 className="font-semibold text-white">
								Tăng tập trung
							</h3>
							<p className="text-sm text-white/70">
								Cải thiện khả năng tập trung học tập
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
						<div className="bg-white/20 p-2 rounded-lg">
							<TrendingUp className="h-6 w-6 text-white" />
						</div>
						<div className="text-left">
							<h3 className="font-semibold text-white">
								Phân tích thông minh
							</h3>
							<p className="text-sm text-white/70">
								Báo cáo chi tiết về hiệu suất
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginDecorative;
