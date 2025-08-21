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
			<DialogTrigger asChild>
				<Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-500">
					<Plus className="h-4 w-4 mr-2" />
					Thêm task mới
				</Button>
			</DialogTrigger>
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
							<Label htmlFor="subject">Môn học</Label>
							<Select
								value={newTask.subject}
								onValueChange={(value) =>
									setNewTask({
										...newTask,
										subject: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Chọn môn học" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Toán học">
										Toán học
									</SelectItem>
									<SelectItem value="Vật lý">
										Vật lý
									</SelectItem>
									<SelectItem value="Hóa học">
										Hóa học
									</SelectItem>
									<SelectItem value="Sinh học">
										Sinh học
									</SelectItem>
									<SelectItem value="Văn học">
										Văn học
									</SelectItem>
									<SelectItem value="Tiếng Anh">
										Tiếng Anh
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
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
									<SelectItem value="score">
										Điểm số
									</SelectItem>
									<SelectItem value="quantity">
										Số lượng
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
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="unit">Đơn vị</Label>
							<Select
								value={newTask.unit}
								onValueChange={(value) =>
									setNewTask({
										...newTask,
										unit: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="hours">Giờ</SelectItem>
									<SelectItem value="points">Điểm</SelectItem>
									<SelectItem value="words">Từ</SelectItem>
									<SelectItem value="exercises">
										Bài tập
									</SelectItem>
									<SelectItem value="chapters">
										Chương
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
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
								<Label htmlFor="deadline">Hạn chót</Label>
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
					<div>
						<Label htmlFor="priority">Độ ưu tiên</Label>
						<Select
							value={newTask.priority}
							onValueChange={(value) =>
								setNewTask({
									...newTask,
									priority: value,
								})
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="high">Cao</SelectItem>
								<SelectItem value="medium">
									Trung bình
								</SelectItem>
								<SelectItem value="low">Thấp</SelectItem>
							</SelectContent>
						</Select>
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
