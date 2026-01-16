import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart2, Brain, Clock, TrendingUp, X } from "lucide-react";
import React from "react";
import { StudySession } from "@/lib/type/session-type";
import StatCard from "./stat-card";
import { cn } from "@/lib/utils";
import FocusChart from "./focus-chart";

const SessionDetails = ({
	selectedSession,
	setSelectedSession,
}: {
	selectedSession: StudySession;
	setSelectedSession: (session: StudySession | null) => void;
}) => {
	const glassEffect =
		"bg-black/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	return (
		<div className="h-full">
			{/* Header */}
			<div
				className={cn(
					"p-4 flex justify-between items-center",
					glassEffect
				)}
			>
				<div className="flex flex-col gap-2">
					<h3 className="text-xl font-bold truncate">
						{new Date(selectedSession.created_at).toLocaleString()}
					</h3>
					<p className="text-sm text-white/80">Chi tiết phiên học</p>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="text-white/70 hover:text-white hover:bg-white/20"
					onClick={() => setSelectedSession(null)}
				>
					<X size={20} />
				</Button>
			</div>
			{/* Nội dung Info */}
			<ScrollArea className="flex-1 py-4 overflow-hidden h-full">
				<div className="grid grid-cols-2 gap-3">
					<StatCard
						title="Tổng thời gian học"
						value={`${selectedSession.total_time} phút`}
						icon={<Clock size={20} className="text-white/90" />}
					/>
					<StatCard
						title="Thời gian tập trung"
						value={`${selectedSession.focus_time} phút`}
						icon={<Brain size={20} className="text-green-400" />}
					/>
					<StatCard
						title="Độ tập trung TB"
						value={`${selectedSession.average_focus}%`}
						icon={<BarChart2 size={20} className="text-blue-400" />}
					/>
					<StatCard
						title="Hiệu suất"
						value={`${selectedSession.average_focus}%`}
						icon={
							<TrendingUp size={20} className="text-yellow-400" />
						}
					/>
				</div>

				<div className="pt-2 h-full">
					<h4 className="font-semibold mb-2">Biểu đồ độ tập trung</h4>
					{/* MỚI: Biểu đồ thật */}
					<FocusChart selectedSession={selectedSession} />
				</div>

				{/* MỚI: Danh sách Task */}
				{/* <div className="pt-4">
						<h4 className="font-semibold mb-2">
							Các task đã hoàn thành
						</h4>
						<div className="space-y-2">
							{selectedSession.tasks.map((task) => (
								<div
									key={task.id}
									className="bg-black/20 p-3 rounded-md flex items-center"
								>
									<CheckSquare
										size={16}
										className="mr-2 text-green-400"
									/>
									<span className="text-sm">
										{task.title}
									</span>
								</div>
							))}
						</div>
					</div> */}
			</ScrollArea>
		</div>
	);
};

export default SessionDetails;
