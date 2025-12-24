"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Trash2, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

// --- DND-Kit Imports ---
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Task } from "@/lib/type/tasks-type";
import TaskCard from "./task-card";
import { useTask } from "@/hooks/useTask";

// --- Props ---
interface KanbanColumnProps {
	column: Column;
	tasks: Task[];
}

const KanbanColumn: FC<KanbanColumnProps> = ({ column, tasks }) => {
	// DND-Kit for Column
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		},
	});

	const {
		handleEditColumn: onEditColumn,
		handleDeleteColumn: onDeleteColumn,
		setIsModalOpen,
	} = useTask();

	const style = {
		transition: transition,
		transform: CSS.Transform.toString(transform),
	};

	// State for editing the column title
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [newTitle, setNewTitle] = useState(column.title);

	const handleSaveTitle = () => {
		if (newTitle.trim() && newTitle !== column.title) {
			onEditColumn(column.id, newTitle.trim());
		}
		setIsEditingTitle(false);
	};

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		// Use a confirmation dialog/modal instead of window.confirm
		if (
			window.confirm(
				`Bạn có chắc chắn muốn xóa cột "${column.title}" (và chuyển các task về 'To Do') không?`
			)
		) {
			onDeleteColumn(column.id);
		}
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				"w-70 h-full flex flex-col shrink-0",
				isDragging && "opacity-50"
			)}
		>
			{/* Column Header */}
			<div
				{...attributes}
				{...listeners}
				className={cn(
					"shrink-0 p-4 rounded-t-lg flex justify-between items-center cursor-grab",
					"bg-black/20"
				)}
			>
				{/* Column Title / Edit Input */}
				{isEditingTitle ? (
					<Input
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						onBlur={handleSaveTitle}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSaveTitle();
							}
						}}
						autoFocus
						className="bg-white/10 border-white/30 text-white font-semibold text-base"
						onClick={(e) => e.stopPropagation()}
					/>
				) : (
					<h3 className="font-semibold text-white">
						{column.title} ({tasks.length})
					</h3>
				)}

				<div className="flex gap-2 items-center">
					{/* Column Options Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 text-gray-300 hover:text-white"
								onClick={(e) => e.stopPropagation()}
							>
								<MoreVertical size={16} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="bg-black/80 backdrop-blur-sm border-white/20 text-white">
							<DropdownMenuItem
								onClick={(e) => {
									e.stopPropagation();
									setIsEditingTitle(true);
								}}
								className="cursor-pointer"
							>
								<Edit className="mr-2 h-4 w-4" /> Đổi tên cột
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleDeleteClick}
								className="text-red-400 hover:bg-red-900/50 cursor-pointer"
								// Prevent deleting core columns (IDs used for logic)
								disabled={[
									"todo",
									"onProgress",
									"complete",
									"overdue",
								].includes(column.id)}
							>
								<Trash2 className="mr-2 h-4 w-4" /> Xóa cột
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Add Task Button */}
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-gray-300 hover:text-white"
						onClick={(e) => {
							e.stopPropagation();
							setIsModalOpen(true);
						}}
					>
						<Plus size={16} />
					</Button>
				</div>
			</div>

			{/* Column Content */}
			<ScrollArea className="flex-1 w-full bg-white/20 pb-2 rounded-b-md">
				<div className="flex flex-col gap-2 p-3 h-fit max-h-100">
					<SortableContext
						items={tasks.map((t) => t.id)}
						strategy={verticalListSortingStrategy}
					>
						<div className="flex flex-col gap-3">
							{tasks.map((task) => (
								<TaskCard key={task.id} task={task} />
							))}
						</div>
					</SortableContext>
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</div>
	);
};

export default KanbanColumn;
