// Tên file: lib/tasks-type.ts

export type Priority = "high" | "medium" | "low";

export interface Column {
	id: string;
	title: string;
	// Mở rộng thêm: color, isDefault (nếu cần)
}

export interface Subtask {
	id: string;
	title: string;
	isCompleted: boolean;
}

export interface Task {
	id: string;
	title: string;
	note: string | null;
	due_date: string | null;
	is_completed: boolean | null;
	tag: string[] | null;
	repeated: string | null;
	status: string;
	priority: string | null;
}

export interface GroupTasks {
	[columnId: string]: Task[];
}

// --- Mock Data ---
export const mockColumns: Column[] = [
	{ id: "todo", title: "To Do" },
	{ id: "onProgress", title: "In Progress" },
	{ id: "complete", title: "Complete" },
	{ id: "overdue", title: "Overdue" },
];

export interface Project {
	id: string;
	name: string;
	description: string | null;
}

// --- Định nghĩa kiểu Tag ---
export interface Tag {
	id: string;
	name: string;
	color: string;
}
