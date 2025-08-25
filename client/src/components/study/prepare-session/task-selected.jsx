import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import React from "react";

const TasksSelected = ({
	getFilteredTasks,
	toggleTaskSelection,
	selectedTasks,
}) => {
	const getColor = (task) => (task.taskType === "daily" ? "cyan" : "purple");

	return (
		<div className="p-2 space-y-2">
			{getFilteredTasks().map((task) => {
				const isSelected = selectedTasks.find((t) => t.id === task.id);
				const color = getColor(task);
				return (
					<div
						key={task.id}
						onClick={() => toggleTaskSelection(task)}
						className={`flex items-center justify-between border-2 rounded-md cursor-pointer ${
							isSelected && "bg-blue-100 border border-blue-300"
						}`}
					>
						<div
							className={`flex flex-1 w-full h-full p-3 items-center gap-2 rounded-sm bg-${color}-50`}
						>
							<div className="flex-shrink-0">
								{isSelected ? (
									<div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
										<Check className="h-3 w-3 text-white" />
									</div>
								) : (
									<div className="w-4 h-4 border-2	 border-gray-300 rounded-sm" />
								)}
							</div>
							<div className="flex flex-row w-full justify-between">
								<div>
									<div
										className={`text-sm font-medium text-${color}-700`}
									>
										{task.title}
									</div>
									<div
										className={`text-xs font-medium text-${color}-700`}
									>
										Hạn:{" "}
										{task.taskType === "long-term"
											? `${task.deadline}`
											: "Hôm nay"}
									</div>
								</div>
								<div className="flex h-fit gap-1">
									<Badge
										variant="outline"
										className="text-xs"
									>
										{task.subject}
									</Badge>
									<Badge
										className={`text-xs text-${color}-700 border-${color}-300`}
										variant="outline"
									>
										{task.taskType === "daily"
											? "Hàng ngày"
											: "Dài hạn"}
									</Badge>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TasksSelected;
