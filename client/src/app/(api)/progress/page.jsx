"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";

// Sample data for charts
const dailyData = [
	{ date: "Mon", studyTime: 4.5, average: 5.2, target: 6 },
	{ date: "Tue", studyTime: 6.2, average: 5.2, target: 6 },
	{ date: "Wed", studyTime: 3.8, average: 5.2, target: 6 },
	{ date: "Thu", studyTime: 7.1, average: 5.2, target: 6 },
	{ date: "Fri", studyTime: 5.5, average: 5.2, target: 6 },
	{ date: "Sat", studyTime: 8.2, average: 5.2, target: 6 },
	{ date: "Sun", studyTime: 4.9, average: 5.2, target: 6 },
];

const weeklyData = [
	{ week: "W1", studyTime: 32.5, average: 35.8, target: 42 },
	{ week: "W2", studyTime: 38.2, average: 35.8, target: 42 },
	{ week: "W3", studyTime: 29.7, average: 35.8, target: 42 },
	{ week: "W4", studyTime: 41.3, average: 35.8, target: 42 },
	{ week: "W5", studyTime: 36.8, average: 35.8, target: 42 },
	{ week: "W6", studyTime: 44.1, average: 35.8, target: 42 },
];

const monthlyData = [
	{ month: "Jan", studyTime: 142.5, average: 158.4, target: 180 },
	{ month: "Feb", studyTime: 168.2, average: 158.4, target: 180 },
	{ month: "Mar", studyTime: 135.7, average: 158.4, target: 180 },
	{ month: "Apr", studyTime: 173.8, average: 158.4, target: 180 },
	{ month: "May", studyTime: 161.2, average: 158.4, target: 180 },
	{ month: "Jun", studyTime: 189.3, average: 158.4, target: 180 },
];

const subjectData = [
	{ name: "Toán học", hours: 45.2, color: "#3b82f6" },
	{ name: "Vật lý", hours: 38.7, color: "#10b981" },
	{ name: "Hóa học", hours: 32.1, color: "#f59e0b" },
	{ name: "Sinh học", hours: 28.5, color: "#ef4444" },
	{ name: "Văn học", hours: 25.8, color: "#8b5cf6" },
	{ name: "Tiếng Anh", hours: 22.3, color: "#06b6d4" },
];

const detailedProgressData = [
	{
		id: 1,
		date: "2024-01-15",
		subject: "Toán học",
		studyTime: 2.5,
		targetTime: 3.0,
		completionRate: 83,
		rateScore: 8.5,
		topics: "Đạo hàm, Tích phân",
		efficiency: "Cao",
	},
	{
		id: 2,
		date: "2024-01-15",
		subject: "Vật lý",
		studyTime: 1.8,
		targetTime: 2.0,
		completionRate: 90,
		rateScore: 9.2,
		topics: "Điện học, Từ học",
		efficiency: "Rất cao",
	},
	{
		id: 3,
		date: "2024-01-14",
		subject: "Hóa học",
		studyTime: 2.2,
		targetTime: 2.5,
		completionRate: 88,
		rateScore: 7.8,
		topics: "Hóa hữu cơ",
		efficiency: "Cao",
	},
	{
		id: 4,
		date: "2024-01-14",
		subject: "Sinh học",
		studyTime: 1.5,
		targetTime: 2.0,
		completionRate: 75,
		rateScore: 7.2,
		topics: "Di truyền học",
		efficiency: "Trung bình",
	},
	{
		id: 5,
		date: "2024-01-13",
		subject: "Văn học",
		studyTime: 1.2,
		targetTime: 1.5,
		completionRate: 80,
		rateScore: 8.0,
		topics: "Thơ Nguyễn Du",
		efficiency: "Cao",
	},
	{
		id: 6,
		date: "2024-01-13",
		subject: "Tiếng Anh",
		studyTime: 2.0,
		targetTime: 2.0,
		completionRate: 100,
		rateScore: 9.5,
		topics: "Grammar, Vocabulary",
		efficiency: "Rất cao",
	},
	{
		id: 7,
		date: "2024-01-12",
		subject: "Toán học",
		studyTime: 3.2,
		targetTime: 3.0,
		completionRate: 107,
		rateScore: 9.0,
		topics: "Hình học không gian",
		efficiency: "Rất cao",
	},
	{
		id: 8,
		date: "2024-01-12",
		subject: "Vật lý",
		studyTime: 1.5,
		targetTime: 2.0,
		completionRate: 75,
		rateScore: 6.8,
		topics: "Quang học",
		efficiency: "Trung bình",
	},
];

export default function ProgressPage() {
	const [timeFrame, setTimeFrame] = useState("daily");
	const [sortBy, setSortBy] = useState("date");
	const [sortOrder, setSortOrder] = useState("desc");
	const [filterSubject, setFilterSubject] = useState("all");

	const getCurrentData = () => {
		switch (timeFrame) {
			case "daily":
				return dailyData;
			case "weekly":
				return weeklyData;
			case "monthly":
				return monthlyData;
			default:
				return dailyData;
		}
	};

	const getAverageTime = () => {
		const data = getCurrentData();
		const total = data.reduce((sum, item) => sum + item.studyTime, 0);
		return (total / data.length).toFixed(1);
	};

	const getCompletionRate = () => {
		const data = getCurrentData();
		const completedDays = data.filter(
			(item) => item.studyTime >= item.target
		).length;
		return Math.round((completedDays / data.length) * 100);
	};

	const getEfficiencyColor = (efficiency) => {
		switch (efficiency) {
			case "Rất cao":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
			case "Cao":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
			case "Trung bình":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
			case "Thấp":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
		}
	};

	const getRateScoreColor = (score) => {
		if (score >= 9) return "text-green-600 font-bold";
		if (score >= 8) return "text-blue-600 font-semibold";
		if (score >= 7) return "text-yellow-600 font-medium";
		return "text-red-600 font-medium";
	};

	const getCompletionRateColor = (rate) => {
		if (rate >= 100) return "text-green-600 font-bold";
		if (rate >= 80) return "text-blue-600 font-semibold";
		if (rate >= 60) return "text-yellow-600 font-medium";
		return "text-red-600 font-medium";
	};

	const sortedAndFilteredData = detailedProgressData
		.filter(
			(item) => filterSubject === "all" || item.subject === filterSubject
		)
		.sort((a, b) => {
			let aValue = a[sortBy];
			let bValue = b[sortBy];

			if (sortBy === "date") {
				aValue = new Date(aValue);
				bValue = new Date(bValue);
			}

			if (sortOrder === "asc") {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

	const uniqueSubjects = [
		...new Set(detailedProgressData.map((item) => item.subject)),
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col space-y-2">
				<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Tiến độ học tập
				</h1>
				<p className="text-muted-foreground">
					Theo dõi và phân tích quá trình học tập của bạn
				</p>
			</div>

			{/* Time Frame Selector */}
			<div className="flex space-x-2">
				<Button
					variant={timeFrame === "daily" ? "default" : "outline"}
					onClick={() => setTimeFrame("daily")}
					className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
				>
					Theo ngày
				</Button>
				<Button
					variant={timeFrame === "weekly" ? "default" : "outline"}
					onClick={() => setTimeFrame("weekly")}
					className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
				>
					Theo tuần
				</Button>
				<Button
					variant={timeFrame === "monthly" ? "default" : "outline"}
					onClick={() => setTimeFrame("monthly")}
					className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
				>
					Theo tháng
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
							Thời gian trung bình
						</CardTitle>
					</CardHeader>
					<CardContent>
						<h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100">
							{getAverageTime()}h
						</h2>
						<p className="text-xs text-blue-600 dark:text-blue-400">
							{timeFrame === "daily"
								? "mỗi ngày"
								: timeFrame === "weekly"
								? "mỗi tuần"
								: "mỗi tháng"}
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
							Tỷ lệ hoàn thành
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-900 dark:text-green-100">
							{getCompletionRate()}%
						</div>
						<p className="text-xs text-green-600 dark:text-green-400">
							đạt mục tiêu
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
							Tổng thời gian
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
							{getCurrentData()
								.reduce((sum, item) => sum + item.studyTime, 0)
								.toFixed(1)}
							h
						</div>
						<p className="text-xs text-purple-600 dark:text-purple-400">
							{timeFrame === "daily"
								? "tuần này"
								: timeFrame === "weekly"
								? "6 tuần qua"
								: "6 tháng qua"}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Main Progress Chart */}
			<Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Biểu đồ tiến độ học tập
						<Badge
							variant="secondary"
							className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
						>
							{timeFrame === "daily"
								? "Hàng ngày"
								: timeFrame === "weekly"
								? "Hàng tuần"
								: "Hàng tháng"}
						</Badge>
					</CardTitle>
					<CardDescription>
						So sánh thời gian học thực tế với mục tiêu và trung bình
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={400}>
						<LineChart data={getCurrentData()}>
							<CartesianGrid
								strokeDasharray="3 3"
								className="opacity-30"
							/>
							<XAxis
								dataKey={
									timeFrame === "daily"
										? "date"
										: timeFrame === "weekly"
										? "week"
										: "month"
								}
								className="text-sm"
							/>
							<YAxis className="text-sm" />
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
							<Legend />
							<Line
								type="monotone"
								dataKey="studyTime"
								stroke="#3b82f6"
								strokeWidth={3}
								name="Thời gian học"
								dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
							/>
							<Line
								type="monotone"
								dataKey="average"
								stroke="#10b981"
								strokeWidth={2}
								strokeDasharray="5 5"
								name="Trung bình"
								dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
							/>
							<Line
								type="monotone"
								dataKey="target"
								stroke="#ef4444"
								strokeWidth={2}
								strokeDasharray="10 5"
								name="Mục tiêu"
								dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			{/* Subject Distribution Chart */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
					<CardHeader>
						<CardTitle className="text-orange-800 dark:text-orange-200">
							Phân bố theo môn học
						</CardTitle>
						<CardDescription>
							Thời gian học theo từng môn học (tháng này)
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={subjectData}
									cx="50%"
									cy="50%"
									outerRadius={80}
									fill="#8884d8"
									dataKey="hours"
									label={({ name, hours }) =>
										`${name}: ${hours}h`
									}
								>
									{subjectData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900">
					<CardHeader>
						<CardTitle className="text-teal-800 dark:text-teal-200">
							Top môn học
						</CardTitle>
						<CardDescription>
							Thời gian học nhiều nhất (tháng này)
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={subjectData} layout="horizontal">
								<CartesianGrid
									strokeDasharray="3 3"
									className="opacity-30"
								/>
								<XAxis type="number" className="text-sm" />
								<YAxis
									dataKey="name"
									type="category"
									width={80}
									className="text-sm"
								/>
								<Tooltip
									contentStyle={{
										backgroundColor:
											"rgba(255, 255, 255, 0.95)",
										border: "1px solid #e2e8f0",
										borderRadius: "8px",
									}}
								/>
								<Bar
									dataKey="hours"
									fill="#14b8a6"
									radius={[0, 4, 4, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			<Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900">
				<CardHeader>
					<CardTitle className="text-indigo-800 dark:text-indigo-200">
						Chi tiết tiến độ học tập
					</CardTitle>
					<CardDescription>
						Bảng thống kê chi tiết thời gian học và điểm đánh giá
					</CardDescription>

					{/* Table Controls */}
					<div className="flex flex-wrap gap-4 mt-4">
						<div className="flex items-center gap-2">
							<label className="text-sm font-medium">
								Sắp xếp theo:
							</label>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="px-3 py-1 border rounded-md text-sm bg-white dark:bg-gray-800"
							>
								<option value="date">Ngày</option>
								<option value="subject">Môn học</option>
								<option value="studyTime">Thời gian học</option>
								<option value="rateScore">Điểm đánh giá</option>
								<option value="completionRate">
									Tỷ lệ hoàn thành
								</option>
							</select>
						</div>

						<div className="flex items-center gap-2">
							<label className="text-sm font-medium">
								Thứ tự:
							</label>
							<select
								value={sortOrder}
								onChange={(e) => setSortOrder(e.target.value)}
								className="px-3 py-1 border rounded-md text-sm bg-white dark:bg-gray-800"
							>
								<option value="desc">Giảm dần</option>
								<option value="asc">Tăng dần</option>
							</select>
						</div>

						<div className="flex items-center gap-2">
							<label className="text-sm font-medium">
								Lọc môn học:
							</label>
							<select
								value={filterSubject}
								onChange={(e) =>
									setFilterSubject(e.target.value)
								}
								className="px-3 py-1 border rounded-md text-sm bg-white dark:bg-gray-800"
							>
								<option value="all">Tất cả</option>
								{uniqueSubjects.map((subject) => (
									<option key={subject} value={subject}>
										{subject}
									</option>
								))}
							</select>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<div className="overflow-x-auto">
						<table className="w-full border-collapse">
							<thead>
								<tr className="border-b-2 border-indigo-200 dark:border-indigo-700">
									<th className="text-left p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Ngày
									</th>
									<th className="text-left p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Môn học
									</th>
									<th className="text-left p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Chủ đề
									</th>
									<th className="text-center p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Thời gian học
									</th>
									<th className="text-center p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Mục tiêu
									</th>
									<th className="text-center p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Tỷ lệ hoàn thành
									</th>
									<th className="text-center p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Điểm đánh giá
									</th>
									<th className="text-center p-3 font-semibold text-indigo-800 dark:text-indigo-200">
										Hiệu quả
									</th>
								</tr>
							</thead>
							<tbody>
								{sortedAndFilteredData.map((item, index) => (
									<tr
										key={item.id}
										className={`border-b border-indigo-100 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors ${
											index % 2 === 0
												? "bg-white dark:bg-gray-900"
												: "bg-indigo-50 dark:bg-indigo-950"
										}`}
									>
										<td className="p-3 text-sm">
											{new Date(
												item.date
											).toLocaleDateString("vi-VN")}
										</td>
										<td className="p-3">
											<Badge
												variant="outline"
												className="bg-white dark:bg-gray-800"
											>
												{item.subject}
											</Badge>
										</td>
										<td className="p-3 text-sm text-gray-600 dark:text-gray-300">
											{item.topics}
										</td>
										<td className="p-3 text-center">
											<span className="font-semibold text-blue-600 dark:text-blue-400">
												{item.studyTime}h
											</span>
										</td>
										<td className="p-3 text-center text-gray-500 dark:text-gray-400">
											{item.targetTime}h
										</td>
										<td className="p-3 text-center">
											<span
												className={getCompletionRateColor(
													item.completionRate
												)}
											>
												{item.completionRate}%
											</span>
										</td>
										<td className="p-3 text-center">
											<span
												className={getRateScoreColor(
													item.rateScore
												)}
											>
												{item.rateScore}/10
											</span>
										</td>
										<td className="p-3 text-center">
											<Badge
												className={getEfficiencyColor(
													item.efficiency
												)}
											>
												{item.efficiency}
											</Badge>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Table Summary */}
					<div className="mt-6 p-4 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
							<div>
								<div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
									{sortedAndFilteredData.length}
								</div>
								<div className="text-sm text-indigo-600 dark:text-indigo-300">
									Phiên học
								</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
									{sortedAndFilteredData
										.reduce(
											(sum, item) => sum + item.studyTime,
											0
										)
										.toFixed(1)}
									h
								</div>
								<div className="text-sm text-indigo-600 dark:text-indigo-300">
									Tổng thời gian
								</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
									{(
										sortedAndFilteredData.reduce(
											(sum, item) => sum + item.rateScore,
											0
										) / sortedAndFilteredData.length
									).toFixed(1)}
								</div>
								<div className="text-sm text-indigo-600 dark:text-indigo-300">
									Điểm TB
								</div>
							</div>
							<div>
								<div className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
									{Math.round(
										sortedAndFilteredData.reduce(
											(sum, item) =>
												sum + item.completionRate,
											0
										) / sortedAndFilteredData.length
									)}
									%
								</div>
								<div className="text-sm text-indigo-600 dark:text-indigo-300">
									Hoàn thành TB
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
