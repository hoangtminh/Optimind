// Tên file: components/optimind/KanbanColumn.tsx
"use client";

import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./task-card";

export function KanbanColumn({ id, title, tasks }) {
	const { setNodeRef } = useDroppable({ id });

	// Lấy ID của các task trong cột này
	const taskIds = tasks.map((task) => task.id);

	return (
		// SortableContext cho phép các task bên trong nó được sắp xếp
		<SortableContext
			id={id}
			items={taskIds}
			strategy={verticalListSortingStrategy}
		>
			<div
				ref={setNodeRef} // Đây là khu vực có thể thả task vào
				className="w-72 shrink-0 bg-black/20 rounded-lg flex flex-col"
			>
				{/* Tiêu đề cột */}
				<h3 className="p-4 font-bold text-lg border-b border-white/20">
					{title} ({tasks.length})
				</h3>

				{/* Danh sách task (scrollable) */}
				<div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto">
					{tasks.length > 0 ? (
						tasks.map((task) => (
							<TaskCard key={task.id} task={task} />
						))
					) : (
						<div className="p-4 text-center text-sm text-white/50">
							Không có task
						</div>
					)}
				</div>
			</div>
		</SortableContext>
	);
}
