import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStudy } from "@/hooks/use-study-session";
import { Check, CheckCircle2, Circle } from "lucide-react";
import React from "react";

const TaskList = () => {
	const { sessionTasks, setSessionTasks } = useStudy();

	const toggleTask = (taskId) => {
		setSessionTasks((prev) =>
			prev.map((task) =>
				task._id === taskId
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	return (
		<div>
			<div className="space-y-4">
				<div className="font-medium text-gray-700 capitalize mb-2">
					Các nhiệm vụ trong phiên học
				</div>
				{sessionTasks.map((task) => (
					<div
						key={task._id}
						className={`p-4 border rounded-lg shadow-lg transition-all ${
							task.completed
								? "bg-green-200/30 border-2 border-green-400"
								: "bg-background border border-cyan-500/70"
						}`}
					>
						<div className="flex items-start gap-3">
							<Button
								variant="outline"
								size="sm"
								className={`mt-1 h-6 w-6 p-0 ${
									task.completed
										? "bg-green-100 border-green-300"
										: ""
								}`}
								onClick={() => toggleTask(task._id)}
							>
								{task.completed && (
									<Check className="h-3 w-3 text-green-600" />
								)}
							</Button>
							<div className="flex-1 space-y-2">
								<div className="flex items-center gap-2">
									<h4
										className={`font-medium text-cyan-700 mr-4 ${
											task.completed
												? "line-through text-green-700"
												: ""
										}`}
									>
										{task.title}
									</h4>
									<div className="flex flex-wrap gap-1 justify-end">
										{task.subject.map((subject) => (
											<Badge
												variant="ghost"
												className={`text-xs ${
													task.completed
														? "line-through text-green-700 border-green-500"
														: "text-cyan-700 border-cyan-500"
												}`}
											>
												{subject}
											</Badge>
										))}
									</div>
								</div>
								<p
									className={`text-sm  ${
										task.complete
											? "line-through text-green-700"
											: "text-cyan-700/70"
									}`}
								>
									{task.description}
								</p>
								<p className="text-xs font-medium text-blue-600">
									Mục tiêu: {task.target}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TaskList;
