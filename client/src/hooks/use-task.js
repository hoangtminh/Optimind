"use client";

import { taskApi } from "@/actions/task-action";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const TasksContext = createContext();

export function useTasks() {
	return useContext(TasksContext);
}

export function TasksProvider({ children }) {
	const [tasks, setTasks] = useState([]);
	const [taskLoading, setTaskLoading] = useState(false);

	const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null); // Added editing task state

	useEffect(() => {
		if (taskLoading) return;
		setTaskLoading(true);
		getTask();
	}, []);

	const getTask = async () => {
		try {
			const res = await taskApi.getUserTask();
			if (res.success) {
				setTasks(res.data);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setTaskLoading(false);
		}
	};

	const createTask = async (newTask) => {
		if (taskLoading) return;
		try {
			setTaskLoading(true);
			console.log(newTask);

			const res = await taskApi.createTask(newTask);
			if (res.success) {
				getTask();
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setTaskLoading(false);
		}
	};

	const updateTask = async (updateData) => {
		if (taskLoading) return;
		try {
			setTaskLoading(true);
			const res = await taskApi.updateTask(updateData);

			if (res.success) {
				getTask();
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setTaskLoading(false);
		}
	};

	const deleteTask = async (taskId) => {
		if (taskLoading) return;
		try {
			setTaskLoading(true);
			const res = await taskApi.deleteTask({ _id: taskId });
			console.log(res);
			if (res.success) {
				getTask();
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setTaskLoading(false);
		}
	};

	const contextValue = {
		tasks,
		setTasks,

		addTaskDialogOpen,
		setAddTaskDialogOpen,

		editingTask,
		setEditingTask,
		createTask,
		updateTask,
		deleteTask,
	};
	return (
		<TasksContext.Provider value={contextValue}>
			{children}
		</TasksContext.Provider>
	);
}
