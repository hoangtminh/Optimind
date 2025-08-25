"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import {
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	AreaChart,
	Area,
} from "recharts";
import {
	ArrowLeft,
	Clock,
	Target,
	TrendingUp,
	Brain,
	BookOpen,
	CheckCircle2,
} from "lucide-react";

// Sample concentration data for the session
const concentrationData = [
	{ time: "00:00", concentration: 85, focus: 80 },
	{ time: "00:05", concentration: 88, focus: 85 },
	{ time: "00:10", concentration: 82, focus: 78 },
	{ time: "00:15", concentration: 90, focus: 88 },
	{ time: "00:20", concentration: 87, focus: 82 },
	{ time: "00:25", concentration: 85, focus: 80 },
	{ time: "00:30", concentration: 92, focus: 90 },
	{ time: "00:35", concentration: 89, focus: 85 },
	{ time: "00:40", concentration: 86, focus: 83 },
	{ time: "00:45", concentration: 91, focus: 88 },
	{ time: "00:50", concentration: 88, focus: 85 },
	{ time: "00:55", concentration: 85, focus: 82 },
	{ time: "01:00", concentration: 87, focus: 84 },
	{ time: "01:05", concentration: 90, focus: 87 },
	{ time: "01:10", concentration: 84, focus: 80 },
	{ time: "01:15", concentration: 89, focus: 86 },
	{ time: "01:20", concentration: 92, focus: 90 },
	{ time: "01:25", concentration: 88, focus: 84 },
	{ time: "01:30", concentration: 86, focus: 82 },
	{ time: "01:35", concentration: 91, focus: 88 },
	{ time: "01:40", concentration: 87, focus: 83 },
	{ time: "01:45", concentration: 89, focus: 86 },
	{ time: "01:50", concentration: 85, focus: 81 },
	{ time: "01:55", concentration: 88, focus: 85 },
	{ time: "02:00", concentration: 90, focus: 87 },
];

export default function SessionDetailPage({ params }) {
	const router = useRouter();
	const [sessionData, setSessionData] = useState(null);

	useEffect(() => {
		// Mock session data - in real app, fetch from API using params.id
		const mockSession = {
			id: params.id,
			date: "2024-01-15",
			subject: "Toán học",
			topics: "Đạo hàm, Tích phân",
			studyTime: 2.5,
			targetTime: 3.0,
			completionRate: 83,
			rateScore: 8.5,
			efficiency: "Cao",
			method: "Pomodoro",
			cycles: 3,
			breakTime: 0.5,
			totalFocusTime: 2.0,
			averageConcentration: 87.8,
			peakConcentration: 92,
			lowConcentration: 82,
			tasks: [
				{ id: 1, text: "Ôn tập công thức đạo hàm", completed: true },
				{ id: 2, text: "Làm bài tập tích phân", completed: true },
				{ id: 3, text: "Xem video bài giảng", completed: false },
			],
			tags: [
				{ id: 1, name: "Ôn tập", color: "#3b82f6" },
				{ id: 2, name: "Bài tập", color: "#10b981" },
			],
			notes: "Phiên học hiệu quả, tập trung tốt trong 2 tiếng đầu. Cần cải thiện thời gian nghỉ giữa các chu kỳ.",
			goals: [
				{ text: "Hoàn thành 80% bài tập", achieved: true },
				{ text: "Duy trì độ tập trung >85%", achieved: true },
				{ text: "Học đủ 3 tiếng", achieved: false },
			],
		};
		setSessionData(mockSession);
	}, [params.id]);

	if (!sessionData) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">
						Đang tải dữ liệu phiên học...
					</p>
				</div>
			</div>
		);
	}

	const getConcentrationColor = (level) => {
		if (level >= 90) return "text-green-600";
		if (level >= 80) return "text-blue-600";
		if (level >= 70) return "text-yellow-600";
		return "text-red-600";
	};

	const getEfficiencyColor = (efficiency) => {
		switch (efficiency) {
			case "Rất cao":
				return "bg-green-100 text-green-800 border-green-200";
			case "Cao":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "Trung bình":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "Thấp":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="outline" onClick={() => router.back()}>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Quay lại
				</Button>
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Chi tiết phiên học
					</h1>
					<p className="text-gray-600">
						{sessionData.subject} -{" "}
						{new Date(sessionData.date).toLocaleDateString("vi-VN")}
					</p>
				</div>
			</div>

			{/* Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
							<Clock className="h-4 w-4" />
							Thời gian học
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-900">
							{sessionData.studyTime}h
						</div>
						<p className="text-xs text-blue-600">
							Mục tiêu: {sessionData.targetTime}h
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
							<Target className="h-4 w-4" />
							Hoàn thành
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-900">
							{sessionData.completionRate}%
						</div>
						<p className="text-xs text-green-600">của mục tiêu</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
							<TrendingUp className="h-4 w-4" />
							Điểm đánh giá
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-purple-900">
							{sessionData.rateScore}/10
						</div>
						<p className="text-xs text-purple-600">điểm</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
							<Brain className="h-4 w-4" />
							Độ tập trung TB
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className={`text-2xl font-bold ${getConcentrationColor(
								sessionData.averageConcentration
							)}`}
						>
							{sessionData.averageConcentration.toFixed(1)}%
						</div>
						<p className="text-xs text-orange-600">trung bình</p>
					</CardContent>
				</Card>
			</div>

			{/* Concentration Chart */}
			<Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
				<CardHeader>
					<CardTitle className="text-indigo-800 flex items-center gap-2">
						<Brain className="h-5 w-5" />
						Biểu đồ độ tập trung
					</CardTitle>
					<CardDescription>
						Theo dõi mức độ tập trung trong suốt phiên học
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={400}>
						<AreaChart data={concentrationData}>
							<CartesianGrid
								strokeDasharray="3 3"
								className="opacity-30"
							/>
							<XAxis dataKey="time" className="text-sm" />
							<YAxis domain={[0, 100]} className="text-sm" />
							<Tooltip
								contentStyle={{
									backgroundColor:
										"rgba(255, 255, 255, 0.95)",
									border: "1px solid #e2e8f0",
									borderRadius: "8px",
									boxShadow:
										"0 4px 6px -1px rgba(0, 0, 0, 0.1)",
								}}
							/>
							<Area
								type="monotone"
								dataKey="concentration"
								stroke="#4f46e5"
								fill="#4f46e5"
								fillOpacity={0.3}
								strokeWidth={2}
								name="Độ tập trung"
							/>
							<Line
								type="monotone"
								dataKey="focus"
								stroke="#10b981"
								strokeWidth={2}
								strokeDasharray="5 5"
								name="Mức tập trung"
							/>
						</AreaChart>
					</ResponsiveContainer>
					<div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-white rounded-lg">
						<div className="text-center">
							<div className="text-lg font-semibold text-green-600">
								{sessionData.peakConcentration}%
							</div>
							<div className="text-sm text-gray-600">
								Cao nhất
							</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-semibold text-blue-600">
								{sessionData.averageConcentration.toFixed(1)}%
							</div>
							<div className="text-sm text-gray-600">
								Trung bình
							</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-semibold text-orange-600">
								{sessionData.lowConcentration}%
							</div>
							<div className="text-sm text-gray-600">
								Thấp nhất
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Session Details */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Session Info */}
				<Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
					<CardHeader>
						<CardTitle className="text-teal-800 flex items-center gap-2">
							<BookOpen className="h-5 w-5" />
							Thông tin phiên học
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-sm font-medium text-gray-600">
									Phương pháp
								</label>
								<div className="text-lg font-semibold">
									{sessionData.method}
								</div>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-600">
									Chu kỳ
								</label>
								<div className="text-lg font-semibold">
									{sessionData.cycles} chu kỳ
								</div>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-600">
									Thời gian nghỉ
								</label>
								<div className="text-lg font-semibold">
									{sessionData.breakTime}h
								</div>
							</div>
							<div>
								<label className="text-sm font-medium text-gray-600">
									Hiệu quả
								</label>
								<Badge
									className={getEfficiencyColor(
										sessionData.efficiency
									)}
								>
									{sessionData.efficiency}
								</Badge>
							</div>
						</div>

						<div>
							<label className="text-sm font-medium text-gray-600">
								Chủ đề học
							</label>
							<div className="text-sm text-gray-800 mt-1">
								{sessionData.topics}
							</div>
						</div>

						<div>
							<label className="text-sm font-medium text-gray-600">
								Tags
							</label>
							<div className="flex flex-wrap gap-2 mt-1">
								{sessionData.tags.map((tag) => (
									<Badge
										key={tag.id}
										style={{
											backgroundColor: tag.color,
											color: "white",
										}}
									>
										{tag.name}
									</Badge>
								))}
							</div>
						</div>

						<div>
							<label className="text-sm font-medium text-gray-600">
								Ghi chú
							</label>
							<div className="text-sm text-gray-800 mt-1 p-3 bg-white rounded-lg border">
								{sessionData.notes}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Tasks and Goals */}
				<Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
					<CardHeader>
						<CardTitle className="text-cyan-800 flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5" />
							Nhiệm vụ & Mục tiêu
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Tasks */}
						<div>
							<h4 className="font-medium text-gray-700 mb-3">
								Nhiệm vụ trong phiên học
							</h4>
							<div className="space-y-2">
								{sessionData.tasks.map((task) => (
									<div
										key={task.id}
										className="flex items-center gap-2 p-2 bg-white rounded-lg"
									>
										{task.completed ? (
											<CheckCircle2 className="h-5 w-5 text-green-600" />
										) : (
											<div className="h-5 w-5 rounded-full border-2 border-gray-300" />
										)}
										<span
											className={`${
												task.completed
													? "line-through text-gray-500"
													: "text-gray-900"
											}`}
										>
											{task.text}
										</span>
									</div>
								))}
							</div>
							<div className="mt-2 text-sm text-gray-600">
								Hoàn thành:{" "}
								{
									sessionData.tasks.filter((t) => t.completed)
										.length
								}
								/{sessionData.tasks.length} nhiệm vụ
							</div>
						</div>

						{/* Goals */}
						<div>
							<h4 className="font-medium text-gray-700 mb-3">
								Mục tiêu phiên học
							</h4>
							<div className="space-y-2">
								{sessionData.goals.map((goal, index) => (
									<div
										key={index}
										className="flex items-center gap-2 p-2 bg-white rounded-lg"
									>
										{goal.achieved ? (
											<CheckCircle2 className="h-5 w-5 text-green-600" />
										) : (
											<div className="h-5 w-5 rounded-full border-2 border-red-300" />
										)}
										<span
											className={`${
												goal.achieved
													? "text-green-700"
													: "text-red-700"
											}`}
										>
											{goal.text}
										</span>
									</div>
								))}
							</div>
							<div className="mt-2 text-sm text-gray-600">
								Đạt được:{" "}
								{
									sessionData.goals.filter((g) => g.achieved)
										.length
								}
								/{sessionData.goals.length} mục tiêu
							</div>
						</div>

						{/* Progress Summary */}
						<div className="p-4 bg-white rounded-lg border">
							<h4 className="font-medium text-gray-700 mb-2">
								Tóm tắt tiến độ
							</h4>
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Thời gian tập trung thực tế</span>
									<span className="font-semibold">
										{sessionData.totalFocusTime}h
									</span>
								</div>
								<Progress
									value={
										(sessionData.totalFocusTime /
											sessionData.targetTime) *
										100
									}
									className="h-2"
								/>
								<div className="flex justify-between text-sm text-gray-600">
									<span>Hiệu suất học tập</span>
									<span>
										{Math.round(
											(sessionData.totalFocusTime /
												sessionData.studyTime) *
												100
										)}
										%
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
