"use client";

import { tasksData } from "@/data/tasks-data";
import { createContext, useContext, useState } from "react";

const TasksContext = createContext();

export function useTasks() {
	return useContext(TasksContext);
}

export function TasksProvider({ children }) {
	const [tasks, setTasks] = useState(tasksData);

	const [newTask, setNewTask] = useState({
		title: "",
		subject: "",
		type: "study",
		taskType: "daily",
		target: "",
		unit: "hours",
		deadline: "",
		repeatFrequency: "daily", // Added repeat frequency to new task form
		priority: "medium",
		notes: "", // Added notes to new task form
	});

	const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null); // Added editing task state

	const addTask = () => {
		if (newTask.title && newTask.subject && newTask.target) {
			const task = {
				id: tasks.length + 1,
				...newTask,
				target: Number.parseFloat(newTask.target),
				current: 0,
				status: "active",
			};
			setTasks([...tasks, task]);
			setNewTask({
				title: "",
				subject: "",
				type: "study",
				taskType: "daily",
				target: "",
				unit: "hours",
				deadline: "",
				repeatFrequency: "daily",
				priority: "medium",
				notes: "",
			});
			setAddTaskDialogOpen(false);
		}
	};

	const updateTask = () => {
		// Added update task function
		if (
			editingTask &&
			editingTask.title &&
			editingTask.subject &&
			editingTask.target
		) {
			setTasks(
				tasks.map((task) =>
					task.id === editingTask.id
						? {
								...editingTask,
								target: Number.parseFloat(editingTask.target),
						  }
						: task
				)
			);
			setEditingTask(null);
		}
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const updateProgress = (id, newCurrent) => {
		const value = Number.parseFloat(newCurrent) || 0;
		const roundedValue = Math.round(value * 10) / 10; // Round to 1 decimal place
		setTasks(
			tasks.map((task) =>
				task.id === id
					? {
							...task,
							current: roundedValue,
							status:
								roundedValue >= task.target
									? "completed"
									: "active",
					  }
					: task
			)
		);
	};

	const getDaysLeft = (deadline) => {
		const today = new Date();
		const deadlineDate = new Date(deadline);
		const diffTime = deadlineDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const overdueLongTermTasks = tasks.filter(
		// Only show long-term overdue tasks
		(task) => task.taskType === "long-term" && task.status === "overdue"
	);

	const contextValue = {
		tasks,
		setTasks,
		newTask,
		setNewTask,
		addTaskDialogOpen,
		setAddTaskDialogOpen,
		editingTask,
		setEditingTask,
		addTask,
		updateTask,
		deleteTask,
		updateProgress,
		overdueLongTermTasks,
	};
	return (
		<TasksContext.Provider value={contextValue}>
			{children}
		</TasksContext.Provider>
	);
}
