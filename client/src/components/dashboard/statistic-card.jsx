import {
	BookOpen,
	Calendar,
	Clock,
	TrendingDown,
	TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";

export function StatisticCards() {
	const todayStats = {
		studyTime: 4.5,
		goal: 6,
		sessions: 3,
		subjects: ["Toán", "Lý", "Hóa"],
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
					<CardTitle className="text-2xl font-bold text-blue-800">
						Hôm nay
					</CardTitle>
					<Clock className="h-6 w-6 text-blue-600" />
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-blue-900">
						{todayStats.studyTime}h
					</div>
					<div className="text-lg text-blue-700">
						Mục tiêu: {todayStats.goal}h
					</div>
					<Progress
						value={(todayStats.studyTime / todayStats.goal) * 100}
						className="mt-2 h-2"
					/>
				</CardContent>
			</Card>

			{/* Average Stat */}
			<Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-2xl font-bold text-green-800">
						Trung bình
					</CardTitle>
					<TrendingUp className="h-6 w-6 text-green-600" />
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-green-900">
						{averageStats.daily}h / ngày
					</div>
					<p className="text-lg text-green-700 flex items-center gap-1">
						<span className="text-green-600">
							+{averageStats.lastWeekComparison}h
						</span>
						so với tuần trước
					</p>
				</CardContent>
			</Card>

			{/* Weekly Stat */}
			<Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-2xl font-bold text-purple-800">
						Tuần này
					</CardTitle>
					<Calendar className="h-6 w-6 text-purple-600" />
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-purple-900">
						{weeklyProgress}%
					</div>
					<p className="text-lg text-purple-700">
						Hoàn thành mục tiêu
					</p>
					<Progress value={weeklyProgress} className="mt-2 h-2" />
				</CardContent>
			</Card>

			{/* Study Stat */}
			<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-2xl font-bold text-orange-800">
						Phiên học
					</CardTitle>
					<BookOpen className="h-6 w-6 text-orange-600" />
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-orange-900">
						{todayStats.sessions}
					</div>
					<p className="text-lg text-orange-700">Phiên học hôm nay</p>
				</CardContent>
			</Card>
		</div>
	);
}
