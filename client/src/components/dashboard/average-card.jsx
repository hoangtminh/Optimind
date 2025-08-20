"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	BarChart3,
	Book,
	BookOpen,
	Brain,
	ChevronLeft,
	ChevronRight,
	Goal,
	Target,
	TrendingUp,
} from "lucide-react";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";
import {
	Bar,
	CartesianGrid,
	Cell,
	ComposedChart,
	LabelList,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const AverageCards = ({
	timePeriod,
	setTimePeriod,
	selectedWeek,
	setSelectedWeek,
	selectedMonth,
	setSelectedMonth,
}) => {
	const studytimeChartConfig = {
		hours: {
			label: "Số giờ học",
			color: "var(--chart-3)",
			icon: Book,
		},
		goal: {
			label: "Mục tiêu",
			color: "var(--chart-2)",
			icon: Goal,
		},
	};

	const concentrateChartConfig = {
		concentrate: {
			label: "Độ tập trung",
			color: "var(--chart-4)",
		},
	};

	const chartData = [
		{ day: "Monday", study: 6.3, concentrate: 80 },
		{ day: "Tuesday", study: 4.2, concentrate: 73 },
		{ day: "Wednesday", study: 5.6, concentrate: 78 },
		{ day: "Thursday", study: 4.8, concentrate: 67 },
		{ day: "Friday", study: 5.3, concentrate: 85 },
		{ day: "Saturday", study: 5.7, concentrate: 77 },
		{ day: "Sunday", study: 6.0, concentrate: 82 },
	];

	// Data for charts
	const weeklyData = [
		{ day: "T2", hours: 5.5, goal: 6 },
		{ day: "T3", hours: 6.2, goal: 5.7 },
		{ day: "T4", hours: 4.8, goal: 5.8 },
		{ day: "T5", hours: 7.1, goal: 6.3 },
		{ day: "T6", hours: 5.9, goal: 6.4 },
		{ day: "T7", hours: 3.2, goal: 5 },
		{ day: "CN", hours: 4.5, goal: 4.7 },
	].map((item) => ({
		...item,
		performance: (item.hours / item.goal) * 100,
	}));

	const getBarColor = (performance) => {
		if (performance >= 100) return "rgb(0,255,127)"; // Green
		if (performance >= 80) return "rgb(135,206,235)"; // Blue
		return "rgb(255,127,80)"; // Orange
	};

	let maxTime = 0;
	chartData.forEach((data) => {
		if (data.study > maxTime) maxTime = data.study;
	});

	const getWeekLabel = (offset) => {
		if (offset === 0) return "Tuần này";
		if (offset === -1) return "Tuần trước";
		return `${Math.abs(offset)} tuần trước`;
	};

	const getMonthLabel = (offset) => {
		if (offset === 0) return "Tháng này";
		if (offset === -1) return "Tháng trước";
		return `${Math.abs(offset)} tháng trước`;
	};

	return (
		<Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
			<CardHeader>
				<CardTitle className="text-lg flex items-center gap-2 text-indigo-800">
					<BarChart3 className="h-5 w-5" />
					Thống kê thời gian học trung bình
				</CardTitle>
				<CardDescription className="text-indigo-600">
					Phân tích xu hướng học tập của bạn qua các khoảng thời gian
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-6">
					<div className="flex gap-2">
						<Button
							variant={
								timePeriod === "week" ? "default" : "outline"
							}
							size="sm"
							onClick={() => setTimePeriod("week")}
							className={cn(
								"hover:cursor-pointer w-20 h-8 text-base",
								timePeriod === "week"
									? "bg-indigo-600 hover:bg-indigo-700"
									: "border-indigo-300 text-indigo-700"
							)}
						>
							Tuần
						</Button>
						<Button
							variant={
								timePeriod === "month" ? "default" : "outline"
							}
							size="sm"
							onClick={() => setTimePeriod("month")}
							className={cn(
								"hover:cursor-pointer w-20 h-8 text-base",
								timePeriod === "month"
									? "bg-indigo-600 hover:bg-indigo-700"
									: "border-indigo-300 text-indigo-700"
							)}
						>
							Tháng
						</Button>
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								if (timePeriod === "week") {
									setSelectedWeek((prev) => prev - 1);
								} else {
									setSelectedMonth((prev) => prev - 1);
								}
							}}
							className="border-indigo-300 text-indigo-700 h-8 w-8 p-0 hover:cursor-pointer"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<span className="text-sm font-medium text-indigo-800 min-w-[100px] text-center">
							{timePeriod === "week"
								? getWeekLabel(selectedWeek)
								: getMonthLabel(selectedMonth)}
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								if (timePeriod === "week") {
									setSelectedWeek((prev) =>
										Math.min(prev + 1, 0)
									);
								} else {
									setSelectedMonth((prev) =>
										Math.min(prev + 1, 0)
									);
								}
							}}
							disabled={
								timePeriod === "week"
									? selectedWeek >= 0
									: selectedMonth >= 0
							}
							className="border-indigo-300 text-indigo-700 h-8 w-8 p-0 disabled:opacity-50 hover:cursor-pointer"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<Card className="pt-0">
						<CardHeader className=" gap-2 space-y-0 border-b py-5 sm:flex-row">
							<CardTitle>
								<div className="flex flex-row gap-2 items-center">
									<BookOpen className="h-5 w-5" />
									<span className="text-lg">
										Thời gian học tập trung bình
									</span>
								</div>
							</CardTitle>
							<CardDescription>
								Thời gian học tập trong vòng 1 tuần qua
							</CardDescription>
						</CardHeader>
						<CardContent className="px-2 sm:px-6 sm:pt-6">
							<ChartContainer
								config={studytimeChartConfig}
								className="h-[200px] w-full"
							>
								<ComposedChart
									accessibilityLayer
									data={weeklyData}
									margin={{}}
								>
									<XAxis
										dataKey="day"
										tickMargin={10}
										axisLine={true}
										tickFormatter={(value) =>
											value.slice(0, 3)
										}
									/>
									<ChartTooltip
										content={<ChartTooltipContent />}
										cursor={false}
									/>
									<Bar dataKey="hours" radius={8}>
										{weeklyData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={getBarColor(
													entry.performance
												)}
											/>
										))}
										<LabelList
											position="base"
											offset={12}
											className="fill-foreground font-bold text-xs"
										/>
									</Bar>
									<Line
										type="linear"
										dataKey="goal"
										stroke="var(--chart-1)"
										strokeWidth={1}
										dot={{
											fill: "var(--chart-1)",
											strokeWidth: 2,
											r: 3,
										}}
									/>
								</ComposedChart>
							</ChartContainer>
							<div className="my-2 flex flex-wrap justify-around gap-4 text-sm">
								<div className="flex items-center gap-2">
									<div
										className="h-3 w-3 rounded"
										style={{
											backgroundColor: getBarColor(100),
										}}
									></div>
									<span>Hoàn thành</span>
								</div>
								<div className="flex items-center gap-2">
									<div
										className="h-3 w-3 rounded"
										style={{
											backgroundColor: getBarColor(80),
										}}
									></div>
									<span>Gần đạt (80%+)</span>
								</div>
								<div className="flex items-center gap-2">
									<div
										className="h-3 w-3 rounded"
										style={{
											backgroundColor: getBarColor(50),
										}}
									></div>
									<span>Chưa đạt (&lt;80%)</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="pt-0">
						<CardHeader className="py-5 items-center gap-2 space-y-0 border-b sm:flex-row">
							<CardTitle>
								<div className="flex flex-row gap-2 items-center">
									<Brain className="h-5 w-5" />
									<span className="text-lg">
										Độ tập trung trung bình
									</span>
								</div>
							</CardTitle>
							<CardDescription>
								Trung bình 1 ngày trong các tuần qua
							</CardDescription>
						</CardHeader>
						<CardContent className="px-2 sm:px-6 sm:pt-6">
							<ChartContainer
								config={concentrateChartConfig}
								className="h-[200px] w-full"
							>
								<LineChart
									accessibilityLayer
									data={chartData}
									margin={{
										left: 20,
										right: 12,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="day"
										tickLine={true}
										axisLine={true}
										tickMargin={8}
										tickFormatter={(value) =>
											value.slice(0, 3)
										}
									/>

									<ChartTooltip
										cursor={true}
										content={
											<ChartTooltipContent indicator="line" />
										}
									/>
									<Line
										dataKey="concentrate"
										type="natural"
										stroke="var(--chart-2)"
										strokeWidth={2}
										dot={{
											fill: "var(--chart-2)",
										}}
										activeDot={{
											r: 6,
										}}
									>
										<LabelList
											position="top"
											offset={12}
											className="fill-foreground"
											fontSize={12}
										/>
									</Line>
								</LineChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
};

export default AverageCards;
