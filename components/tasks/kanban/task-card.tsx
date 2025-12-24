"use client";

import React, { FC, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
	CalendarDays,
	ChevronDown,
	ChevronRight,
	MoreVertical,
} from "lucide-react"; // ĐÃ XÓA: GripVertical
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, Priority } from "@/lib/type/tasks-type";
import { SubtaskItem } from "../subtask-item";
import { useTask } from "@/hooks/useTask";

// --- Props ---
interface TaskCardProps {
	task: Task;
	isOverlay?: boolean;
}

const TaskCard: FC<TaskCardProps> = ({ task, isOverlay = false }) => {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
	});

	const { setIsDetailSheetOpen, setSelectedTask } = useTask();

	const [showSubtasks, setShowSubtasks] = useState(false);

	const style = {
		transition:
			transition || "transform 200ms cubic-bezier(0.25, 1, 0.5, 1)",
		transform: CSS.Transform.toString(transform),
	};
	const priorityColors = {
		high: "bg-red-500",
		medium: "bg-yellow-500",
		low: "bg-green-500",
	};

	// Bổ sung Subtask
	const completedCount = 0;
	const totalCount = 0;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				"bg-black/40 p-3 rounded-lg shadow-md flex gap-2 cursor-grab active:cursor-grabbing",
				isOverlay && "opacity-80 shadow-2xl scale-105",
				isDragging && "opacity-20"
			)}
		>
			{/* Thanh Priority (ĐÃ XÓA Drag Handle) */}
			<div className="flex flex-col items-center">
				<div
					className={cn(
						"w-1.5 h-full rounded-full shrink-0", // Dùng h-full để cân đối
						priorityColors[task.priority as Priority]
					)}
				/>
			</div>

			<div className="flex-1 space-y-2">
				{/* Title and Detail Button */}
				<div className="flex justify-between items-start">
					<p className="font-semibold text-white wrap-break-word max-w-[85%]">
						{task.title}
					</p>
					{totalCount > 0 && (
						<Badge
							variant="outline"
							className="text-[10px] bg-white/5 border-white/10 text-gray-300 px-1.5"
						>
							{completedCount}/{totalCount}
						</Badge>
					)}
					{/* Detail Button (3 dots) */}
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

				{/* Description */}
				{task.note && (
					<p className="text-sm text-gray-300">{task.note}</p>
				)}

				{/* Due Date */}
				{task.due_date && (
					<div
						className={cn(
							"flex items-center gap-2 text-sm",
							task.status !== "complete" &&
								new Date(task.due_date) < new Date()
								? "text-red-400"
								: "text-gray-300"
						)}
					>
						<CalendarDays className="w-4 h-4" />
						<span>{format(task.due_date, "dd/MM/yyyy")}</span>
					</div>
				)}

				{/* Tags */}
				{task.tag && task.tag.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{task.tag.map((t) => (
							<Badge
								key={t}
								variant="secondary"
								className="text-xs bg-white/20 text-white"
							>
								{t}
							</Badge>
						))}
					</div>
				)}
				{totalCount > 0 && (
					<div className="mt-1 border-t border-white/5 pt-2">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setShowSubtasks(!showSubtasks);
							}}
							className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white"
						>
							{showSubtasks ? (
								<ChevronDown size={12} />
							) : (
								<ChevronRight size={12} />
							)}
							{showSubtasks ? "Ẩn việc phụ" : "Xem việc phụ"}
						</button>

						{/* {showSubtasks && (
							<div className="mt-2 space-y-1">
								{task.subtasks.map((st) => (
									<SubtaskItem
										key={st.id}
										task={task}
										subtask={st}
									/>
								))}
							</div>
						)} */}
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskCard;
