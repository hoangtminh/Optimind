// Tên file: app/tasks/components/SubtaskItem.tsx
"use client";

import React, { FC } from "react";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Subtask, Task } from "@/lib/type/tasks-type";
import { useTask } from "@/hooks/useTask";

interface SubtaskItemProps {
	task: Task;
	subtask: Subtask;
}

export const SubtaskItem: FC<SubtaskItemProps> = ({ task, subtask }) => {
	const { handleToggleSubtask, handleDeleteSubtask } = useTask();

	return (
		<div
			className="flex items-center gap-2 group/sub p-1 rounded hover:bg-white/5 transition-colors"
			onClick={(e) => e.stopPropagation()}
		>
			<Checkbox
				checked={subtask.isCompleted}
				onCheckedChange={() => handleToggleSubtask(task.id, subtask.id)}
				className="h-3.5 w-3.5 border-white/30"
			/>
			<span
				className={cn(
					"text-xs flex-1 truncate",
					subtask.isCompleted
						? "line-through text-gray-500"
						: "text-gray-200"
				)}
			>
				{subtask.title}
			</span>
			<button
				onClick={() => handleDeleteSubtask(task.id, subtask.id)}
				className="opacity-0 group-hover/sub:opacity-100 text-gray-500 hover:text-red-400"
			>
				<X size={12} />
			</button>
		</div>
	);
};
