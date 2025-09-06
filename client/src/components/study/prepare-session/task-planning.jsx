"use client";

import { useTasks } from "@/hooks/use-task";
import AddTask from "@/components/goals/add-tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import TasksSelected from "./task-selected";
import ShowSelectedTask from "./show-selected-task";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useStudy } from "@/hooks/use-study-session";

const TaskPlanning = () => {
	const { tasks, setAddTaskDialogOpen } = useTasks();
	const { selectedTasks, setSelectedTasks } = useStudy();

	const filteredTasks = tasks.filter((task) => !task.complete);

	const toggleTaskSelection = (task) => {
		console.log(task);
		setSelectedTasks((prev) => {
			const isSelected = prev.find((t) => t._id === task._id);
			if (isSelected) {
				return prev.filter((t) => t._id !== task._id);
			} else {
				return [...prev, task];
			}
		});
	};

	// Task sorting
	const [taskSearch, setTaskSearch] = useState("");
	const [taskSort, setTaskSort] = useState("name");

	const getFilteredTasks = () => {
		const filtered = filteredTasks.filter((task) => {
			const matchesSearch = task.title
				.toLowerCase()
				.includes(taskSearch.toLowerCase());

			return matchesSearch;
		});
		// Sort the filtered tasks
		return filtered.sort((a, b) => {
			switch (taskSort) {
				case "deadline":
					if (!a.deadline && !b.deadline) return 0;
					if (!a.deadline) return 1;
					if (!b.deadline) return -1;
					return new Date(a.deadline) - new Date(b.deadline);
				case "subject":
					return a.subject.localeCompare(b.subject);
				case "taskType":
					return a.type.localeCompare(b.type);
				default:
					return 0;
			}
		});
	};

	return (
		<div>
			<Label className="text-md font-medium mb-3">
				Nhiệm vụ trong phiên học
			</Label>
			<div className="flex flex-row gap-3 mb-3">
				<Input
					placeholder="Tìm kiếm nhiệm vụ theo tên..."
					value={taskSearch}
					onChange={(e) => setTaskSearch(e.target.value)}
					className="text-sm shadow-md border-green-300"
				/>
				<Select value={taskSort} onValueChange={setTaskSort}>
					<SelectTrigger className="text-sm bg-white w-45 shadow-md border-green-300">
						<SelectValue placeholder="Sắp xếp" />
					</SelectTrigger>
					<SelectContent className="shadow-md border-green-300">
						<SelectItem value="none">Không sắp xếp</SelectItem>
						<SelectItem value="deadline">Hạn chót</SelectItem>
						<SelectItem value="subject">Môn học</SelectItem>
						<SelectItem value="taskType">Loại nhiệm vụ</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-4">
				<div className="flex flex-row p-2 gap-3 bg-white shadow-md rounded-lg border border-green-300">
					<ScrollArea className="h-[100%] max-h-60	 px-1 w-full rounded-md overflow-y-auto ">
						<TasksSelected
							toggleTaskSelection={toggleTaskSelection}
							getFilteredTasks={getFilteredTasks}
							selectedTasks={selectedTasks}
						/>
					</ScrollArea>

					<Button
						onClick={() => {
							setAddTaskDialogOpen(true);
						}}
						size="sm"
						className={"w-10 h-10 bg-blue-500 hover:bg-blue-700"}
					>
						<Plus className="h-6 w-6" />
					</Button>
					<AddTask />
				</div>
			</div>

			{/* Show selected Task */}
			{selectedTasks.length > 0 && (
				<ShowSelectedTask selectedTasks={selectedTasks} />
			)}
		</div>
	);
};

export default TaskPlanning;
