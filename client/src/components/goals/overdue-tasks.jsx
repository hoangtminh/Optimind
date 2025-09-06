"use client";

import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useTasks } from "@/hooks/use-task";
import TaskProgressPattern from "./pattern/task-progress-pattern";
import { getDaysLeft } from "@/lib/utils";

const OverdueTasks = () => {
	const { tasks } = useTasks();
	const [overdueTasksPage, setOverdueTasksPage] = useState(0);

	const overdueDeadlineTasks = tasks.filter(
		(task) =>
			task.frequencyType === "deadline" &&
			getDaysLeft(task.deadline) < 0 &&
			!task.complete
	);

	const overdueTasksPerPage = 4;
	const totalOverduePages = Math.ceil(
		overdueDeadlineTasks.length / overdueTasksPerPage
	);

	const paginatedOverdueTasks = overdueDeadlineTasks.slice(
		overdueTasksPage * overdueTasksPerPage,
		(overdueTasksPage + 1) * overdueTasksPerPage
	);

	return (
		<Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
			<CardHeader className={"flex flex-row justify-between"}>
				<div>
					<CardTitle className="flex items-center gap-2 text-red-800">
						<AlertTriangle className="h-5 w-5" />
						Tasks quá hạn ({overdueDeadlineTasks.length})
					</CardTitle>
					<CardDescription className="text-red-600">
						Chỉ hiển thị tasks dài hạn cần ưu tiên xử lý
					</CardDescription>
				</div>
				{totalOverduePages > 1 && (
					<div className="flex gap-2 justify-between items-center border-red-200">
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								setOverdueTasksPage(
									Math.max(0, overdueTasksPage - 1)
								)
							}
							disabled={overdueTasksPage === 0}
							className="text-red-600 hover:bg-red-100"
						>
							<ChevronLeft className="h-4 w-4 mr-1" />
							Trước
						</Button>
						<span className="text-sm text-red-600">
							Trang {overdueTasksPage + 1} / {totalOverduePages}
						</span>
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								setOverdueTasksPage(
									Math.min(
										totalOverduePages - 1,
										overdueTasksPage + 1
									)
								)
							}
							disabled={
								overdueTasksPage === totalOverduePages - 1
							}
							className="text-red-600 hover:bg-red-100"
						>
							Sau
							<ChevronRight className="h-4 w-4 ml-1" />
						</Button>
					</div>
				)}
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
					{paginatedOverdueTasks.map((task) => (
						<TaskProgressPattern
							task={task}
							color={"red"}
							type={"overdue"}
							key={task._id}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default OverdueTasks;
