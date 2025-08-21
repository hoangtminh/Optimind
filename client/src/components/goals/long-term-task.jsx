import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Edit, Trash2, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { useTasks } from "@/hooks/use-task";
import { Badge } from "../ui/badge";
import ProgressPattern from "../pattern/progress-pattern";

const LongtermTask = () => {
	const { tasks, updateProgress } = useTasks();
	const activeLongTermTasks = tasks.filter(
		(task) => task.status === "active" && task.taskType === "long-term"
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
				{activeLongTermTasks.map((task) => (
					<ProgressPattern
						task={task}
						color={"purple"}
						type={"long-term"}
						key={task.id}
					/>
				))}
			</CardContent>
		</Card>
	);
};

export default LongtermTask;
