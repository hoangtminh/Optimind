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
import { useStudyProgress } from "@/hooks/use-study-progress";
import { Check } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Badge } from "../../ui/badge";

const AddStudyProgress = () => {
	const {
		addStudyProgressDialogOpen,
		setAddStudyProgressDialogOpen,
		createStudyProgress,
	} = useStudyProgress();

	const [studyProgressTitle, setStudyProgressTitle] = useState("");
	const [studyProgressDescription, setStudyProgressDescription] =
		useState("");
	const [studyProgressHours, setStudyProgressHours] = useState(0);
	const [studyProgressMinutes, setStudyProgressMinutes] = useState(0);
	const [studyProgressFrequencyType, setStudyProgressFrequencyType] =
		useState("one-time");
	const [studyProgressDeadline, setStudyProgressDeadline] = useState("");

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

	const handleAddStudyProgress = () => {
		if (studyProgressFrequencyType === "repeat") {
			setStudyProgressDeadline((prev) => ({
				...prev,
				deadline: new Date().toISOString(),
			}));
		}

		createStudyProgress({
			title: studyProgressTitle,
			description: studyProgressDescription,
			frequencyType: studyProgressFrequencyType,
			frequency: selectedDays
				.filter((day) => day.repeat)
				.map((day) => day.value),
			target: studyProgressHours * 60 + studyProgressMinutes,
			deadline: studyProgressDeadline,
		});
		setAddStudyProgressDialogOpen(false);
	};

	const onClose = () => {
		setAddStudyProgressDialogOpen(false);

		setSelectedDays((prev) =>
			prev.map((day) => ({ ...day, repeat: false }))
		);
	};

	return (
		<Dialog open={addStudyProgressDialogOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className={`text-blue-700`}>
						Tạo StudyProgress mới
					</DialogTitle>
					<DialogDescription>
						Đặt một nhiệm vụ học tập mới để theo dõi tiến độ
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label className={`text-blue-800`} htmlFor="title">
							Tiêu đề
						</Label>
						<Input
							id="title"
							value={studyProgressTitle}
							onChange={(e) =>
								setStudyProgressTitle(e.target.value)
							}
							placeholder="Ví dụ: Hoàn thành chương 1"
						/>
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
								value={studyProgressFrequencyType}
								onValueChange={(value) =>
									setStudyProgressFrequencyType(value)
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
								<div className="flex flex-row gap-2 items-center">
									<Input
										id="target"
										type="number"
										value={studyProgressHours}
										onChange={(e) =>
											setStudyProgressHours(
												Math.max(0, e.target.value)
											)
										}
										className={`w-fit px-2 text-center`}
									/>
									<span className="text-nowrap">h : </span>
									<Input
										id="target"
										type="number"
										value={studyProgressMinutes}
										onChange={(e) =>
											setStudyProgressMinutes(
												Math.max(0, e.target.value)
											)
										}
										className={`w-fit px-2 text-center`}
									/>
									m
								</div>
							</div>
						</div>
						{studyProgressFrequencyType === "repeat" ? (
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
									value={studyProgressDeadline}
									onChange={(e) =>
										setStudyProgressDeadline(e.target.value)
									}
								/>
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Ghi chú</Label>
						<Textarea
							id="description"
							value={studyProgressDescription}
							onChange={(e) =>
								setStudyProgressDescription(e.target.value)
							}
							placeholder="Thêm ghi chú cho StudyProgress này..."
							rows={3}
						/>
					</div>
					<Button
						variant={"primary"}
						onClick={handleAddStudyProgress}
						className="w-full "
					>
						Tạo StudyProgress
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddStudyProgress;
