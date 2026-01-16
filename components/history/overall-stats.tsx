import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Brain, CheckSquare, Clock, TrendingUp } from "lucide-react";
import StatCard from "./stat-card";
import FocusChart from "./focus-chart";
import { cn } from "@/lib/utils";

const OverallStat = ({ filter }: { filter: string }) => {
	const overallStats = { totalTime: 0, tasks: 0, avgFocus: 0, efficiency: 0 };
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";
	return (
		<div className="flex flex-col gap-4 h-full">
			{/* Header */}
			<div className={cn("p-4 flex flex-col gap-2", glassEffect)}>
				<h3 className="text-xl font-bold truncate">
					Tổng quan (Theo{" "}
					{filter === "day"
						? "Ngày"
						: filter === "week"
						? "Tuần"
						: "Tháng"}
					)
				</h3>
				<p className="text-sm text-white/80 ">Thống kê tổng hợp</p>
			</div>
			{/* Nội dung Info */}
			<ScrollArea className="flex-1 overflow-hidden">
				{/* Thống kê tổng quan */}
				<div className="grid grid-cols-2 gap-3">
					<StatCard
						title="Tổng thời gian học"
						value={`${overallStats.totalTime} giờ`}
						icon={<Clock size={20} className="text-white/90" />}
					/>
					<StatCard
						title="Task hoàn thành"
						value={`${overallStats.tasks} tasks`}
						icon={
							<CheckSquare size={20} className="text-green-400" />
						}
					/>
					<StatCard
						title="Độ tập trung TB"
						value={`${overallStats.avgFocus}%`}
						icon={<Brain size={20} className="text-blue-400" />}
					/>
					<StatCard
						title="Hiệu suất TB"
						value={`${overallStats.efficiency}%`}
						icon={
							<TrendingUp size={20} className="text-yellow-400" />
						}
					/>
				</div>
				{/* Biểu đồ tổng quan */}
				<div className="pt-2">
					<h4 className="font-semibold mb-2">
						Hoạt động 7 ngày qua (Focus %)
					</h4>
					<FocusChart selectedSession={null} />
				</div>
			</ScrollArea>
		</div>
	);
};

export default OverallStat;
