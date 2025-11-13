// Tên file: components/optimind/TaskCard.tsx
"use client";

import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function TaskCard({ task, isOverlay }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging, // Trạng thái đang được kéo
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
	});

	// CSS cho hiệu ứng kéo thả
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (isDragging) {
		// Khi đang kéo, thẻ gốc sẽ mờ đi
		return (
			<div
				ref={setNodeRef}
				style={style}
				className="p-4 bg-white/10 border border-white/20 rounded-lg h-16"
			/>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes} // Gắn sự kiện kéo
			{...listeners} // Gắn sự kiện lắng nghe (click, touch)
			className={cn(
				"p-4 bg-white/20 rounded-lg cursor-grab active:cursor-grabbing shadow-md",
				"hover:bg-white/30 transition-colors",
				isOverlay && "ring-2 ring-blue-500 shadow-xl" // Style cho thẻ "ma" khi kéo
			)}
		>
			<p className="text-sm font-medium">{task.content}</p>
		</div>
	);
}
