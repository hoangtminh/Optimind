import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTasks } from "@/hooks/use-task";
import { useSubject } from "@/hooks/use-subject";
import { Badge } from "../ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Check } from "lucide-react";
import { toast } from "sonner";

const EditTask = () => {
	const { subjects } = useSubject();
	const { editingTask, setEditingTask, updateTask } = useTasks();

	if (!editingTask) return null;

	const [taskTitle, setTaskTitle] = useState(editingTask.title);
	const [taskDescription, setTaskDescription] = useState(
		editingTask.description
	);
	const [taskTarget, setTaskTarget] = useState(editingTask.target);
	const [taskFrequencyType, setTaskFrequencyType] = useState(
		editingTask.frequencyType
	);
	const [taskDeadline, setTaskDeadline] = useState(editingTask.deadline);

	const [selectedDays, setSelectedDays] = useState([
		{ name: "Thứ 2", value: "monday", repeat: false },
		{ name: "Thứ 3", value: "tuesday", repeat: false },
		{ name: "Thứ 4", value: "wednesday", repeat: false },
		{ name: "Thứ 5", value: "thursday", repeat: false },
		{ name: "Thứ 6", value: "friday", repeat: false },
		{ name: "Thứ 7", value: "saturday", repeat: false },
		{ name: "Chủ nhật", value: "sunday", repeat: false },
	]);

	useEffect(() => {
		setSelectedDays((prev) =>
			prev.map((day) =>
				editingTask.frequency.some((taskDay) => taskDay === day.value)
					? { ...day, repeat: true }
					: day
			)
		);
	}, []);

	const toggleDay = (value) => {
		setSelectedDays((prev) =>
			prev.map((day) =>
				day.value === value ? { ...day, repeat: !day.repeat } : day
			)
		);
	};

	const handleUpdateTask = () => {
		if (!selectedDays.some((day) => day.repeat)) {
			toast.error("Select day for task");
			return;
		}

		updateTask({
			_id: editingTask._id,
			title: taskTitle,
			description: taskDescription,
			frequencyType: taskFrequencyType,
			frequency: selectedDays
				.filter((day) => day.repeat)
				.map((day) => day.value),
			subject: editingTask.subject,
			target: taskTarget,
			deadline: taskDeadline,
		});

		setEditingTask(null);
	};

	return (
		<Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className={`text-blue-700`}>
						Cập nhật task
					</DialogTitle>
					<DialogDescription>
						Cập nhật một số thông tin của task
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label className={`text-blue-800`} htmlFor="title">
							Tiêu đề task
						</Label>
						<Input
							id="title"
							value={taskTitle}
							onChange={(e) => setTaskTitle(e.target.value)}
							placeholder="Ví dụ: Hoàn thành chương 1"
						/>
					</div>
					<div className="w-full flex flex-row flex-wrap gap-2">
						<Label className={`text-blue-800/40`}>Môn học:</Label>
						{editingTask.subject.map((subject, index) => (
							<Badge key={index} variant={"outline"}>
								{subject}
							</Badge>
						))}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label
								className={`text-blue-800`}
								htmlFor="frequencyType"
							>
								Loại nhiệm vụ
							</Label>
							<Select
								value={taskFrequencyType}
								onValueChange={(value) =>
									setTaskFrequencyType(value)
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="repeat">
										Lặp lại
									</SelectItem>
									<SelectItem value="one-time">
										Một lần
									</SelectItem>
								</SelectContent>
							</Select>

							<div className="space-y-2">
								<Label
									className={`text-blue-800`}
									htmlFor="target"
								>
									Mục tiêu
								</Label>
								<Input
									id="target"
									type="text"
									value={taskTarget}
									onChange={(e) =>
										setTaskTarget(e.target.value)
									}
									placeholder="Nhập muc tieu"
								/>
							</div>
						</div>
						{taskFrequencyType === "repeat" ? (
							<div className="space-y-2">
								<Label
									className={`text-blue-800`}
									htmlFor="frequency"
								>
									Tần suất lặp lại
								</Label>

								<DropdownMenu>
									<DropdownMenuTrigger className="text-sm py-1.5 px-3 rounded-md border border-gray-300 cursor-pointer">
										Chọn tần suất lặp
									</DropdownMenuTrigger>
									<DropdownMenuContent className="space-y-1.5">
										{selectedDays.map((day) => (
											<div
												key={day.value}
												onClick={() =>
													toggleDay(day.value)
												}
												className={`flex px-2 py-1 items-center text-sm rounded-md justify-between cursor-pointer ${
													day.repeat && "bg-gray-200"
												}`}
											>
												{day.name}
												{day.repeat && (
													<Check className="w-4 h-4 text-blue-600" />
												)}
											</div>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								{selectedDays.some((day) => day.repeat) ? (
									<div className="text-sm text-wrap w-full">
										Lặp lại vào các:{` `}
										<span className="text-blue-900">
											{selectedDays.map((day) =>
												day.repeat ? `${day.name} ` : ""
											)}
										</span>
										hàng tuần
									</div>
								) : (
									<div className="text-sm text-gray-400/80">
										Hãy chọn tần suất lặp
									</div>
								)}
							</div>
						) : (
							<div className="space-y-2">
								<Label
									className={`text-blue-800`}
									htmlFor="deadline"
								>
									Hạn
								</Label>
								<Input
									id="deadline"
									type="date"
									value={taskDeadline}
									onChange={(e) =>
										setTaskDeadline(e.target.value)
									}
								/>
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Ghi chú</Label>
						<Textarea
							id="description"
							value={taskDescription}
							onChange={(e) => setTaskDescription(e.target.value)}
							placeholder="Thêm ghi chú cho task này..."
							rows={3}
						/>
					</div>
					<Button
						variant={"primary"}
						onClick={handleUpdateTask}
						className="w-full "
					>
						Cập nhật task
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EditTask;
