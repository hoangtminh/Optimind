import React from "react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useTasks } from "@/hooks/use-task";

const TaskProgressPattern = ({ task, color, type }) => {
	const { setEditingTask, deleteTask } = useTasks();

	const editable = type !== "overdue";

	return (
		<div
			key={task.id}
			className={`p-3 bg-white/60 rounded-lg border border-${color}-200`}
		>
			<div className="flex flex-row justify-between items-start">
				<div className={`font-medium text-${color}-800 text-base mb-2`}>
					{task.title}
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
			<div className="flex items-start justify-between">
				<div className="w-full flex justify-between">
					<div>
						<div
							className={`w-fit text-right text-wrap text-sm text-${color}-600 min-w-20`}
						>
							Mục tiêu: {task.target}
						</div>
					</div>
					{task.frequencyType === "repeat" ? (
						<div
							className={`flex flex-wrap items-start justify-end gap-2 text-${color}-600`}
						>
							{task.frequency.map((day, index) => (
								<Badge variant={`ghost`} key={index}>
									{day}
								</Badge>
							))}
						</div>
					) : (
						<div
							className={`flex text-wrap text-right text-${color}-600 text-sm min-w-30`}
						>
							Hạn: {task.deadline.slice(0, 10)}
						</div>
					)}
				</div>
			</div>
			<div className="space-y-2">
				<div
					className={`flex gap-3 items-center justify-between text-sm text-${color}-600`}
				>
					{task.description && (
						<p className={`text-xs text-${color}-600 mt-1 italic`}>
							Ghi chú: {task.description}
						</p>
					)}
					<div className={`flex m-0 flex-row gap-2 items-center`}>
						{task.complete ? (
							<Badge className="bg-green-100 text-green-800 text-xs">
								Hoàn thành
							</Badge>
						) : (
							<Badge
								className={`bg-${color}-100 text-${color}-800 text-xs`}
							>
								Chưa hoàn thành
							</Badge>
						)}
					</div>
				</div>

				<div className="flex justify-between items-center text-xs">
					{task.frequencyType === "deadline" &&
						type !== "overdue" && (
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

export default TaskProgressPattern;
