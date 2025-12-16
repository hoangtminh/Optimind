// Tên file: app/components/FocusChartWidget.tsx
"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useCamera } from "@/hooks/useCamera";
import { useFocus } from "@/hooks/useFocus";
import useInterval from "@/hooks/useInterval";

// MỚI: Export FocusDataPoint type
export interface FocusDataPoint {
	time: number; // Giây (để thể hiện thời gian trôi qua)
	focus: number; // %
}

// Hàm tiện ích
const glassEffect =
	"bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg";

// Định nghĩa Props
interface FocusChartWidgetProps {
	isRunning: boolean;
}

// Component Biểu đồ
const FocusChartWidget: FC<FocusChartWidgetProps> = ({ isRunning }) => {
	const { isCamActive } = useCamera();
	const [focusData, setFocusData] = useState<FocusDataPoint[]>([]);
	const [currentSecondsElapsed, setCurrentSecondsElapsed] =
		useState<number>(0);

	const { focusState } = useFocus();

	const updateScore = () => {
		setCurrentSecondsElapsed((prev) => prev + 1);
		if (isCamActive) {
			// 2. Thêm dữ liệu vào array
			setFocusData((prevData) => [
				...prevData,
				{ time: prevData.length + 1, focus: focusState.score },
			]);
		} else {
			setFocusData((prevData) => [
				...prevData,
				{ time: prevData.length + 1, focus: 0 },
			]);
		}
	};

	useInterval({ callback: updateScore, delay: isRunning ? 1000 : null });

	return (
		<div
			className={cn("w-full h-full px-4 pt-3 flex flex-col", glassEffect)}
		>
			<div className="flex justify-between items-center text-lg mb-1">
				<div className="flex gap-4">
					<p className="font-semibold text-gray-200">Trạng thái:</p>
					{isCamActive ? (
						<p
							className="font-bold"
							style={{ color: focusState.color }}
						>
							{focusState.status}
						</p>
					) : (
						<p className="text-red-600 font-bold">
							Please turn on camera
						</p>
					)}
				</div>

				{isCamActive ? (
					<p
						className="text-xl font-bold"
						style={{
							color:
								focusState.score > 70 ? "#4ADE80" : "#F87171",
						}}
					>
						{focusState.score}%
					</p>
				) : (
					<p className="text-red-600 font-bold">0</p>
				)}
			</div>

			{/* Biểu đồ Line Chart */}
			<div className="flex-1">
				<ResponsiveContainer width="100%" height="90%">
					<LineChart
						data={focusData}
						margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
					>
						<CartesianGrid
							strokeDasharray="3 3"
							stroke="#ffffff1a"
						/>
						<XAxis
							dataKey="time"
							stroke="#ffffff80"
							fontSize={10}
							tickLine={false}
							axisLine={false}
							tickFormatter={(val) => `${val}s`}
							tickMargin={10}
						/>
						<YAxis
							stroke="#ffffff80"
							fontSize={10}
							unit="%"
							domain={[0, 100]}
							tickLine={false}
							axisLine={false}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(0, 0, 0, 0.7)",
								border: "1px solid #ffffff44",
								borderRadius: "4px",
								color: "#fff",
							}}
							labelFormatter={(val) => `Thời gian: ${val}s`}
							formatter={(value, name) => [`${value}%`]}
						/>
						<Line
							type="monotone"
							dataKey="focus"
							stroke="#3b82f6" // Màu xanh
							strokeWidth={2}
							dot={false}
							isAnimationActive={false} // Tắt animation để cập nhật mượt hơn
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default FocusChartWidget;
