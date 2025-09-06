"use client";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Brain,
	TrendingUp,
	ArrowRight,
	Gamepad2,
	Trophy,
	Users,
	Sparkles,
	Play,
	Star,
	ChevronRight,
	Award,
	Zap,
	Shield,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("fade-in-up");
					}
				});
			},
			{ threshold: 0.1 }
		);

		const elements = document.querySelectorAll(".animate-on-scroll");
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return (
		<div className="min-h-screen bg-cyan-100">
			{/* Hero Section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl floating" />
					<div
						className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl floating"
						style={{ animationDelay: "1s" }}
					/>
					<div
						className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-full blur-2xl floating"
						style={{ animationDelay: "2s" }}
					/>
				</div>

				<div className="relative z-10 container mx-auto px-4 py-20">
					<div
						className={`text-center mb-20 ${
							isVisible ? "fade-in-up" : ""
						}`}
					>
						<div className="flex justify-center mb-8">
							<div className="relative">
								<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur-lg opacity-75 pulse-glow" />
								<div className="relative bg-gradient-to-r from-indigo-500 to-cyan-500 p-6 rounded-3xl">
									<Brain className="h-16 w-16 text-white" />
								</div>
							</div>
						</div>

						<h1
							className={`text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-6 text-balance ${
								isVisible ? "scale-in stagger-1" : ""
							}`}
						>
							Optimind
						</h1>

						<p
							className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto text-balance ${
								isVisible ? "fade-in-up stagger-2" : ""
							}`}
						>
							Hệ thống học tập thông minh với gamification, theo
							dõi tiến độ và cộng đồng học tập - nơi mỗi giờ học
							đều được thưởng và mỗi mục tiêu đều có thể đạt được
						</p>

						<div
							className={`flex flex-col sm:flex-row gap-4 justify-center ${
								isVisible ? "fade-in-up stagger-3" : ""
							}`}
						>
							<Link href="/login">
								<Button
									size="lg"
									className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Bắt đầu hành trình
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
							</Link>
							<Link href="/register">
								<Button
									variant="outline"
									size="lg"
									className="px-8 py-4 text-lg bg-card/80 backdrop-blur-sm border-2 hover:bg-card"
								>
									Tạo tài khoản miễn phí
								</Button>
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
						<Card
							className={`bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll`}
						>
							<CardHeader className="text-center pb-4">
								<div className="mx-auto mb-4 p-3 bg-gradient-to-r from-primary to-accent rounded-2xl w-fit">
									<Brain className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-xl font-bold">
									Theo dõi tập trung
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									AI phân tích mức độ tập trung qua camera và
									cảm biến, giúp tối ưu hiệu suất học tập
								</CardDescription>
							</CardContent>
						</Card>

						<Card
							className={`bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll`}
						>
							<CardHeader className="text-center pb-4">
								<div className="mx-auto mb-4 p-3 bg-gradient-to-r from-secondary to-primary rounded-2xl w-fit">
									<Gamepad2 className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-xl font-bold">
									Gamification
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Kiếm điểm, mở khóa thành tựu, chơi game thư
									giãn và thi đua với bạn bè
								</CardDescription>
							</CardContent>
						</Card>

						<Card
							className={`bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll`}
						>
							<CardHeader className="text-center pb-4">
								<div className="mx-auto mb-4 p-3 bg-gradient-to-r from-accent to-secondary rounded-2xl w-fit">
									<Trophy className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-xl font-bold">
									Bảng xếp hạng
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Thi đua lành mạnh với bạn bè và cộng đồng
									qua bảng xếp hạng thời gian thực
								</CardDescription>
							</CardContent>
						</Card>

						<Card
							className={`bg-card/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-on-scroll`}
						>
							<CardHeader className="text-center pb-4">
								<div className="mx-auto mb-4 p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl w-fit">
									<TrendingUp className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-xl font-bold">
									Phân tích thông minh
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-center">
									Báo cáo chi tiết về xu hướng học tập và đề
									xuất cải thiện cá nhân hóa
								</CardDescription>
							</CardContent>
						</Card>
					</div>

					<div className="mb-20">
						<div className="text-center mb-12 animate-on-scroll">
							<h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
								Học tập như chơi game
							</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
								Mỗi phút học đều có giá trị, mỗi mục tiêu đều
								được thưởng
							</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-on-scroll">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
											<Sparkles className="h-6 w-6 text-white" />
										</div>
										<CardTitle>
											Hệ thống điểm thưởng
										</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Kiếm điểm từ mỗi giờ học, hoàn thành
										nhiệm vụ và đạt mục tiêu
									</p>
									<div className="flex items-center gap-2 text-sm">
										<Star className="h-4 w-4 text-yellow-500" />
										<span>1 giờ học = 100 điểm</span>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20 animate-on-scroll">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-gradient-to-r from-secondary to-primary rounded-lg">
											<Award className="h-6 w-6 text-white" />
										</div>
										<CardTitle>
											Thành tựu & Huy hiệu
										</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Mở khóa huy hiệu đặc biệt khi đạt các
										cột mốc quan trọng
									</p>
									<div className="flex items-center gap-2 text-sm">
										<Trophy className="h-4 w-4 text-orange-500" />
										<span>50+ huy hiệu độc đáo</span>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20 animate-on-scroll">
								<CardHeader>
									<div className="flex items-center gap-3">
										<div className="p-2 bg-gradient-to-r from-accent to-secondary rounded-lg">
											<Play className="h-6 w-6 text-white" />
										</div>
										<CardTitle>Game thư giãn</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										Nghỉ ngơi hiệu quả với các mini-game
										được thiết kế khoa học
									</p>
									<div className="flex items-center gap-2 text-sm">
										<Gamepad2 className="h-4 w-4 text-blue-500" />
										<span>5+ game thư giãn</span>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
						<div className="text-center animate-on-scroll">
							<div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
								15K+
							</div>
							<div className="text-muted-foreground">
								Học sinh tích cực
							</div>
						</div>
						<div className="text-center animate-on-scroll">
							<div className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">
								98%
							</div>
							<div className="text-muted-foreground">
								Cải thiện tập trung
							</div>
						</div>
						<div className="text-center animate-on-scroll">
							<div className="text-4xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-2">
								100M+
							</div>
							<div className="text-muted-foreground">
								Giờ học được theo dõi
							</div>
						</div>
						<div className="text-center animate-on-scroll">
							<div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
								4.9★
							</div>
							<div className="text-muted-foreground">
								Đánh giá từ người dùng
							</div>
						</div>
					</div>

					<div className="mb-20">
						<div className="text-center mb-12 animate-on-scroll">
							<h2 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-4">
								Người dùng nói gì về chúng tôi
							</h2>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<Card className="bg-card/80 backdrop-blur-sm animate-on-scroll">
								<CardContent className="p-6">
									<div className="flex items-center gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="h-4 w-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
									<p className="text-muted-foreground mb-4">
										"Optimind đã thay đổi cách tôi học. Hệ
										thống điểm thưởng khiến việc học trở nên
										thú vị và tôi đã cải thiện được 40% thời
										gian tập trung."
									</p>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
											M
										</div>
										<div>
											<p className="font-semibold">
												Minh Anh
											</p>
											<p className="text-sm text-muted-foreground">
												Sinh viên ĐH Bách Khoa
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-card/80 backdrop-blur-sm animate-on-scroll">
								<CardContent className="p-6">
									<div className="flex items-center gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="h-4 w-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
									<p className="text-muted-foreground mb-4">
										"Tính năng bảng xếp hạng tạo động lực
										học tập cực kỳ hiệu quả. Tôi và bạn bè
										luôn cố gắng để dẫn đầu bảng xếp hạng
										tuần."
									</p>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold">
											T
										</div>
										<div>
											<p className="font-semibold">
												Thanh Hương
											</p>
											<p className="text-sm text-muted-foreground">
												Học sinh THPT
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card className="bg-card/80 backdrop-blur-sm animate-on-scroll">
								<CardContent className="p-6">
									<div className="flex items-center gap-1 mb-4">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className="h-4 w-4 fill-yellow-400 text-yellow-400"
											/>
										))}
									</div>
									<p className="text-muted-foreground mb-4">
										"Game thư giãn giúp tôi nghỉ ngơi hiệu
										quả giữa các phiên học. Báo cáo phân
										tích cũng rất chi tiết và hữu ích."
									</p>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center text-white font-bold">
											D
										</div>
										<div>
											<p className="font-semibold">
												Đức Minh
											</p>
											<p className="text-sm text-muted-foreground">
												Nhân viên văn phòng
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<div className="text-center animate-on-scroll">
						<Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20 max-w-4xl mx-auto">
							<CardContent className="p-12">
								<div className="flex justify-center mb-6">
									<div className="p-4 bg-gradient-to-r from-primary to-accent rounded-full">
										<Zap className="h-12 w-12 text-white" />
									</div>
								</div>
								<h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
									Sẵn sàng bắt đầu hành trình học tập thông
									minh?
								</h2>
								<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
									Tham gia cộng đồng 15,000+ học sinh và
									chuyên gia đang sử dụng Optimind để đạt được
									mục tiêu học tập của họ
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link href="/register">
										<Button
											size="lg"
											className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
										>
											Đăng ký miễn phí ngay
											<ChevronRight className="ml-2 h-5 w-5" />
										</Button>
									</Link>
									<Link href="/login">
										<Button
											variant="outline"
											size="lg"
											className="px-8 py-4 text-lg bg-card/80 backdrop-blur-sm border-2"
										>
											Đã có tài khoản? Đăng nhập
										</Button>
									</Link>
								</div>
								<div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<Shield className="h-4 w-4" />
										<span>Miễn phí 100%</span>
									</div>
									<div className="flex items-center gap-1">
										<Users className="h-4 w-4" />
										<span>Cộng đồng hỗ trợ</span>
									</div>
									<div className="flex items-center gap-1">
										<Zap className="h-4 w-4" />
										<span>Kích hoạt ngay lập tức</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
