import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { PieChartIcon } from "lucide-react";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Label, Legend, Pie, PieChart } from "recharts";

const DistributionChart = () => {
	const subjectData = [
		{ subject: "math", hours: 8.5, fill: "rgb(0,255,127)" },
		{ subject: "physics", hours: 6.2, fill: "#3B82F6" },
		{ subject: "chemistry", hours: 5.8, fill: "#F59E0B" },
		{ subject: "biology", hours: 4.3, fill: "#EF4444" },
		{ subject: "english", hours: 3.7, fill: "rgb(135,206,255)" },
		{ subject: "literature", hours: 2.3, fill: "#FFDE21" },
		{ subject: "other", hours: 1.8, fill: "#8B5CF6" },
	];

	const maxSubjectHours = Math.max(...subjectData.map((s) => s.hours));
	const subjectDataWithPercentage = subjectData.map((subject) => ({
		...subject,
		percentage: Math.round((subject.hours / maxSubjectHours) * 100),
	}));

	const totalHours = React.useMemo(() => {
		return subjectDataWithPercentage.reduce(
			(acc, subject) => acc + subject.hours,
			0
		);
	}, []);

	return (
		<Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-rose-800">
					<PieChartIcon className="h-5 w-5" />
					Phân bố thời gian theo môn học
				</CardTitle>
				<CardDescription className="text-rose-600">
					Tỷ lệ thời gian học các môn
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-6">
					<div className="flex-1">
						<ChartContainer
							config={{}}
							className="px-3 aspect-square w-full max-h-[250px]"
						>
							<PieChart margin={{}}>
								<ChartTooltip
									cursor={false}
									content={
										<ChartTooltipContent indicator="line" />
									}
								/>
								<Legend
									align="right"
									layout="vertical"
									verticalAlign="middle"
									iconSize={20}
									content={({ payload }) => (
										<div className="flex flex-col gap-2">
											{payload.map((subject, index) => (
												<div
													key={index}
													className="flex items-center gap-2"
												>
													<div
														className="h-3 w-3 rounded"
														style={{
															backgroundColor:
																subject.color,
														}}
													></div>
													<span className="capitalize text-base">
														{subject.value}
													</span>
												</div>
											))}
										</div>
									)}
								/>
								<Pie
									data={subjectDataWithPercentage}
									dataKey="hours"
									nameKey="subject"
									innerRadius={70}
									strokeWidth={5}
								>
									<Label
										content={({ viewBox }) => {
											return (
												<text
													x={viewBox.cx}
													y={viewBox.cy}
													textAnchor="middle"
													dominantBaseline="middle"
												>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy}
														className="text-4xl font-bold"
													>
														{totalHours.toLocaleString()}
													</tspan>
													<tspan
														x={viewBox.cx}
														y={viewBox.cy + 30}
														className="text-base"
													>
														Hours
													</tspan>
												</text>
											);
										}}
									/>
								</Pie>
							</PieChart>
						</ChartContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default DistributionChart;
