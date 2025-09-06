import React from "react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { Input } from "../../ui/input";
import { Edit, Trash2 } from "lucide-react";
import { useTasks } from "@/hooks/use-task";
import { Checkbox } from "@/components/ui/checkbox";

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
					<div className={`font-medium text-${color}-800 text-sm`}>
						{task.title}
					</div>
					<div
						className={`flex items-center gap-2 text-xs text-${color}-600`}
					>
						<span>{task.subject}</span>
						{type !== "overdue" && (
							<Badge variant="outline" className="text-xs">
								{type === "daily"
									? task.repeatFrequency === "daily"
										? "Hàng ngày"
										: task.repeatFrequency === "weekly"
										? "Hàng tuần"
										: "Thứ 2-6"
									: ""}
								{type === "deadline" && "Deadline"}
							</Badge>
						)}
					</div>
					{task.description && (
						<p className={`text-xs text-${color}-600 mt-1 italic`}>
							{task.description}
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
						onClick={() => deleteTask(task._id)}
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>
			</div>
			<div className="space-y-2">
				<div
					className={`flex gap-3 items-center justify-between text-xs text-${color}-600`}
				>
					<Progress
						value={(task.progress / task.target) * 100}
						className={`h-2 bg-${color}-200`}
						indicatorColor={`bg-${color}-600`}
					/>

					<span className="w-fit text-right text-wrap min-w-20">
						{task.progress}/{task.target} hours
					</span>
				</div>
			</div>
			<div className="flex justify-between items-center text-xs">
				{task.frequencyType === "deadline" && (
					<div
						className={`flex justify-between items-center text-xs text-${color}-600`}
					>
						Deadline: {task.deadline}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProgressPattern;
