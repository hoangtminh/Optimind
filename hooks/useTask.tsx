// Tên file: context/TaskContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useMemo,
	useCallback,
	ReactNode,
	useEffect,
	FC,
} from "react";
import { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column, Tag, Task, mockColumns } from "@/lib/type/tasks-type";
import z from "zod";
import { createTaskSchema } from "@/supabase/schemas/task-schema";
import {
	createTask,
	deleteTask,
	updateTask,
	updateTaskStatus,
} from "@/supabase/actions/task";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getTasksByProject, getAllTask } from "@/supabase/lib/getTask";
import { useProject } from "./useProject";

interface TaskContextType {
	columns: Column[];
	allTasks: Task[]; // Lưu trữ toàn bộ task
	projectTasks: Task[]; // Tasks cho project hiện tại
	tags: Tag[];
	groupTasks: Record<string, Task[]>;
	activeTask: Task | null;
	activeColumn: Column | null;
	newColumnId: string;
	isModalOpen: boolean;
	isDetailSheetOpen: boolean;
	selectedTask: Task | null;

	setAllTasks: (tasks: Task[]) => void;
	setSelectedTask: (task: Task) => void;
	getAllTasks: () => Promise<Task[] | null>;
	getTasksByProjectId: (projectId: string) => Promise<Task[] | null>;

	onDragStart: (event: DragStartEvent) => void;
	onDragEnd: (event: DragEndEvent) => void;
	onDragOver: (event: DragOverEvent) => void;

	handleAddTask: (
		data: z.infer<typeof createTaskSchema>,
		projectId: string
	) => Promise<void>;
	handleUpdateTask: (taskId: string, updatedTask: Task) => Promise<void>;
	handleDeleteTask: (taskId: string) => Promise<void>;
	handleAddColumn: () => void;
	handleEditColumn: (columnId: string, newTitle: string) => void;
	handleDeleteColumn: (columnId: string) => void;

	handleAddGlobalTag: (name: string, color: string) => Promise<void>;
	handleDeleteGlobalTag: (tagId: string) => Promise<void>;

	setIsModalOpen: (bool: boolean) => void;
	setIsDetailSheetOpen: (bool: boolean) => void;

	handleToggleSubtask: () => void;
	handleDeleteSubtask: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
};

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
	// === 1. States Quản lý Dữ liệu ===
	const [loading, setLoading] = useState(false);
	const [columns, setColumns] = useState<Column[]>(mockColumns);
	const [allTasks, setAllTasks] = useState<Task[]>([]);
	const [projectTasks, setProjectTasks] = useState<Task[]>([]);
	const [groupTasks, setGroupTasks] = useState<Record<string, Task[]>>({});
	const [tags, setTags] = useState<Tag[]>([]);

	// === 2. States Quản lý UI & DND ===
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDetailSheetOpen, setIsDetailSheetOpen] = useState<boolean>(false);

	const [newColumnId, setNewColumnId] = useState<string>("todo");

	const router = useRouter();
	const { selectedProjectId } = useProject();

	// === 3. Handlers cho Drag and Drop (DND) ===
	const findColumnForTask = useCallback(
		(taskId: string): string => {
			return Object.keys(groupTasks).find((colId) =>
				groupTasks[colId].some((t) => t.id === taskId)
			) as string;
		},
		[groupTasks]
	);

	const onDragStart = useCallback((event: DragStartEvent) => {
		const { active } = event;
		if (active.data.current?.type === "Column") {
			setActiveColumn(active.data.current.column as Column);
			return;
		}
		if (active.data.current?.type === "Task") {
			setActiveTask(active.data.current.task as Task);
			return;
		}
	}, []);

	const onDragEnd = useCallback(
		async (event: DragEndEvent) => {
			setActiveColumn(null);
			setActiveTask(null);
			const { active, over } = event;
			if (!over) return;

			if (active.data.current?.type === "Column") {
				if (active.id === over.id) return;
				setColumns((cols) => {
					const activeIndex = cols.findIndex(
						(c) => c.id === active.id
					);
					const overIndex = cols.findIndex((c) => c.id === over.id);
					return arrayMove(cols, activeIndex, overIndex);
				});
				return;
			}

			if (active.data.current?.type === "Task") {
				const activeId = String(active.id);
				const overId = String(over.id);
				const activeColumnId = findColumnForTask(activeId);
				const overColumnId = findColumnForTask(overId);

				if (activeColumnId === overColumnId && activeColumnId) {
					const { error, message } = await updateTaskStatus(
						activeId,
						overColumnId
					);
					if (error) {
						toast.error(message as string);
					} else {
						toast.success("Update success full");
						makeGroupTasks();
					}
				}
			}
		},
		[columns, findColumnForTask]
	);

	const onDragOver = useCallback(
		(event: DragOverEvent) => {
			const { active, over } = event;
			if (!over) return;

			const activeId = String(active.id);
			const overId = String(over.id);
			const activeColumnId = findColumnForTask(activeId);
			const overColumnId =
				findColumnForTask(overId) ||
				(columns.find((c) => c.id === overId) ? overId : undefined);

			if (
				!activeColumnId ||
				!overColumnId ||
				activeColumnId === overColumnId
			)
				return;

			setGroupTasks((prev) => {
				const activeTaskItem = prev[activeColumnId].find(
					(t) => t.id === activeId
				);
				if (!activeTaskItem) return prev;
				const newTasks = { ...prev };
				newTasks[activeColumnId] = newTasks[activeColumnId].filter(
					(t) => t.id !== activeId
				);

				newTasks[overColumnId] = [
					...(newTasks[overColumnId] || []),
					{
						...activeTaskItem,
						status: overColumnId,
					},
				];

				return newTasks;
			});
		},
		[columns, findColumnForTask]
	);

	// === 4. Handlers cho CRUD Task ===
	const getTasksByProjectId = useCallback(async (projectId: string) => {
		const data = await getTasksByProject(projectId);
		setProjectTasks(data ? data : []);
		return data;
	}, []);

	const getAllTasks = useCallback(async () => {
		const data = await getAllTask();
		setAllTasks(data ? data : []);
		return data;
	}, []);

	const groupTasksByStatus = (tasks: Task[]) => {
		const now = new Date();

		return tasks.reduce(
			(acc, task) => {
				const dueDate = task.due_date ? new Date(task.due_date) : null;
				const isOverdue =
					dueDate && dueDate < now && !task.is_completed;
				const status = task.status;

				if (task.is_completed) {
					acc.complete.push(task);
				} else if (isOverdue) {
					acc.overdue.push(task);
				} else {
					if (!acc[status]) acc[status] = [];
					acc[status].push(task);
				}

				return acc;
			},
			{ complete: [], overdue: [] } as Record<string, Task[]>
		);
	};

	const makeGroupTasks = () => {
		getTasksByProjectId(selectedProjectId).then((data) => {
			if (data) setGroupTasks(groupTasksByStatus(data));
		});
	};

	useEffect(() => {
		setLoading(true);
		try {
			makeGroupTasks();
		} catch (error) {
			toast.error("Error occur");
		} finally {
			setLoading(false);
		}
	}, [selectedProjectId]);

	const handleAddTask = useCallback(
		async (
			formData: z.infer<typeof createTaskSchema>,
			projectId: string
		) => {
			const { message, error } = await createTask(formData, projectId);
			if (error) {
				toast.error(message as string);
			} else {
				setAllTasks((prev) => [message as Task, ...prev]);
				setProjectTasks((prev) => [message as Task, ...prev]);
				const is_overdue =
					(message as Task).due_date !== null &&
					new Date((message as Task).due_date as string).getTime() >
						Date.now();

				setGroupTasks((prev) => ({
					...prev,
					[is_overdue ? (message as Task).status : "overdue"]: [
						message as Task,
						...(prev[
							is_overdue ? (message as Task).status : "overdue"
						] || []),
					],
				}));
				toast.success("Task created");
			}
		},
		[selectedProjectId, newColumnId]
	);

	const handleUpdateTask = useCallback(
		async (taskId: string, updatedTask: Task) => {
			const { title, note, repeated, priority, tag, due_date } =
				updatedTask;

			const { error, message } = await updateTask(taskId, {
				title: title,
				note: note ? note : "",
				repeated: repeated ? repeated : "none",
				priority: priority || "",
				tag: tag || [],
				due_date: due_date ? new Date(due_date) : undefined,
			});

			if (error) {
				toast.error(message);
			} else {
				toast.success(message);
				setIsDetailSheetOpen(false);
				router.refresh();
			}
		},
		[findColumnForTask]
	);

	const handleDeleteTask = useCallback(
		async (taskId: string) => {
			const columnId = findColumnForTask(taskId);
			const { error, message } = await deleteTask(taskId);
			if (error) {
				toast.error(message);
			} else {
				setAllTasks((prevTasks) =>
					prevTasks.filter((t: Task) => t.id !== taskId)
				);
				makeGroupTasks();
			}
			setIsDetailSheetOpen(false);
		},
		[allTasks, groupTasks, findColumnForTask]
	);

	// === 5. Handlers cho Column & Tag ===
	const handleAddColumn = useCallback(() => {
		const newColumn: Column = {
			id: `col-${crypto.randomUUID()}`,
			title: "Cột Mới",
		};
		setColumns((prev) => [...prev, newColumn]);
		setAllTasks((prev) => ({ ...prev, [newColumn.id]: [] }));
	}, []);

	const handleEditColumn = useCallback(
		(columnId: string, newTitle: string) => {
			setColumns((prev) =>
				prev.map((col) =>
					col.id === columnId ? { ...col, title: newTitle } : col
				)
			);
		},
		[]
	);

	const handleDeleteColumn = useCallback(
		(columnId: string) => {
			// const tasksToMove = allTasks[columnId] || [];
			// setAllTasks((prev) => {
			// 	const newTasks = { ...prev };
			// 	newTasks["todo"] = [
			// 		...(newTasks["todo"] || []),
			// 		...tasksToMove.map((t) => ({ ...t, columnId: "todo" })),
			// 	];
			// 	delete newTasks[columnId];
			// 	return newTasks;
			// });
			// setColumns((prev) => prev.filter((col) => col.id !== columnId));
		},
		[allTasks]
	);

	const handleAddGlobalTag = async (name: string, color: string) => {
		const newTag: Tag = { id: `tag-${crypto.randomUUID()}`, name, color };
		setTags((prev) => [...prev, newTag]);
	};

	const handleDeleteGlobalTag = async (tagId: string) => {
		setTags((prev) => prev.filter((t) => t.id !== tagId));
	};

	const handleToggleSubtask = () => {};
	const handleDeleteSubtask = () => {};

	// === 7. Export Context Value ===
	const contextValue = useMemo(
		() => ({
			columns,
			allTasks,
			setAllTasks,
			projectTasks,
			groupTasks,
			tags,
			activeTask,
			activeColumn,
			newColumnId,
			isModalOpen,
			isDetailSheetOpen,
			selectedTask,
			setSelectedTask,
			getAllTasks,
			getTasksByProjectId,

			onDragStart,
			onDragEnd,
			onDragOver,

			handleAddTask,
			handleUpdateTask,
			handleDeleteTask,

			handleAddColumn,
			handleEditColumn,
			handleDeleteColumn,

			handleAddGlobalTag,
			handleDeleteGlobalTag,

			setIsModalOpen,
			setIsDetailSheetOpen,

			handleToggleSubtask,
			handleDeleteSubtask,
		}),
		[
			columns,
			allTasks,
			setAllTasks,
			projectTasks,
			groupTasks,
			tags,
			activeTask,
			activeColumn,
			newColumnId,
			isModalOpen,
			isDetailSheetOpen,
			selectedTask,
			setSelectedTask,
			getAllTasks,
			getTasksByProjectId,

			onDragStart,
			onDragEnd,
			onDragOver,

			handleAddTask,
			handleUpdateTask,
			handleDeleteTask,

			handleAddColumn,
			handleEditColumn,
			handleDeleteColumn,

			handleAddGlobalTag,
			handleDeleteGlobalTag,

			setIsModalOpen,
			setIsDetailSheetOpen,
			handleToggleSubtask,
			handleDeleteSubtask,
		]
	);

	return (
		<TaskContext.Provider value={contextValue}>
			{children}
		</TaskContext.Provider>
	);
};
