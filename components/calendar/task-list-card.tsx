"use client";

import React, { FC, useMemo } from "react";
import { Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/lib/type/tasks-type";
import { Checkbox } from "../ui/checkbox";
import { useTask } from "@/hooks/useTask";
import { updateTaskStatus } from "@/supabase/actions/task";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
	task: Task;
	onTaskClick?: (task: Task) => void;
	taskDetail: Task | null;
}

const TaskListCard: FC<Props> = ({ task, onTaskClick, taskDetail }) => {
	const { allTasks, setAllTasks, setIsDetailSheetOpen, setSelectedTask } =
		useTask();
	const getPriorityColor = (p: string) => {
		switch (p) {
			case "high":
				return "text-red-400 border-red-400 bg-red-400/10";
			case "low":
				return "text-green-400 border-green-400 bg-green-400/10";
			default:
				return "text-yellow-400 border-yellow-400 bg-yellow-400/10";
		}
	};

	const handleToggleTask = async (taskId: string) => {
		const task = allTasks.find((t) => t.id === taskId);
		if (!task) return;

		const newCompletedState = !task.is_completed;
		const newStatus = newCompletedState ? "complete" : "todo";

		const { error, message } = await updateTaskStatus(taskId, newStatus);
		if (error) {
			toast.error("Failed to update task");
		} else {
			setAllTasks(
				allTasks.map((t: Task) =>
					t.id === taskId ? (message as Task) : t
				)
			);
			toast.success("Task updated");
		}
	};

	const is_overdue = useMemo(() => {
		return (
			task?.due_date !== null &&
			new Date(task?.due_date as string).getTime() < Date.now()
		);
	}, [task]);

	return (
		<div
			onClick={() => {
				if (task.due_date) onTaskClick?.(task);
			}}
			className={cn(
				"w-full text-left my-2 p-4 rounded-lg flex gap-2 items-center transition-colors hover:bg-black/10 bg-black/30 border border-transparent hover:border-white/20",
				taskDetail?.id === task.id
					? "bg-black/10 ring-1 ring-white/30"
					: "",
				task.is_completed && "opacity-50",
				is_overdue && "bg-red-900/20 ring-1 ring-red-400"
			)}
		>
			<div onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={task.is_completed as boolean}
					onCheckedChange={() => handleToggleTask(task.id)}
					className="border-white/50 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
				/>
			</div>
			<div className="flex-1">
				<p
					className={cn(
						"font-semibold",
						task.is_completed && "line-through",
						is_overdue && "text-red-400"
					)}
				>
					{task.title}
				</p>
				<div className={cn("flex items-center gap-2 mt-0.5")}>
					<span
						className={cn(
							"text-xs",
							is_overdue ? "text-red-400" : "text-white/70"
						)}
					>
						{task.due_date?.slice(0, 10)}
					</span>
					<span
						className={cn(
							"text-[10px] px-1.5 py-0.5 rounded border uppercase",
							getPriorityColor(task.priority as string)
						)}
					>
						{task.priority}
					</span>
				</div>
			</div>
			<Button
				variant="ghost"
				size="icon"
				className="h-6 w-6 text-gray-300 hover:text-white shrink-0"
				onClick={(e) => {
					// Ngăn sự kiện kéo thả bắt sự kiện click nút
					e.stopPropagation();
					setIsDetailSheetOpen(true);
					setSelectedTask(task);
				}}
			>
				<MoreVertical size={16} />
			</Button>
		</div>
	);
};

export default React.memo(TaskListCard);
