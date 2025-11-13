// Tên file: app/tasks/page.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	CheckSquare,
	Bell,
	Video,
	Music,
	Plus,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Cần có từ cài đặt shadcn

// --- DND-Kit Imports ---
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { KanbanColumn } from "@/components/test/kanban-column";
import { TaskCard } from "@/components/test/task-card";

// --- Dữ liệu giả (Mock Data) ---
const mockColumns = [
	{ id: "todo", title: "To do" },
	{ id: "onProgress", title: "On Progress" },
	{ id: "complete", title: "Complete" },
	{ id: "overdue", title: "Overdue" },
];

const mockTasks = {
	todo: [
		{ id: "1", content: "Vẽ phác thảo UI/UX cho Optimind" },
		{ id: "2", content: "Nghiên cứu về WebRTC cho phòng học nhóm" },
	],
	onProgress: [{ id: "3", content: "Code trang Pomodoro" }],
	complete: [{ id: "4", content: "Thiết kế CSDL" }],
	overdue: [{ id: "5", content: "Nộp báo cáo tuần 1" }],
};
// --- Kết thúc Mock Data ---

export default function TaskBoardPage() {
	// === State quản lý giao diện (Giữ nguyên) ===
	const [backgroundUrl, setBackgroundUrl] = useState(
		"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
	);

	// === State cho Kanban ===
	const [columns, setColumns] = useState(mockColumns);
	const [tasks, setTasks] = useState(mockTasks);
	const [activeTask, setActiveTask] = useState(null);

	// Cài đặt Sensors cho DND-Kit
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10, // Yêu cầu kéo 10px mới kích hoạt, tránh click nhầm
			},
		})
	);

	// Hàm tiện ích
	const glassEffect =
		"bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	// --- Logic DND-Kit ---

	// 1. Khi bắt đầu kéo
	function onDragStart(event) {
		const { active } = event;
		const task = Object.values(tasks)
			.flat()
			.find((t) => t.id === active.id);
		if (task) {
			setActiveTask(task);
		}
	}

	// 2. Khi thả task
	function onDragEnd(event) {
		setActiveTask(null);
		const { active, over } = event;

		if (!over) return;
		if (active.id === over.id) return;

		const activeId = String(active.id);
		const overId = String(over.id);

		// Tìm cột của task đang kéo (active)
		const activeColumnId = Object.keys(tasks).find((colId) =>
			tasks[colId].some((t) => t.id === activeId)
		);
		if (!activeColumnId) return;

		// Tìm cột của nơi thả (over)
		// 'over' có thể là một task khác, hoặc là chính cột đó
		const overColumnId =
			Object.keys(tasks).find((colId) =>
				tasks[colId].some((t) => t.id === overId)
			) || (Object.keys(tasks).includes(overId) ? overId : null);

		if (!overColumnId) return;

		// --- Xử lý logic ---
		setTasks((currentTasks) => {
			const newTasks = { ...currentTasks };
			const activeTask = newTasks[activeColumnId].find(
				(t) => t.id === activeId
			);
			if (!activeTask) return currentTasks;

			// Kịch bản 1: Kéo thả trong CÙNG một cột
			if (activeColumnId === overColumnId) {
				const activeIndex = newTasks[activeColumnId].findIndex(
					(t) => t.id === activeId
				);
				const overIndex = newTasks[activeColumnId].findIndex(
					(t) => t.id === overId
				);

				newTasks[activeColumnId] = arrayMove(
					newTasks[activeColumnId],
					activeIndex,
					overIndex
				);
			}
			// Kịch bản 2: Kéo thả sang CỘT KHÁC
			else {
				// Xóa task khỏi cột cũ
				newTasks[activeColumnId] = newTasks[activeColumnId].filter(
					(t) => t.id !== activeId
				);

				// Thêm task vào cột mới
				// Tìm vị trí thả (nếu thả lên trên 1 task khác)
				const overIndex = newTasks[overColumnId].findIndex(
					(t) => t.id === overId
				);

				if (overIndex !== -1) {
					// Chèn vào vị trí task đó
					newTasks[overColumnId].splice(overIndex, 0, activeTask);
				} else {
					// Thêm vào cuối cột
					newTasks[overColumnId].push(activeTask);
				}
			}
			return newTasks;
		});
	}

	// Cần hàm này để dnd-kit biết task đang bay lơ lửng trên cột nào
	function onDragOver(event) {
		const { active, over } = event;
		if (!over) return;
		// Tương tự onDragEnd, tìm 2 cột
		const activeId = String(active.id);
		const overId = String(over.id);

		const activeColumnId = Object.keys(tasks).find((colId) =>
			tasks[colId].some((t) => t.id === activeId)
		);
		const overColumnId =
			Object.keys(tasks).find((colId) =>
				tasks[colId].some((t) => t.id === overId)
			) || (Object.keys(tasks).includes(overId) ? overId : null);

		if (
			!activeColumnId ||
			!overColumnId ||
			activeColumnId === overColumnId
		) {
			return;
		}

		// Logic "live" update:
		// Di chuyển task ngay lập tức khi bay qua cột mới
		setTasks((prev) => {
			const activeTask = prev[activeColumnId].find(
				(t) => t.id === activeId
			);
			if (!activeTask) return prev;

			const newTasks = { ...prev };
			// Xóa khỏi cột cũ
			newTasks[activeColumnId] = newTasks[activeColumnId].filter(
				(t) => t.id !== activeId
			);
			// Thêm vào cột mới (vào cuối)
			newTasks[overColumnId] = [...newTasks[overColumnId], activeTask];

			return newTasks;
		});
	}

	return (
		<main
			className="h-screen w-screen text-white p-6 transition-all duration-500"
			style={{
				backgroundImage: `url(${backgroundUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="relative w-full h-full">
				{/* === 1. Sidebar bên trái (Giữ nguyên) === */}
				<nav
					className={cn(
						"absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<LayoutDashboard />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<CheckSquare />
					</Button>
					{/* ... các icon khác ... */}
				</nav>

				{/* === 2. Thanh công cụ (Bên phải) (Giữ nguyên) === */}
				<div
					className={cn(
						"absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-3",
						glassEffect
					)}
				>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Video />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Music />
					</Button>
					{/* ... các icon khác ... */}
				</div>

				{/* === 3. Avatar người dùng (Góc trên phải) (Giữ nguyên) === */}
				<div className="absolute top-6 right-6 flex items-center gap-3">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/20"
					>
						<Bell />
					</Button>
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
				</div>

				{/* === 4. Nội dung chính - Bảng Kanban (Nội dung mới) === */}
				{/* Bọc toàn bộ bảng trong DndContext */}
				<DndContext
					sensors={sensors}
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					onDragOver={onDragOver} // Thêm onDragOver
				>
					<div
						className={cn(
							"absolute top-20 bottom-6 left-24 right-24", // Định vị giữa
							"flex flex-col",
							glassEffect
						)}
					>
						{/* Header của bảng */}
						<div className="flex justify-between items-center p-4 border-b border-white/20">
							<h1 className="text-2xl font-bold">Tasks Board</h1>
							<Button className="bg-white text-black hover:bg-gray-200">
								<Plus size={18} className="mr-2" /> Add Task
							</Button>
						</div>

						{/* Khu vực chứa các cột */}
						<div className="flex-1 flex gap-4 p-4 overflow-x-auto">
							{/* Chúng ta map qua các CỘT.
                Mỗi cột là một SortableContext chứa các TASK của nó.
              */}
							{columns.map((col) => (
								<KanbanColumn
									key={col.id}
									id={col.id}
									title={col.title}
									tasks={tasks[col.id] || []}
								/>
							))}
						</div>
					</div>

					{/* DragOverlay tạo ra component "nổi" khi đang kéo.
            Đây chính là chìa khóa cho hiệu ứng "mượt".
          */}
					<DragOverlay>
						{activeTask ? (
							<TaskCard task={activeTask} isOverlay />
						) : null}
					</DragOverlay>
				</DndContext>
			</div>
		</main>
	);
}
