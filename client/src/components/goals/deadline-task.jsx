import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { TrendingUp } from "lucide-react";

import { useTasks } from "@/hooks/use-task";
import TaskProgressPattern from "./pattern/task-progress-pattern";
import StudyProgressPattern from "./pattern/study-progress-pattern";

const LongtermTask = () => {
	const { tasks } = useTasks();
	const activeLongTermTasks = tasks.filter(
		(task) => task.frequencyType === "deadline"
	);

	return (
		<Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-purple-800">
					<TrendingUp className="h-5 w-5" />
					Tasks dài hạn ({activeLongTermTasks.length})
				</CardTitle>
				<CardDescription className="text-purple-600">
					Nhiệm vụ dài hạn đang thực hiện
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{activeLongTermTasks.map((task) => {
					if (task.taskType === "study")
						return (
							<StudyProgressPattern
								task={task}
								color="purple"
								key={task._id}
								type={"daily"}
							/>
						);
					return (
						<TaskProgressPattern
							task={task}
							color="purple"
							key={task._id}
							type={"daily"}
						/>
					);
				})}
			</CardContent>
		</Card>
	);
};

export default LongtermTask;
