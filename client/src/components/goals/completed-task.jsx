import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Award } from "lucide-react";
import { useTasks } from "@/hooks/use-task";

const CompletedTasks = () => {
	const { tasks } = useTasks();
	const completedTasks = tasks.filter((task) => task.complete);

	return (
		<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-green-800">
					<Award className="h-5 w-5" />
					Đã hoàn thành ({completedTasks.length})
				</CardTitle>
				<CardDescription className="text-green-600">
					Tasks đã hoàn thành thành công
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				{completedTasks.map((task) => (
					<div
						key={task.id}
						className="p-3 bg-white/60 rounded-lg border border-green-200"
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Award className="h-4 w-4 text-green-600" />
								<div>
									<p className="font-medium text-green-800 text-sm">
										{task.title}
									</p>
									<div className="flex items-center gap-2 text-xs text-green-600">
										<Badge
											variant="outline"
											className="text-xs"
										>
											{task.frequencyType === "repeat"
												? "Hàng ngày"
												: "Dài hạn"}
										</Badge>
									</div>
									{task.description && (
										<p className="text-xs text-green-600 mt-1 italic">
											{task.description}
										</p>
									)}
								</div>
							</div>
							<div className="text-right space-y-2">
								<Badge className="bg-green-100 text-green-800 text-xs">
									Hoàn thành
								</Badge>
								<p className="text-xs font-medium text-green-700">
									{task.taskType === "study"
										? `${task.progress}/${task.target}`
										: task.target}
								</p>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default CompletedTasks;
