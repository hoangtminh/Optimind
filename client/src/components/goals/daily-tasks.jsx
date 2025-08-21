import { useTasks } from "@/hooks/use-task";
import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Calendar } from "lucide-react";

import ProgressPattern from "../pattern/progress-pattern";

const DailyTasks = () => {
	const { tasks } = useTasks();

	const activeDailyTasks = tasks.filter(
		(task) => task.status === "active" && task.taskType === "daily"
	); // Split active tasks by type
	return (
		<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-cyan-800">
					<Calendar className="h-5 w-5" />
					Tasks hàng ngày ({activeDailyTasks.length})
				</CardTitle>
				<CardDescription className="text-cyan-600">
					Nhiệm vụ hàng ngày đang thực hiện
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{activeDailyTasks.map((task) => (
					<ProgressPattern
						task={task}
						color="cyan"
						key={task.id}
						type={"daily"}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default DailyTasks;
