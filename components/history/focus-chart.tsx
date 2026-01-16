import { FocusDataPoint, StudySession } from "@/lib/type/session-type";
import { cn } from "@/lib/utils";
import { getLogOfSession } from "@/supabase/lib/getStudySession";
import { Session } from "inspector/promises";
import { FC, useEffect, useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const FocusChart = ({
	selectedSession,
}: {
	selectedSession: StudySession | null;
}) => {
	const [data, setData] = useState<FocusDataPoint[]>([]);
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	useEffect(() => {
		const fetchSessionLog = async () => {
			if (selectedSession == null) return;
			const sessionLog = await getLogOfSession(selectedSession.id);
			setData(
				sessionLog
					? sessionLog.map((p) => ({
							...p,
							timestamp: String(
								(new Date(p.timestamp).getTime() -
									new Date(
										selectedSession.start_time
									).getTime()) /
									1000
							),
					  }))
					: []
			);
		};

		fetchSessionLog();
	}, [selectedSession]);

	return (
		<div
			className={cn(
				"w-full h-63 bg-black/20 rounded-lg p-4 border border-white/10",
				glassEffect
			)}
		>
			<ResponsiveContainer width={"100%"} height={"100%"}>
				<LineChart
					data={data}
					margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
					<XAxis
						dataKey="timestamp"
						stroke="#ffffff80"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickFormatter={(val) => `${val.slice(0, 10)}m`}
					/>
					<YAxis
						stroke="#ffffff80"
						fontSize={12}
						unit="%"
						domain={[0, 100]}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "rgba(0, 0, 0, 0.8)",
							border: "none",
							borderRadius: "8px",
							color: "#fff",
						}}
						labelFormatter={(val) => `Phút ${val}`}
					/>
					<Line
						type="monotone"
						dataKey="focus_point"
						stroke="#3b82f6" // Màu xanh
						strokeWidth={2}
						activeDot={{ r: 8 }}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
export default FocusChart;
