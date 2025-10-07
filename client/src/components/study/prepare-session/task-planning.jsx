"use client";

import { useTasks } from "@/hooks/use-task";
import AddTask from "@/components/goals/task/add-tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import ShowSelectedTask from "./show-selected-task";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useStudy } from "@/hooks/use-study-session";
import { Badge } from "@/components/ui/badge";

const TaskPlanning = () => {
	const { tasks, setAddTaskDialogOpen } = useTasks();
	const { sessionTasks, setSessionTasks } = useStudy();

	const filteredTasks = tasks.filter((task) => !task.complete);

	const isTaskSelected = (task) => {
		return sessionTasks.find((t) => t._id === task._id);
	};

	const toggleTaskSelection = (task) => {
		setSessionTasks((prev) => {
			if (isTaskSelected(task)) {
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
				case "title":
					return a.title.localeCompare(b.title);
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
						<SelectItem value="title">Tên</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-4">
				<div className="flex flex-row p-2 gap-3 bg-white shadow-md rounded-lg border border-green-300">
					<ScrollArea className="flex flex-col gap-2 h-[100%] max-h-80 px-1 w-full rounded-md overflow-y-auto ">
						{getFilteredTasks().map((task) => (
							<div
								key={task._id}
								className={`p-3 rounded-lg ${
									isTaskSelected(task)
										? "bg-cyan-200/30 border-2 border-cyan-400"
										: "bg-white/60 border border-cyan-200 "
								}`}
								onClick={() => toggleTaskSelection(task)}
							>
								<div className="flex flex-row justify-between items-start">
									<div
										className={`font-medium text-cyan-800 text-base mb-1`}
									>
										{task.title}
									</div>
									<div
										className={`flex m-0 flex-row gap-2 items-center`}
									>
										{task.complete ? (
											<Badge className="bg-green-100 text-green-800 text-xs">
												Hoàn thành
											</Badge>
										) : (
											<Badge
												className={`bg-cyan-100 text-cyan-800 text-xs`}
											>
												Chưa hoàn thành
											</Badge>
										)}
									</div>
								</div>
								<div className="flex items-start justify-between">
									<div className="w-full flex justify-between">
										<div>
											<div
												className={`w-fit text-right text-wrap text-sm text-cyan-600 min-w-20`}
											>
												Mục tiêu: {task.target}
											</div>
										</div>
									</div>
									{task.frequencyType === "repeat" ? (
										<div
											className={`flex flex-nowrap min-w-30 items-start justify-end gap-2 text-cyan-600`}
										>
											{task.frequency.map(
												(day, index) => (
													<Badge
														variant={`ghost`}
														key={index}
													>
														{day}
													</Badge>
												)
											)}
										</div>
									) : (
										<div
											className={`flex text-no-wrap text-right text-cyan-600 text-sm min-w-30`}
										>
											Hạn: {task.deadline.slice(0, 10)}
										</div>
									)}
								</div>
								<div className="space-y-2">
									<div
										className={`flex gap-3 items-center justify-between text-sm text-cyan-600`}
									>
										{task.description && (
											<p
												className={`text-xs text-cyan-600 mt-1 italic`}
											>
												Ghi chú: {task.description}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
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

			{/* Show selected Task
			{sessionTasks.length > 0 && (
				<ShowSelectedTask sessionTasks={sessionTasks} />
			)} */}
		</div>
	);
};

export default TaskPlanning;
