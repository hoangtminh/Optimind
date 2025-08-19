import {
	BookOpen,
	Calendar,
	Clock,
	TrendingDown,
	TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "../ui/progress";

export function StatisticCards() {
	const todayStats = {
		studyTime: 4.5,
		goal: 6,
		sessions: 3,
		subjects: ["Toán", "Lý", "Hóa"],
	};

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

	const weeklyProgress = 75;

	const averageStats = {
		daily: 5.3,
		weekly: 37.2,
		monthly: 158.4,
		lastWeekComparison: +0.8,
		lastMonthComparison: +12.3,
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{/* Daily Stat */}
			<Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-xl font-bold text-blue-800">
						Hôm nay
					</CardTitle>
					<Clock className="h-6 w-6 text-blue-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-blue-900">
						{todayStats.studyTime}h
					</div>
					<div className="text-lg text-blue-700">
						Mục tiêu: {todayStats.goal}h
					</div>
					<Progress
						className="mt-2 h-3 bg-blue-300"
						indicatorColor="bg-blue-500"
						value={(todayStats.studyTime / todayStats.goal) * 100}
					/>
				</CardContent>
			</Card>

			{/* Average Stat */}
			<Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-xl font-bold text-green-800">
						Trung bình
					</CardTitle>
					<TrendingUp className="h-6 w-6 text-green-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-green-900">
						{averageStats.daily}h / ngày
					</div>
					<p className="text-lg text-green-700 flex items-center gap-1">
						<span
							className={
								averageStats.lastWeekComparison > 0
									? "text-green-600"
									: "text-red-600"
							}
						>
							{averageStats.lastWeekComparison > 0 ? "+" : ""}
							{averageStats.lastWeekComparison}h
						</span>
						so với tuần trước
					</p>
					<Progress
						className="mt-2 h-3 bg-green-300"
						indicatorColor={"bg-green-500"}
						value={
							(todayStats.studyTime / averageStats.daily) * 100
						}
					/>
				</CardContent>
			</Card>

			{/* Weekly Stat */}
			<Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-xl font-bold text-purple-800">
						Tuần này
					</CardTitle>
					<Calendar className="h-6 w-6 text-purple-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-purple-900">
						{weeklyProgress}%
					</div>
					<p className="text-lg text-purple-700">
						Hoàn thành mục tiêu
					</p>
					<Progress
						indicatorColor={"bg-purple-500"}
						value={weeklyProgress}
						className="mt-2 h-3 bg-purple-300"
					/>
				</CardContent>
			</Card>

			{/* Study Stat */}
			<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-xl font-bold text-orange-800">
						Phiên học
					</CardTitle>
					<BookOpen className="h-6 w-6 text-orange-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-orange-900">
						{todayStats.sessions}
					</div>
					<p className="text-lg text-orange-700">
						Phiên học hoàn thành
					</p>
					<Progress
						indicatorColor={"bg-orange-500"}
						value={75}
						className="mt-2 h-3 bg-orange-300"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
