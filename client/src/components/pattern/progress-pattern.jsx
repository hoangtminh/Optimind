import React from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Edit, Trash2 } from "lucide-react";
import { useTasks } from "@/hooks/use-task";

const ProgressPattern = ({ task, color, type }) => {
	const { updateProgress, setEditingTask, deleteTask } = useTasks();

	const editable = type !== "overdue";

	return (
		<div
			key={task.id}
			className={`p-3 bg-white/60 rounded-lg border border-${color}-200`}
		>
			<div className="flex items-start justify-between mb-2">
				<div className="flex-1">
					<h4 className="font-medium text-cyan-800 text-sm">
						{task.title}
					</h4>
					<div
						className={`flex items-center gap-2 text-xs text-${color}-600`}
					>
						<span>{task.subject}</span>
						<Badge variant="outline" className="text-xs">
							{type === "daily"
								? task.repeatFrequency === "daily"
									? "Hàng ngày"
									: task.repeatFrequency === "weekly"
									? "Hàng tuần"
									: "Thứ 2-6"
								: ""}
							{type === "long-term" && "Dài hạn"}
						</Badge>
					</div>
					{task.notes && (
						<p className={`text-xs text-${color}-600 mt-1 italic`}>
							{task.notes}
						</p>
					)}
				</div>
				<div className="flex items-center gap-1">
					{editable && (
						<Button
							variant="ghost"
							size="sm"
							className="h-6 w-6 p-0"
							onClick={() => setEditingTask(task)}
						>
							<Edit className="h-3 w-3" />
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0"
						onClick={() => deleteTask(task.id)}
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>
			</div>
			<div className="space-y-2">
				<div
					className={`flex gap-2 items-center justify-between text-xs text-${color}-600`}
				>
					<Progress
						value={(task.current / task.target) * 100}
						className={`h-2 bg-${color}-200`}
						indicatorColor={`bg-${color}-600`}
					/>
					<span className="text-right text-nowrap min-w-25">
						{task.current.toFixed(1)}/{task.target} {task.unit}
					</span>
				</div>

				<div className="flex justify-between items-center text-xs">
					{editable && (
						<div className={`flex flex-row gap-2 items-center`}>
							<span className={`text-nowrap text-${color}-600`}>
								Cập nhật tiến độ:
							</span>
							<Input
								type="number"
								value={task.current}
								onChange={(e) =>
									updateProgress(
										task.id,
										Number.parseFloat(e.target.value) || 0
									)
								}
								className="w-20 h-7 text-xs text-right p-1"
								step="0.1"
							/>
						</div>
					)}
					{type === "long-term" && (
						<div
							className={`flex justify-between items-center text-xs text-${color}-600`}
						>
							Deadline: {task.deadline}
						</div>
					)}
					{type === "overdue" && (
						<div className="flex justify-between items-center text-xs">
							<Badge variant="destructive" className="text-xs">
								Deadline: {task.deadline}
							</Badge>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProgressPattern;
