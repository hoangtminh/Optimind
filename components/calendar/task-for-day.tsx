"use client";

import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import TaskListCard from "./task-list-card";
import { Task } from "@/lib/type/tasks-type";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface Props {
	selectedDateString: Date | undefined;
	tasksForSelectedDay: Task[];
	taskDetail: Task | null;
	setTaskDetail: (t: Task | null) => void;
}

const TasksForDay: FC<Props> = ({
	selectedDateString,
	tasksForSelectedDay,
	taskDetail,
	setTaskDetail,
}) => {
	return (
		<div className="flex-[0.45] p-4 flex flex-col">
			<h2 className="text-xl font-bold mb-3">
				{selectedDateString
					? new Date(selectedDateString).toLocaleDateString("vi-VN", {
							dateStyle: "full",
					  })
					: "Vui lòng chọn một ngày"}
			</h2>
			<div className="relative mb-4">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
					size={18}
				/>
				<Input
					placeholder="Tìm kiếm công việc..."
					className="bg-white/10 border-none pl-10 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-white/80"
				/>
			</div>
			<ScrollArea className="flex-1 -mr-4 pr-4">
				<div className="space-y-3 px-1">
					{tasksForSelectedDay?.length > 0 ? (
						tasksForSelectedDay.map((task) => (
							<TaskListCard
								key={task.id}
								task={task}
								taskDetail={taskDetail}
								onTaskClick={(t) => {
									setTaskDetail(t);
								}}
							/>
						))
					) : (
						<div className="h-full flex items-center justify-center text-white/50 pt-10">
							<p>Không có công việc nào trong ngày này.</p>
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
};

export default React.memo(TasksForDay);
