"use client";

import React, { FC, useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { format } from "date-fns"; // Đã sửa lỗi cú pháp import
import { CalendarDays } from "lucide-react"; // Đã sửa lỗi cú pháp import
import { Priority, Task } from "@/lib/type/tasks-type";
import { useTask } from "@/hooks/useTask";
import DeleteTaskAlert from "./delete-alert";

const TaskDetailSheet = () => {
	const {
		isDetailSheetOpen,
		setIsDetailSheetOpen,
		selectedTask: task,
		columns,
		handleUpdateTask,
	} = useTask();
	if (!task) return;

	// Local state for editing
	const [editData, setEditData] = useState<Task | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	// Sync state when task changes (when opening the sheet)
	useEffect(() => {
		setEditData(task);
		setIsEditing(false); // Always start in view mode
	}, [task]);

	if (!task || !editData) return null;

	const handleDataChange = (field: keyof Task, value: any) => {
		setEditData((prev) => (prev ? { ...prev, [field]: value } : null));
	};

	const handleSave = async () => {
		console.log(editData);
		handleUpdateTask(task.id, editData);
	};

	const priorityColors: Record<Priority, string> = {
		high: "bg-red-500",
		medium: "bg-yellow-500",
		low: "bg-green-500",
	};

	const priorityLabels: Record<Priority, string> = {
		high: "Cao",
		medium: "Trung bình",
		low: "Thấp",
	};

	return (
		<Dialog open={isDetailSheetOpen} onOpenChange={setIsDetailSheetOpen}>
			<DialogContent className="bg-black/70 backdrop-blur-md border-white/20 text-white sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-white text-2xl">
						{isEditing ? "Chỉnh sửa Task" : "Chi tiết Task"}
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
					{/* Title */}
					<div className="space-y-2">
						<Label htmlFor="title">Tên Task</Label>
						<Input
							id="title"
							value={editData.title}
							onChange={(e) =>
								handleDataChange("title", e.target.value)
							}
							className="bg-white/10 border-white/30"
							disabled={!isEditing}
						/>
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="description">Nội dung</Label>
						<Input
							id="description"
							value={editData.note as string}
							onChange={(e) =>
								handleDataChange("note", e.target.value)
							}
							className="bg-white/10 border-white/30"
							placeholder="(Không có ghi chú)"
							disabled={!isEditing}
						/>
					</div>

					{/* Column and Priority */}
					<div className="grid grid-cols-2 gap-4">
						{/* Column */}
						<div className="space-y-2">
							<Label>Cột</Label>
							<Select
								value={editData.status}
								onValueChange={(value: string) =>
									handleDataChange("status", value)
								}
								disabled={!isEditing}
							>
								<SelectTrigger className="bg-white/10 border-white/30">
									<SelectValue placeholder="Chọn cột" />
								</SelectTrigger>
								<SelectContent className="bg-black/70 backdrop-blur-md border-white/20 text-white">
									{columns.map((col) => (
										<SelectItem key={col.id} value={col.id}>
											{col.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Priority */}
						<div className="space-y-2">
							<Label>Độ quan trọng</Label>
							<Select
								value={editData.priority as string}
								onValueChange={(value: Priority) =>
									handleDataChange("priority", value)
								}
								disabled={!isEditing}
							>
								<SelectTrigger className="bg-white/10 border-white/30">
									<SelectValue placeholder="Chọn độ ưu tiên" />
								</SelectTrigger>
								<SelectContent className="bg-black/70 backdrop-blur-md border-white/20 text-white">
									{["high", "medium", "low"].map((p) => (
										<SelectItem
											key={p}
											value={p}
											className={cn(
												"capitalize",
												priorityColors[p as Priority]
											)}
										>
											{priorityLabels[p as Priority]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Due Date */}
					<div className="space-y-2">
						<Label>Hạn chót</Label>
						<Popover>
							<PopoverTrigger asChild disabled={!isEditing}>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal bg-white/10 border-white/30",
										!editData.due_date && "text-gray-300"
									)}
								>
									<CalendarDays className="mr-2 h-4 w-4" />
									{editData.due_date ? (
										format(editData.due_date, "PPP")
									) : (
										<span>Chọn ngày</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0 bg-black/70 backdrop-blur-md border-white/20 text-white"
								align="start"
							>
								<Calendar
									className="text-white"
									mode="single"
									selected={
										editData.due_date
											? new Date(editData.due_date)
											: undefined
									}
									onSelect={(value) =>
										handleDataChange("due_date", value)
									}
									autoFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					{/* Tags */}
					<div className="space-y-2">
						<Label htmlFor="tags">
							Tags (cách nhau bằng dấu phẩy)
						</Label>
						<Input
							id="tags"
							value={editData.tag?.join(", ") || ""}
							onChange={(e) =>
								handleDataChange(
									"tag",
									e.target.value
										.split(",")
										.map((tag) => tag.trim())
										.filter((tag) => tag.length > 0)
								)
							}
							className="bg-white/10 border-white/30"
							disabled={!isEditing}
						/>
						{/* Display saved tags */}
						{editData.tag && editData.tag.length > 0 && (
							<div className="flex flex-wrap gap-1 mt-2">
								{editData.tag.map((t) => (
									<Badge
										key={t}
										variant="secondary"
										className="text-xs bg-white/20 text-white"
									>
										{t}
									</Badge>
								))}
							</div>
						)}
					</div>
				</div>
				<DialogFooter>
					<DeleteTaskAlert taskId={task.id} taskTitle={task.title} />
					{isEditing ? (
						<>
							<Button
								onClick={() => {
									setEditData(task); // Revert to original data
									setIsEditing(false);
								}}
								className="bg-muted/20"
							>
								Hủy
							</Button>
							<Button
								onClick={handleSave}
								disabled={!editData.title}
								className="bg-blue-400/30"
							>
								Lưu thay đổi
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={() => setIsDetailSheetOpen(false)}
								className="bg-muted/20"
							>
								Đóng
							</Button>
							<Button
								onClick={() => setIsEditing(true)}
								className="bg-blue-400/30"
							>
								Chỉnh sửa
							</Button>
						</>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TaskDetailSheet;
