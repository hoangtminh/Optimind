"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { useTasks } from "@/hooks/use-task";
import { Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useSubject } from "@/hooks/use-subject";
import { Badge } from "../../ui/badge";

const AddTask = () => {
	const { addTaskDialogOpen, setAddTaskDialogOpen, createTask } = useTasks();
	const { subjects } = useSubject();

	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [taskTarget, setTaskTarget] = useState("");
	const [taskFrequencyType, setTaskFrequencyType] = useState("one-time");
	const [selectedSubjects, setSelectedSubjects] = useState([]);
	const [taskDeadline, setTaskDeadline] = useState("");

	const [selectedDays, setSelectedDays] = useState([
		{ name: "Thứ 2", value: "monday", repeat: false },
		{ name: "Thứ 3", value: "tuesday", repeat: false },
		{ name: "Thứ 4", value: "wednesday", repeat: false },
		{ name: "Thứ 5", value: "thursday", repeat: false },
		{ name: "Thứ 6", value: "friday", repeat: false },
		{ name: "Thứ 7", value: "saturday", repeat: false },
		{ name: "Chủ nhật", value: "sunday", repeat: false },
	]);

	const toggleDay = (value) => {
		setSelectedDays((prev) =>
			prev.map((day) =>
				day.value === value ? { ...day, repeat: !day.repeat } : day
			)
		);
	};

	const toggleSubject = (subject) => {
		setSelectedSubjects((prev) =>
			isSubjectSeleted(subject._id)
				? prev.filter((prevSubject) => prevSubject._id !== subject._id)
				: [...prev, subject]
		);
	};

	const isSubjectSeleted = (id) => {
		return selectedSubjects.some((subject) => subject._id === id);
	};

	const handleAddTask = () => {
		if (taskFrequencyType === "repeat") {
			setTaskDeadline((prev) => ({
				...prev,
				deadline: new Date().toISOString(),
			}));
		}

		createTask({
			title: taskTitle,
			description: taskDescription,
			frequencyType: taskFrequencyType,
			frequency: selectedDays
				.filter((day) => day.repeat)
				.map((day) => day.value),
			subject: selectedSubjects.map((subject) => subject.name),
			target: taskTarget,
			deadline: taskDeadline,
		});
		setAddTaskDialogOpen(false);
	};

	const onClose = () => {
		setAddTaskDialogOpen(false);

		setSelectedSubjects([]);
		setSelectedDays((prev) =>
			prev.map((subject) => ({ ...subject, repeat: false }))
		);
	};

	return (
		<Dialog open={addTaskDialogOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className={`text-blue-700`}>
						Tạo task mới
					</DialogTitle>
					<DialogDescription>
						Đặt một nhiệm vụ học tập mới để theo dõi tiến độ
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
						<Label className={`text-blue-800`}>Môn học:</Label>
						{subjects.map((subject) => (
							<Badge
								key={subject._id}
								variant={
									isSubjectSeleted(subject._id)
										? "default"
										: "outline"
								}
								className="cursor-pointer"
								style={{
									backgroundColor: isSubjectSeleted(
										subject._id
									)
										? subject.color
										: "white",
									borderColor: subject.color,
									color: isSubjectSeleted(subject._id)
										? "white"
										: subject.color,
								}}
								onClick={() => toggleSubject(subject)}
							>
								{subject.name}
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
						onClick={handleAddTask}
						className="w-full "
					>
						Tạo task
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddTask;
