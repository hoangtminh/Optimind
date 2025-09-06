import { useStudy } from "@/hooks/use-study-session";
import { CheckCircle2, Circle } from "lucide-react";
import React from "react";

const TaskList = () => {
	const { sessionData, selectedTasks, setSelectedTasks } = useStudy();

	const toggleTask = (taskId) => {
		setSelectedTasks((prev) =>
			prev.map((task) =>
				task.id === taskId
					? { ...task, completed: !task.completed }
					: task
			)
		);
	};

	return (
		<div>
			<div>
				<h4 className="font-medium text-gray-700 mb-3">Nhiệm vụ:</h4>
				{selectedTasks.length > 0 ? (
					<div className="space-y-2">
						{selectedTasks.map((task) => (
							<div
								key={task.id}
								className="flex items-center gap-2"
							>
								<button
									onClick={() => toggleTask(task.id)}
									className="flex-shrink-0"
								>
									{task.completed ? (
										<CheckCircle2 className="h-5 w-5 text-green-600" />
									) : (
										<Circle className="h-5 w-5 text-gray-400" />
									)}
								</button>
								<span
									className={`${
										task.completed
											? "line-through text-gray-500"
											: "text-gray-900"
									}`}
								>
									{task.title}
								</span>
							</div>
						))}
					</div>
				) : (
					"Khong co nhiem vu"
				)}
			</div>
		</div>
	);
};

export default TaskList;
