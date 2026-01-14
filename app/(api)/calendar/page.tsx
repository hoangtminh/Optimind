"use client";

import React, { useState, useEffect, useMemo, FC, useCallback } from "react";
import { cn } from "@/lib/utils";
import CalendarPanel from "@/components/calendar/calendar-panel";
import TasksForDay from "@/components/calendar/task-for-day";
import AllTasksPanel from "@/components/calendar/all-task-panel";
import { useTask } from "@/hooks/useTask";
import { format, parse } from "date-fns";
import { Task } from "@/lib/type/tasks-type";
import AddTaskModal from "@/components/tasks/add-tasks-modal";
import TaskDetailSheet from "@/components/tasks/task-details-sheet";
import { updateTaskStatus } from "@/supabase/actions/task";
import { toast } from "sonner";

// --- Ngày hiện tại ---
const today = new Date();
const todayString = format(today, "yyyy-MM-dd");

const TaskCalendar: FC = () => {
	const glassEffect =
		"bg-black/50 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";
	const { allTasks, getAllTasks, setAllTasks } = useTask();

	const [date, setDate] = useState<Date | undefined>(today);
	const [dateTask, setDateTask] = useState<Task[]>([]);
	const [taskDetail, setTaskDetail] = useState<Task | null>(
		allTasks?.find(
			(t) =>
				t.due_date && format(t.due_date, "yyyy-MM-dd") === todayString
		) || null
	);

	useEffect(() => {
		const fetchTasks = async () => {
			const data = await getAllTasks();
			return setAllTasks(data ? data : []);
		};
		fetchTasks();
	}, []);

	// 1. Dữ liệu Task theo Ngày (dùng cho calendar marker)
	const tasksByDate = useMemo(() => {
		return allTasks.reduce((acc, task) => {
			if (!task.due_date) return acc;
			const d = task.due_date.slice(0, 10);
			if (!acc[d]) acc[d] = [];
			acc[d].push(task);
			return acc;
		}, {} as Record<string, Task[]>);
	}, [allTasks]);

	// 2. Tạo danh sách Date objects cho Calendar modifiers
	const tasksDays = useMemo(() => {
		return Object.keys(tasksByDate).map((dateStr) =>
			parse(dateStr, "yyyy-MM-dd", new Date())
		);
	}, [allTasks, tasksByDate]);

	// Lọc task dựa trên ngày được chọn
	// --- Handlers ---
	const handleSelectDate = useCallback(
		(selectedDate: Date | undefined) => {
			if (!selectedDate) return;
			setDate(selectedDate);
			// Tự động chọn task đầu tiên của ngày mới
			const newDateString = selectedDate
				? format(selectedDate, "yyyy-MM-dd")
				: "";
			setDateTask(tasksByDate[newDateString]);
			const firstTask =
				allTasks.find((t) => t.due_date === newDateString) || null;
			setTaskDetail(firstTask);
		},
		[allTasks, tasksByDate]
	);

	useEffect(() => {
		handleSelectDate(date);
	}, [allTasks]);

	const handleToggleTask = async (taskId: string) => {
		const task = allTasks.find((t) => t.id === taskId);
		if (!task) return;

		const newCompletedState = !task.is_completed;
		const newStatus = newCompletedState ? "complete" : "todo";

		const { error, message } = await updateTaskStatus(taskId, newStatus);
		if (error) {
			toast.error("Failed to update task");
		} else {
			setAllTasks(
				allTasks.map((t: Task) =>
					t.id === taskId ? (message as Task) : t
				)
			);
			setDateTask((prev) =>
				prev.map((t) => (t.id === taskId ? (message as Task) : t))
			);
			setTaskDetail((prev) => (prev !== null ? (message as Task) : null));
			toast.success("Task updated");
		}
	};

	return (
		<main className="h-screen w-screen text-white p-6 transition-all duration-500">
			<div className="absolute inset-0 w-full h-full" />
			<div className="relative w-full h-full">
				{/* === Main Content - Quản lý Kế hoạch === */}
				<div
					className={cn(
						"absolute top-20 bottom-6 left-24 right-24", // Định vị giữa các sidebar
						"flex divide-x divide-white/20", // Layout 3 cột
						glassEffect
					)}
				>
					{/* --- Cột 1: Lịch & Filter --- */}
					<CalendarPanel
						date={date}
						setDate={handleSelectDate}
						tasksDays={tasksDays}
					/>

					{/* --- Cột 2: Danh sách Công việc theo ngày đã chọn --- */}
					<TasksForDay
						selectedDateString={date}
						tasksForSelectedDay={dateTask}
						taskDetail={taskDetail}
						setTaskDetail={setTaskDetail}
					/>
					{/* Thanh tìm kiếm */}

					{/* --- Cột 3: TẤT CẢ CÔNG VIỆC (ĐÃ CẬP NHẬT) --- */}
					<AllTasksPanel
						tasks={allTasks}
						taskDetail={taskDetail}
						setTaskDetail={setTaskDetail}
						handleToggleTask={handleToggleTask}
						onTaskClick={(clickedTask) => {
							// Chuyển lịch sang ngày của task
							handleSelectDate(
								parse(
									clickedTask.due_date?.slice(
										0,
										10
									) as string,
									"yyyy-MM-dd",
									new Date()
								)
							);
							// Chọn task trong danh sách giữa
							setTaskDetail(clickedTask);
						}}
					/>
				</div>
				<AddTaskModal />
				<TaskDetailSheet />
			</div>
		</main>
	);
};

export default TaskCalendar;
