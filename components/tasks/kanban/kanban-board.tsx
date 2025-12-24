// Tên file: components/tasks/KanbanBoard.tsx

import React, { FC } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	closestCorners,
} from "@dnd-kit/core";
import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import KanbanColumn from "@/components/tasks/kanban/kanban-column";
import TaskCard from "@/components/tasks/kanban/task-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTask } from "@/hooks/useTask";
import { mockColumns } from "@/lib/type/tasks-type";

const KanbanBoard: FC = () => {
	const {
		columns,
		groupTasks,
		activeColumn,
		activeTask,
		onDragStart,
		onDragEnd,
		onDragOver,
		handleAddColumn,
		handleDeleteColumn,
		handleEditColumn,
	} = useTask();

	// DND Sensors - Optimized for smooth dragging
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		})
	);

	const columnsId = mockColumns.map((col) => col.id);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragOver={onDragOver}
		>
			<ScrollArea className="flex-1 w-full">
				<div className="flex gap-4 p-4 h-full min-h-[calc(100vh-140px)]">
					<SortableContext
						items={columnsId}
						strategy={horizontalListSortingStrategy}
					>
						{columns.map((col) => (
							<KanbanColumn
								key={col.id}
								column={col}
								tasks={groupTasks[col.id] || []}
							/>
						))}
					</SortableContext>

					{/* Add New Column Button */}
					<Button
						variant="outline"
						className="h-full w-80 shrink-0 bg-white/10 border-white/20 hover:bg-white/20 text-white self-start"
						onClick={handleAddColumn}
					>
						<Plus size={18} className="mr-2" /> Thêm cột mới
					</Button>
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			{/* Drag Overlay */}
			<DragOverlay>
				{activeColumn && (
					<KanbanColumn
						column={activeColumn}
						tasks={groupTasks[activeColumn.id] || []}
					/>
				)}
				{activeTask && <TaskCard task={activeTask} isOverlay />}
			</DragOverlay>
		</DndContext>
	);
};

export default KanbanBoard;
