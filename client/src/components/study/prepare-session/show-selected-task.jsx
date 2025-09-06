import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const ShowSelectedTask = ({ selectedTasks }) => {
	const getColor = (task) =>
		task.frequencyType === "daily" ? "cyan" : "purple";

	return (
		<div className="mt-3 px-4 py-2 bg-white  shadow-md rounded-lg border border-green-300">
			<div className="text-md text-slate-900 mb-2">Các task đã chọn:</div>
			<ScrollArea className={`max-h-60 overflow-y-auto`}>
				<div className="flex flex-col gap-2">
					{selectedTasks.map((task) => {
						const color = getColor(task);
						return (
							<div
								key={task._id}
								className={`flex p-3 justify-between bg-${color}-50 border-2 border-${color}-300 rounded-md`}
							>
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
										{task.frequencyType === "daily"
											? "Hôm nay"
											: `${task.deadline.slice(0, 10)}`}
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
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default ShowSelectedTask;
