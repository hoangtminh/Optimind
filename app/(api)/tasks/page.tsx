"use client";

import { useState } from "react";
import TaskDetailSheet from "@/components/tasks/task-details-sheet";
import { cn } from "@/lib/utils";
import TaskHeader from "@/components/tasks/task-header";
import KanbanBoard from "@/components/tasks/kanban/kanban-board";
import AddTaskModal from "@/components/tasks/add-tasks-modal";
import { useTask } from "@/hooks/useTask";
import { useProject } from "@/hooks/useProject";

const glassEffect =
	"bg-black/40 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

// --- Main Page Component ---
export default function TaskBoardPage() {
	const { selectedProjectId, projects } = useProject();

	return (
		<main className="h-screen w-screen text-white transition-all duration-500 overflow-hidden">
			<div className="relative w-full h-full">
				<div
					className={cn(
						"absolute top-16 bottom-4 left-22 right-22",
						"flex flex-col",
						glassEffect
					)}
				>
					{/* Header: Title and Add Button */}
					<TaskHeader />

					{/* Main Kanban Area */}
					{selectedProjectId ? (
						<KanbanBoard />
					) : (
						<div className="flex flex-col gap-2 w-full h-[80%] justify-center items-center">
							<div className="text-3xl font-bold text-muted/80">
								Select your project to view tasks
							</div>
							<div className="text-2xl text-muted/70">
								or create a new project
							</div>
							{/* {projects.map((prj) => (
								<div>
									<div>{prj.name}</div>
								</div>
							))} */}
						</div>
					)}
				</div>

				{/* Add Task Modal */}
				<AddTaskModal />

				{/* Task Detail Sheet/Dialog */}
				<TaskDetailSheet />
			</div>
		</main>
	);
}
