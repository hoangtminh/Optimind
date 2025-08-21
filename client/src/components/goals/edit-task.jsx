import React from "react";
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

const EditTask = () => {
	const { editingTask, setEditingTask } = useTasks();

	return (
		<Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Chỉnh sửa task</DialogTitle>
					<DialogDescription>
						Cập nhật thông tin nhiệm vụ học tập
					</DialogDescription>
				</DialogHeader>
				{editingTask && (
					<div className="space-y-4">
						<div>
							<Label htmlFor="edit-title">Tiêu đề task</Label>
							<Input
								id="edit-title"
								value={editingTask.title}
								onChange={(e) =>
									setEditingTask({
										...editingTask,
										title: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="edit-subject">Môn học</Label>
								<Select
									value={editingTask.subject}
									onValueChange={(value) =>
										setEditingTask({
											...editingTask,
											subject: value,
										})
									}
								>
									<SelectTrigger>
										<SelectValue />
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
								<Label htmlFor="edit-target">Mục tiêu</Label>
								<Input
									id="edit-target"
									type="number"
									value={editingTask.target}
									onChange={(e) =>
										setEditingTask({
											...editingTask,
											target: e.target.value,
										})
									}
									step="0.1"
								/>
							</div>
						</div>
						<div>
							<Label htmlFor="edit-notes">Ghi chú</Label>
							<Textarea
								id="edit-notes"
								value={editingTask.notes || ""}
								onChange={(e) =>
									setEditingTask({
										...editingTask,
										notes: e.target.value,
									})
								}
								rows={3}
							/>
						</div>
						<Button onClick={updateTask} className="w-full">
							Cập nhật task
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default EditTask;
