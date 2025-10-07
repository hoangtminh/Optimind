import React from "react";
import { Card, CardContent } from "../ui/card";
import { Star } from "lucide-react";

const Feedback = () => {
	return (
		<section
			id="pricing"
			className="py-10 bg-gradient-to-b from-blue-50/50 to-white"
		>
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
						Excellent Feedback
					</h2>
					<p className="text-xl text-blue-700 max-w-3xl mx-auto">
						Select the perfect plan to accelerate your learning
						journey with cutting-edge AI technology.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 animate-on-scroll hover:shadow-xl transition-all duration-300 group">
						<CardContent className="p-6 bg-white/60 rounded-lg m-4">
							<div className="flex items-center gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-blue-700 mb-4">
								"Optimind đã thay đổi cách tôi học. Hệ thống
								điểm thưởng khiến việc học trở nên thú vị và tôi
								đã cải thiện được 40% thời gian tập trung."
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
									M
								</div>
								<div>
									<p className="font-semibold text-blue-800">
										Minh Anh
									</p>
									<p className="text-sm text-blue-600">
										Sinh viên ĐH Bách Khoa
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 animate-on-scroll hover:shadow-xl transition-all duration-300 group">
						<CardContent className="p-6 bg-white/60 rounded-lg m-4">
							<div className="flex items-center gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-purple-700 mb-4">
								"Tính năng bảng xếp hạng tạo động lực học tập
								cực kỳ hiệu quả. Tôi và bạn bè luôn cố gắng để
								dẫn đầu bảng xếp hạng tuần."
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
									T
								</div>
								<div>
									<p className="font-semibold text-purple-800">
										Thanh Hương
									</p>
									<p className="text-sm text-purple-600">
										Học sinh THPT
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 animate-on-scroll hover:shadow-xl transition-all duration-300 group">
						<CardContent className="p-6 bg-white/60 rounded-lg m-4">
							<div className="flex items-center gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-green-700 mb-4">
								"Game thư giãn giúp tôi nghỉ ngơi hiệu quả giữa
								các phiên học. Báo cáo phân tích cũng rất chi
								tiết và hữu ích."
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
									D
								</div>
								<div>
									<p className="font-semibold text-green-800">
										Đức Minh
									</p>
									<p className="text-sm text-green-600">
										Nhân viên văn phòng
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default Feedback;
