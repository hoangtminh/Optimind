import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Target } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useTasks } from "@/hooks/use-task";
import TaskProgressPattern from "../goals/pattern/task-progress-pattern";

const UpcomingTasks = () => {
	const { tasks } = useTasks();

	return (
		<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-cyan-800">
					<Target className="h-5 w-5" />
					Mục tiêu trong ngày
				</CardTitle>
				<CardDescription className="text-cyan-600">
					Theo dõi tiến độ các mục tiêu đã đặt
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{tasks.map((task, index) => (
					<TaskProgressPattern task={task} color={"cyan"} />
				))}
			</CardContent>
		</Card>
	);
};

export default UpcomingTasks;
