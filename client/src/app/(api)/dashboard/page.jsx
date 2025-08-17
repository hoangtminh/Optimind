"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	Target,
	TrendingUp,
	Calendar,
	BookOpen,
	Award,
	BarChart3,
	PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatisticCards } from "@/components/dashboard/statistic-card";

export default function Dashboard() {
	const todayStats = {
		studyTime: 4.5,
		goal: 6,
		sessions: 3,
		subjects: ["Toán", "Lý", "Hóa"],
	};

	const weeklyProgress = 75;
	const monthlyProgress = 60;

	// Data for charts
	const weeklyData = [
		{ day: "T2", hours: 5.5, goal: 6 },
		{ day: "T3", hours: 6.2, goal: 6 },
		{ day: "T4", hours: 4.8, goal: 6 },
		{ day: "T5", hours: 7.1, goal: 6 },
		{ day: "T6", hours: 5.9, goal: 6 },
		{ day: "T7", hours: 3.2, goal: 6 },
		{ day: "CN", hours: 4.5, goal: 6 },
	];

	const subjectData = [
		{ subject: "Toán", hours: 8.5, color: "bg-blue-500", percentage: 28 },
		{ subject: "Lý", hours: 6.2, color: "bg-green-500", percentage: 21 },
		{ subject: "Hóa", hours: 5.8, color: "bg-purple-500", percentage: 19 },
		{ subject: "Sinh", hours: 4.3, color: "bg-orange-500", percentage: 14 },
		{ subject: "Anh", hours: 3.7, color: "bg-pink-500", percentage: 12 },
		{ subject: "Văn", hours: 1.8, color: "bg-indigo-500", percentage: 6 },
	];

	const averageStats = {
		daily: 5.3,
		weekly: 37.2,
		monthly: 158.4,
		lastWeekComparison: +0.8,
		lastMonthComparison: +12.3,
	};

	const maxHours = Math.max(
		...weeklyData.map((d) => Math.max(d.hours, d.goal))
	);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Dashboard
				</h1>
				<p className="text-muted-foreground">
					Tổng quan về quá trình học tập của bạn
				</p>
			</div>

			{/* Stats Cards */}
			<StatisticCards />

			{/* Average Study Time Stats */}
			<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-indigo-800">
						<BarChart3 className="h-5 w-5" />
						Thống kê thời gian học trung bình
					</CardTitle>
					<CardDescription className="text-indigo-600">
						Phân tích xu hướng học tập của bạn qua các khoảng thời
						gian
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6 md:grid-cols-3">
						<div className="text-center p-4 bg-white/60 rounded-lg border border-indigo-200">
							<div className="text-3xl font-bold text-indigo-900 mb-1">
								{averageStats.daily}h
							</div>
							<div className="text-sm font-medium text-indigo-700 mb-2">
								Trung bình/ngày
							</div>
							<div className="text-xs text-indigo-600 flex items-center justify-center gap-1">
								<TrendingUp className="h-3 w-3" />+
								{averageStats.lastWeekComparison}h tuần trước
							</div>
						</div>

						<div className="text-center p-4 bg-white/60 rounded-lg border border-indigo-200">
							<div className="text-3xl font-bold text-indigo-900 mb-1">
								{averageStats.weekly}h
							</div>
							<div className="text-sm font-medium text-indigo-700 mb-2">
								Trung bình/tuần
							</div>
							<div className="text-xs text-indigo-600">
								Mục tiêu: 42h/tuần
							</div>
						</div>

						<div className="text-center p-4 bg-white/60 rounded-lg border border-indigo-200">
							<div className="text-3xl font-bold text-indigo-900 mb-1">
								{averageStats.monthly}h
							</div>
							<div className="text-sm font-medium text-indigo-700 mb-2">
								Trung bình/tháng
							</div>
							<div className="text-xs text-indigo-600 flex items-center justify-center gap-1">
								<TrendingUp className="h-3 w-3" />+
								{averageStats.lastMonthComparison}h tháng trước
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Weekly Study Chart */}
				<Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-gray-800">
							<BarChart3 className="h-5 w-5" />
							Biểu đồ học tập tuần này
						</CardTitle>
						<CardDescription className="text-gray-600">
							So sánh thời gian học thực tế với mục tiêu hàng ngày
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{weeklyData.map((day, index) => (
								<div key={index} className="space-y-2">
									<div className="flex justify-between text-sm font-medium">
										<span className="text-gray-700">
											{day.day}
										</span>
										<span className="text-gray-600">
											{day.hours}h / {day.goal}h
										</span>
									</div>
									<div className="relative">
										{/* Background bar for goal */}
										<div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
											{/* Actual hours bar */}
											<div
												className={`h-full rounded-full transition-all duration-500 ${
													day.hours >= day.goal
														? "bg-gradient-to-r from-green-400 to-green-500"
														: day.hours >=
														  day.goal * 0.8
														? "bg-gradient-to-r from-blue-400 to-blue-500"
														: "bg-gradient-to-r from-orange-400 to-orange-500"
												}`}
												style={{
													width: `${Math.min(
														(day.hours / maxHours) *
															100,
														100
													)}%`,
												}}
											/>
											{/* Goal line */}
											<div
												className="absolute top-0 w-0.5 h-full bg-red-500"
												style={{
													left: `${
														(day.goal / maxHours) *
														100
													}%`,
												}}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
								<span>Đạt mục tiêu</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded"></div>
								<span>Gần đạt (80%+)</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded"></div>
								<span>Chưa đạt</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-0.5 h-3 bg-red-500"></div>
								<span>Mục tiêu</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Subject Distribution Chart */}
				<Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-rose-800">
							<PieChart className="h-5 w-5" />
							Phân bố thời gian theo môn học
						</CardTitle>
						<CardDescription className="text-rose-600">
							Tổng thời gian học trong tuần qua
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{subjectData.map((subject, index) => (
								<div key={index} className="space-y-2">
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2">
											<div
												className={`w-3 h-3 rounded-full ${subject.color}`}
											></div>
											<span className="font-medium text-gray-700">
												{subject.subject}
											</span>
										</div>
										<div className="text-right">
											<span className="text-sm font-medium text-gray-900">
												{subject.hours}h
											</span>
											<span className="text-xs text-gray-500 ml-2">
												({subject.percentage}%)
											</span>
										</div>
									</div>
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div
											className={`h-2 rounded-full ${subject.color} transition-all duration-500`}
											style={{
												width: `${subject.percentage}%`,
											}}
										></div>
									</div>
								</div>
							))}
						</div>

						{/* Summary */}
						<div className="mt-6 p-4 bg-white/60 rounded-lg border border-rose-200">
							<div className="text-center">
								<div className="text-2xl font-bold text-rose-900">
									{subjectData.reduce(
										(sum, subject) => sum + subject.hours,
										0
									)}
									h
								</div>
								<div className="text-sm text-rose-700">
									Tổng thời gian học tuần
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Today's Activity */}
				<Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
					<CardHeader>
						<CardTitle className="text-emerald-800">
							Hoạt động hôm nay
						</CardTitle>
						<CardDescription className="text-emerald-600">
							Tổng quan về các môn học đã học
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{todayStats.subjects.map((subject, index) => (
							<div
								key={subject}
								className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-emerald-200"
							>
								<div className="flex items-center gap-3">
									<div className="w-3 h-3 bg-emerald-500 rounded-full" />
									<span className="font-medium text-emerald-800">
										{subject}
									</span>
								</div>
								<Badge
									variant="secondary"
									className="bg-emerald-100 text-emerald-800"
								>
									{(1.5 - index * 0.3).toFixed(1)}h
								</Badge>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Recent Achievements */}
				<Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
					<CardHeader>
						<CardTitle className="text-amber-800">
							Thành tích gần đây
						</CardTitle>
						<CardDescription className="text-amber-600">
							Những cột mốc bạn đã đạt được
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-amber-200">
							<Award className="h-8 w-8 text-yellow-500" />
							<div>
								<p className="font-medium text-amber-800">
									Học 7 ngày liên tiếp
								</p>
								<p className="text-sm text-amber-600">
									2 ngày trước
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-amber-200">
							<Target className="h-8 w-8 text-green-500" />
							<div>
								<p className="font-medium text-amber-800">
									Hoàn thành mục tiêu tuần
								</p>
								<p className="text-sm text-amber-600">
									1 tuần trước
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-amber-200">
							<Clock className="h-8 w-8 text-blue-500" />
							<div>
								<p className="font-medium text-amber-800">
									Học 50 giờ trong tháng
								</p>
								<p className="text-sm text-amber-600">
									2 tuần trước
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
				<CardHeader>
					<CardTitle className="text-violet-800">
						Hành động nhanh
					</CardTitle>
					<CardDescription className="text-violet-600">
						Các thao tác thường dùng
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4 flex-wrap">
						<Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
							<Clock className="mr-2 h-4 w-4" />
							Bắt đầu học
						</Button>
						<Button
							variant="outline"
							className="border-violet-300 text-violet-700 hover:bg-violet-50 bg-transparent"
						>
							<Target className="mr-2 h-4 w-4" />
							Đặt mục tiêu mới
						</Button>
						<Button
							variant="outline"
							className="border-violet-300 text-violet-700 hover:bg-violet-50 bg-transparent"
						>
							<TrendingUp className="mr-2 h-4 w-4" />
							Xem tiến độ
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
