import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useTasks } from "@/hooks/use-task";

const UpcomingTasks = () => {
	const { tasks } = useTasks();
	const activeDailyTasks = tasks.filter((task) => task.taskType === "daily"); // Split active tasks by type

	return (
		<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-cyan-800">
					<Target className="h-5 w-5" />
					Mục tiêu trong ngày
				</CardTitle>
				<CardDescription className="text-cyan-600">
					Theo dõi tiến độ các mục tiêu đã đặt
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{activeDailyTasks.map((task, index) => (
					<div
						key={task.id}
						className="p-3 bg-white/60 rounded-lg border border-cyan-200"
					>
						<div className="flex items-start justify-between mb-2">
							<div className="flex-1">
								<h4 className="font-medium text-cyan-800 text-sm">
									{task.title}
								</h4>
								<div className="flex items-center gap-2 text-xs text-cyan-600">
									<span>{task.subject}</span>
									<Badge
										variant="outline"
										className="text-xs"
									>
										{task.repeatFrequency === "daily"
											? "Hàng ngày"
											: task.repeatFrequency === "weekly"
											? "Hàng tuần"
											: "Thứ 2-6"}
									</Badge>
								</div>
								{task.notes && (
									<p className="text-xs text-cyan-600 mt-1 italic">
										{task.notes}
									</p>
								)}
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex gap-2 items-center justify-between text-xs text-cyan-600">
								<Progress
									value={(task.current / task.target) * 100}
									className="h-2 bg-cyan-200"
									indicatorColor={"bg-cyan-600"}
								/>
								<span className="text-right text-nowrap min-w-25">
									{task.current.toFixed(1)}/{task.target}{" "}
									{task.unit}
								</span>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default UpcomingTasks;
