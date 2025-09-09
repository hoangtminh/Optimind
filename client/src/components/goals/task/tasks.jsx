import { useTasks } from "@/hooks/use-task";
import React, { useState } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

import TaskProgressPattern from "../pattern/task-progress-pattern";
import { Button } from "../../ui/button";

const DailyTasks = () => {
	const { tasks } = useTasks();
	const [taskPage, setTaskPage] = useState(0);
	const paginatedTasks = tasks.slice(taskPage * 4, (taskPage + 1) * 4);

	return (
		<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
			<CardHeader className={`flex flex-row justify-between`}>
				<div>
					<CardTitle className="flex items-center gap-2 text-cyan-800">
						<Calendar className="h-5 w-5" />
						Task học tập ({tasks.length})
					</CardTitle>
					<CardDescription className="text-cyan-600">
						Nhiệm vụ đang thực hiện
					</CardDescription>
				</div>
				<div className="flex justify-between items-center">
					<span className="pl-1 text-sm text-slate-700">
						{taskPage * 4 + 1}-
						{Math.min((taskPage + 1) * 4, tasks.length)} của{" "}
						{tasks.length}
					</span>
					<div className="flex gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() =>
								setTaskPage(Math.max(0, taskPage - 1))
							}
							disabled={taskPage === 0}
							className={"hover:cursor-pointer hover:bg-cyan-300"}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setTaskPage(taskPage + 1)}
							disabled={(taskPage + 1) * 5 >= tasks.length}
							className={"hover:cursor-pointer hover:bg-cyan-300"}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				{paginatedTasks.map((task) => (
					<TaskProgressPattern
						task={task}
						color="cyan"
						key={task._id}
						type={"daily"}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default DailyTasks;
