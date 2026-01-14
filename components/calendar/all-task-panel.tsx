"use client";

import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskListCard from "./task-list-card";
import { Task } from "@/lib/type/tasks-type";

import { useTask } from "@/hooks/useTask";
import TaskDetail from "./task-detail";

interface Props {
	tasks: Task[];
	onTaskClick: (task: Task) => void;
	taskDetail: Task | null;
	setTaskDetail: (task: Task | null) => void;
	handleToggleTask: (taskId: string) => void;
}

const AllTasksPanel: FC<Props> = ({
	tasks,
	onTaskClick,
	taskDetail,
	setTaskDetail,
	handleToggleTask,
}) => {
	return (
		<div className="flex-[0.30] grid p-4">
			{taskDetail ? (
				<TaskDetail
					taskDetail={taskDetail}
					setTaskDetail={setTaskDetail}
					handleToggleTask={handleToggleTask}
				/>
			) : (
				<div className="grid w-full overflow-hidden">
					<h2 className="text-xl font-bold mb-3">
						Tất cả Công việc ({tasks.length})
					</h2>
					<ScrollArea className="flex flex-col  gap-3 -mr-4 pr-4 overflow-hidden border-b">
						<div className="space-y-3 px-1">
							{tasks.length > 0 ? (
								tasks.map((task) => (
									<TaskListCard
										key={task.id}
										task={task}
										onTaskClick={onTaskClick}
										taskDetail={taskDetail}
									/>
								))
							) : (
								<div className="h-full flex items-center justify-center text-white/50 pt-10">
									<p>Không có Task nào trong hệ thống.</p>
								</div>
							)}
						</div>
					</ScrollArea>
				</div>
			)}
		</div>
	);
};

export default React.memo(AllTasksPanel);
