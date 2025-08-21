import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Calendar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { dailyTaskData } from "@/data/tasks-data";

const DailyTaskChart = () => {
	const getDailyChartColor = (completed, total) => {
		const missing = total - completed;
		if (missing <= 1) return "rgb(0,255,127)"; // Green for 0-1 missing
		if (missing <= 2) return "rgb(135,206,235)"; // Blue for 2-3 missing
		return "rgb(255,127,80)"; // Orange for 4+ missing
	};

	const dailyTaskData = [
		{ day: "T2", total: 5, completed: 2 },
		{ day: "T3", total: 6, completed: 5 },
		{ day: "T4", total: 4, completed: 3 },
		{ day: "T5", total: 7, completed: 3 },
		{ day: "T6", total: 5, completed: 3 },
		{ day: "T7", total: 3, completed: 3 },
		{ day: "CN", total: 2, completed: 2 },
	].map((e) => {
		return {
			...e,
			percentage: (e.completed / e.total) * 100,
			fill: getDailyChartColor(e.completed, e.total),
		};
	});

	const maxDailyTasks = Math.max(...dailyTaskData.map((d) => d.total));

	return (
		<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-cyan-800">
					<Calendar className="h-5 w-5" />
					Tasks hàng ngày hoàn thành
				</CardTitle>
				<CardDescription className="text-cyan-600">
					Công việc hàng ngày cần hoàn thiện
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className="py-2 bg-white rounded-md shadow-lg border-neutral-600"
					config={{}}
				>
					<BarChart
						accessibilityLayer
						data={dailyTaskData}
						layout="vertical"
						margin={{ left: -10, right: 10 }}
					>
						<XAxis dataKey="percentage" type="number" hide />
						<YAxis
							dataKey="day"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									formatter={(value) =>
										`Tasks: ${value
											.toLocaleString()
											.slice(0, 4)}% completed`
									}
								/>
							}
						/>
						<Bar dataKey="percentage" height={7} radius={5} />
					</BarChart>
				</ChartContainer>

				<div className="mt-4 flex items-center gap-4 text-xs text-cyan-600">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
						<span>Thiếu ≤1</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded"></div>
						<span>Thiếu 2-3</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded"></div>
						<span>Thiếu ≥4</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default DailyTaskChart;
