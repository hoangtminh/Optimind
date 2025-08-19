"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Clock,
	Target,
	TrendingUp,
	Award,
	BarChart3,
	PieChart,
	Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatisticCards } from "@/components/dashboard/statistic-card";
import AverageCards from "@/components/dashboard/average-card";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function Dashboard() {
	const [timePeriod, setTimePeriod] = useState("week"); // 'week' or 'month'
	const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week, -1 = last week, etc.
	const [selectedMonth, setSelectedMonth] = useState(0); // 0 = current month, -1 = last month, etc.
	const todayStats = {
		studyTime: 4.5,
		goal: 6,
		sessions: 3,
		subjects: ["Toán", "Lý", "Hóa"],
	};

	const subjectData = [
		{ subject: "Toán", hours: 8.5, color: "bg-blue-500" },
		{ subject: "Lý", hours: 6.2, color: "bg-green-500" },
		{ subject: "Hóa", hours: 5.8, color: "bg-purple-500" },
		{ subject: "Sinh", hours: 4.3, color: "bg-orange-500" },
		{ subject: "Anh", hours: 3.7, color: "bg-pink-500" },
		{ subject: "Văn", hours: 1.8, color: "bg-indigo-500" },
	];

	const maxSubjectHours = Math.max(...subjectData.map((s) => s.hours));
	const subjectDataWithPercentage = subjectData.map((subject) => ({
		...subject,
		percentage: Math.round((subject.hours / maxSubjectHours) * 100),
	}));

	const getAverageStats = () => {
		if (timePeriod === "week") {
			const weekData = [
				{
					daily: 5.3,
					weekly: 37.2,
					monthly: 158.4,
					lastComparison: +0.8,
					monthComparison: +12.3,
				},
				{
					daily: 4.5,
					weekly: 31.5,
					monthly: 142.1,
					lastComparison: -0.8,
					monthComparison: +8.7,
				},
				{
					daily: 6.1,
					weekly: 42.7,
					monthly: 171.2,
					lastComparison: +1.6,
					monthComparison: +15.9,
				},
			];
			return weekData[Math.abs(selectedWeek)] || weekData[0];
		} else {
			const monthData = [
				{
					daily: 5.3,
					weekly: 37.2,
					monthly: 158.4,
					lastComparison: +12.3,
					weekComparison: +2.1,
				},
				{
					daily: 4.8,
					weekly: 33.6,
					monthly: 146.1,
					lastComparison: -12.3,
					weekComparison: -3.6,
				},
				{
					daily: 5.9,
					weekly: 41.3,
					monthly: 177.8,
					lastComparison: +31.7,
					weekComparison: +7.7,
				},
			];
			return monthData[Math.abs(selectedMonth)] || monthData[0];
		}
	};

	const averageStats = getAverageStats();

	const upcomingGoals = [
		{
			title: "Hoàn thành 45h học tuần này",
			progress: 75,
			deadline: "2 ngày",
			type: "weekly",
		},
		{
			title: "Ôn tập Toán cho kiểm tra",
			progress: 60,
			deadline: "5 ngày",
			type: "exam",
		},
		{
			title: "Đạt 180h học trong tháng",
			progress: 40,
			deadline: "15 ngày",
			type: "monthly",
		},
	];

	const upcomingSchedule = [
		{
			subject: "Toán",
			time: "14:00 - 16:00",
			date: "Hôm nay",
			type: "study",
		},
		{
			subject: "Lý",
			time: "19:00 - 20:30",
			date: "Hôm nay",
			type: "review",
		},
		{ subject: "Hóa", time: "08:00 - 10:00", date: "Mai", type: "study" },
		{
			subject: "Kiểm tra Toán",
			time: "07:30 - 09:00",
			date: "T6",
			type: "exam",
		},
	];

	const weeklyData = [
		{ day: "T2", hours: 5.5, goal: 6 },
		{ day: "T3", hours: 6.2, goal: 6 },
		{ day: "T4", hours: 4.8, goal: 6 },
		{ day: "T5", hours: 7.1, goal: 6 },
		{ day: "T6", hours: 5.9, goal: 6 },
		{ day: "T7", hours: 3.2, goal: 6 },
		{ day: "CN", hours: 4.5, goal: 6 },
	];

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
			<AverageCards
				timePeriod={timePeriod}
				setTimePeriod={setTimePeriod}
				selectedWeek={selectedWeek}
				setSelectedWeek={selectedWeek}
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Upcoming Goals */}
				<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-cyan-800">
							<Target className="h-5 w-5" />
							Mục tiêu sắp tới
						</CardTitle>
						<CardDescription className="text-cyan-600">
							Theo dõi tiến độ các mục tiêu đã đặt
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{upcomingGoals.map((goal, index) => (
							<div
								key={index}
								className="p-3 bg-white/60 rounded-lg border border-cyan-200"
							>
								<div className="flex justify-between items-start mb-2">
									<h4 className="font-medium text-cyan-800 text-sm">
										{goal.title}
									</h4>
									<Badge
										variant="outline"
										className="text-xs border-cyan-300 text-cyan-700"
									>
										{goal.deadline}
									</Badge>
								</div>
								<div className="space-y-2">
									<div className="flex justify-between text-xs text-cyan-600">
										<span>Tiến độ</span>
										<span>{goal.progress}%</span>
									</div>
									<Progress
										value={goal.progress}
										className="h-2"
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Upcoming Schedule */}
				<Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-teal-800">
							<Calendar className="h-5 w-5" />
							Lịch học sắp tới
						</CardTitle>
						<CardDescription className="text-teal-600">
							Các buổi học và kiểm tra trong tuần
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{upcomingSchedule.map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-teal-200"
							>
								<div className="flex items-center gap-3">
									<div
										className={`w-3 h-3 rounded-full ${
											item.type === "exam"
												? "bg-red-500"
												: item.type === "review"
												? "bg-orange-500"
												: "bg-teal-500"
										}`}
									/>
									<div>
										<p className="font-medium text-teal-800 text-sm">
											{item.subject}
										</p>
										<p className="text-xs text-teal-600">
											{item.time}
										</p>
									</div>
								</div>
								<Badge
									variant="secondary"
									className="bg-teal-100 text-teal-800 text-xs"
								>
									{item.date}
								</Badge>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Subject Distribution Chart */}
				<Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-rose-800">
							<PieChart className="h-5 w-5" />
							Phân bố thời gian theo môn học
						</CardTitle>
						<CardDescription className="text-rose-600">
							Tỷ lệ thời gian học các môn
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{subjectDataWithPercentage.map((subject, index) => (
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
									{subjectDataWithPercentage.reduce(
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
							<Link
								className="flex flex-row gap-1 items-center"
								href="/study"
							>
								<Clock className="mr-2 h-4 w-4" />
								Bắt đầu học
							</Link>
						</Button>
						<Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
							<Link
								className="flex flex-row gap-1 items-center"
								href="/goals"
							>
								<Target className="mr-2 h-4 w-4" />
								Đặt mục tiêu mới
							</Link>
						</Button>
						<Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
							<Link
								className="flex flex-row gap-1 items-center"
								href="/progress"
							>
								<TrendingUp className="mr-2 h-4 w-4" />
								Xem tiến độ
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
