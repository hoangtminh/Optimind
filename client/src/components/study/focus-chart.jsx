"use client";

import React, { useEffect, useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useStudy } from "@/hooks/use-study-session";
import { formatTime } from "@/lib/utils";
import { Label } from "../ui/label";

const FocusChart = () => {
	const {
		isSessionActive,
		isPaused,
		timeRemaining,
		maxTime,
		focusData,
		setFocusData,
	} = useStudy();

	const [currentFocus, setCurrentFocus] = useState(65);

	// Focus data simulation
	useEffect(() => {
		if (isSessionActive && !isPaused && timeRemaining > 0) {
			const interval = setInterval(() => {
				const newFocus = Math.max(
					20,
					Math.min(100, currentFocus + (Math.random() - 0.5) * 10)
				);
				setCurrentFocus(newFocus);

				const now = new Date();
				const timeLabel = formatTime(maxTime - timeRemaining);

				setFocusData((prev) => {
					const newData = [
						...prev,
						{ time: timeLabel, focus: Math.round(newFocus) },
					];
					// Keep only last 2 minutes (120 data points at 1 second intervals)
					return newData.slice(-120);
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isSessionActive, isPaused, currentFocus]);

	return (
		<div>
			<Label className="text-md font-medium mb-3 block">
				Độ tập trung (2 phút gần nhất)
			</Label>

			<div className="h-fit w-full bg-white rounded-lg border border-green-200 shadow-lg px-3 py-6">
				<ChartContainer
					config={{}}
					className={"h-[330px] w-full"}
					width="100%"
					height="100%"
				>
					<LineChart
						accessibilityLayer
						data={focusData}
						margin={{
							left: -30,
							right: 10,
							top: 10,
							bottom: -10,
						}}
					>
						<CartesianGrid />
						<ChartTooltip
							cursor={true}
							content={<ChartTooltipContent />}
						/>
						<XAxis
							dataKey="time"
							axisLine={true}
							tickLine={false}
							minTickGap={25}
							tick={{ fontSize: 12 }}
						/>
						<YAxis
							domain={[0, 100]}
							axisLine={true}
							tickLine={false}
							tick={{ fontSize: 12 }}
						/>
						<Line
							isAnimationActive={false}
							type="monotone"
							dataKey="focus"
							stroke="#4f46e5"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>
			<div className="flex flex-row gap-4 justify-center text-center mt-4">
				<div className="text-base text-gray-600">
					Độ tập trung hiện tại:
					<span className="font-semibold text-indigo-600 ml-1">
						{Math.round(currentFocus)}%
					</span>
				</div>
				<div className="text-base text-gray-600">
					Độ tập trung trung binh:
					<span className="font-semibold text-indigo-600 ml-1">
						{Math.round(currentFocus)}%
					</span>
				</div>
			</div>
		</div>
	);
};

export default FocusChart;
