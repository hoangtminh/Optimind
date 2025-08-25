import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
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
import { useTasks } from "@/hooks/use-task";
import { Plus } from "lucide-react";

const AddTask = () => {
	const {
		addTaskDialogOpen,
		setAddTaskDialogOpen,
		newTask,
		setNewTask,
		addTask,
	} = useTasks();

	return (
		<Dialog open={addTaskDialogOpen} onOpenChange={setAddTaskDialogOpen}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Tạo task mới</DialogTitle>
					<DialogDescription>
						Đặt một nhiệm vụ học tập mới để theo dõi tiến độ
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div>
						<Label htmlFor="title">Tiêu đề task</Label>
						<Input
							id="title"
							value={newTask.title}
							onChange={(e) =>
								setNewTask({
									...newTask,
									title: e.target.value,
								})
							}
							placeholder="Ví dụ: Hoàn thành chương 1"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="taskType">Loại nhiệm vụ</Label>
							<Select
								value={newTask.taskType}
								onValueChange={(value) =>
									setNewTask({
										...newTask,
										taskType: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="daily">
										Hàng ngày
									</SelectItem>
									<SelectItem value="long-term">
										Dài hạn
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="grid grid-cols-2 gap-4">
							{newTask.taskType === "daily" ? (
								<div>
									<Label htmlFor="repeatFrequency">
										Tần suất lặp lại
									</Label>
									<Select
										value={newTask.repeatFrequency}
										onValueChange={(value) =>
											setNewTask({
												...newTask,
												repeatFrequency: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="daily">
												Hàng ngày
											</SelectItem>
											<SelectItem value="weekly">
												Hàng tuần
											</SelectItem>
											<SelectItem value="weekdays">
												Thứ 2-6
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							) : (
								<div>
									<Label htmlFor="deadline">Hạn</Label>
									<Input
										id="deadline"
										type="date"
										value={newTask.deadline}
										onChange={(e) =>
											setNewTask({
												...newTask,
												deadline: e.target.value,
											})
										}
									/>
								</div>
							)}
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="type">Loại task</Label>
							<Select
								value={newTask.type}
								onValueChange={(value) =>
									setNewTask({
										...newTask,
										type: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="study">
										Thời gian học
									</SelectItem>
									<SelectItem value="task">
										Nhiệm vụ
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="target">Mục tiêu</Label>
							<Input
								id="target"
								type="number"
								value={newTask.target}
								onChange={(e) =>
									setNewTask({
										...newTask,
										target: e.target.value,
									})
								}
								placeholder="Nhập số"
								step="0.1"
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="notes">Ghi chú</Label>
						<Textarea
							id="notes"
							value={newTask.notes}
							onChange={(e) =>
								setNewTask({
									...newTask,
									notes: e.target.value,
								})
							}
							placeholder="Thêm ghi chú cho task này..."
							rows={3}
						/>
					</div>
					<Button onClick={addTask} className="w-full">
						Tạo task
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AddTask;
