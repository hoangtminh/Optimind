// Tên file: components/tasks/AddTaskModal.tsx

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CalendarDays, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { FC, FormEvent } from "react";
import { useTask } from "@/hooks/useTask";
import { Priority } from "@/lib/type/tasks-type";
import z from "zod";
import { createTaskSchema } from "@/supabase/schemas/task-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { LoadingSwap } from "../ui/loading-swap";
import { useProject } from "@/hooks/useProject";

type FormData = z.infer<typeof createTaskSchema>;

const AddTaskModal: FC = () => {
	const { isModalOpen, setIsModalOpen, handleAddTask, columns, newColumnId } =
		useTask();
	const { selectedProjectId } = useProject();

	const currentColumnTitle = columns.find((c) => c.id === newColumnId)?.title;

	const form = useForm({
		defaultValues: {
			title: "",
			note: "",
			due_date: undefined,
			status: "todo",
			repeated: "none",
			priority: "low",
			tag: [],
		},
		resolver: zodResolver(createTaskSchema),
	});

	const handleSubmit = async (data: FormData) => {
		handleAddTask(data);
		console.log("submitted");
		console.log(selectedProjectId, data);
		onClose();
	};

	const onClose = () => {
		setIsModalOpen(false);
		form.reset();
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="bg-black/70 backdrop-blur-md border-white/20 text-white">
				<DialogHeader>
					<DialogTitle className="text-white text-2xl">
						Tạo Task Mới (status: {currentColumnTitle})
					</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={form.handleSubmit(handleSubmit, (errors) => {
						console.log(errors);
					})}
					className="space-y-4 py-4"
				>
					{/* Title */}
					<FieldGroup>
						<Controller
							name="title"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>
										Tên Task (*)
									</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										className="bg-white/10 border-white/30"
										placeholder="Ví dụ: Hoàn thành Báo cáo"
									/>
									{fieldState.error && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
					{/* Description */}
					<FieldGroup className="space-y-2">
						<Controller
							name="note"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field>
									<Label htmlFor={field.name}>
										Nội dung (Ghi chú)
									</Label>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										className="bg-white/10 border-white/30"
										placeholder="Ví dụ: Trang 1-5, cần 3 biểu đồ..."
									/>
									{fieldState.error && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>
					<FieldGroup>
						<div className="flex gap-4 items-center">
							{/* Priority */}
							<Controller
								name="priority"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field>
										<FieldLabel htmlFor={field.name}>
											Độ quan trọng
										</FieldLabel>
										<Select
											onValueChange={field.onChange} // Cập nhật giá trị vào form
											defaultValue={field.value} // Hiển thị giá trị mặc định
										>
											<SelectTrigger
												id={field.name}
												className="bg-white/10 border-white/30"
											>
												<SelectValue placeholder="Chọn độ ưu tiên" />
											</SelectTrigger>
											<SelectContent className="bg-black/70 backdrop-blur-md border-white/20 text-white">
												<SelectItem value="high">
													Cao
												</SelectItem>
												<SelectItem value="medium">
													Trung bình
												</SelectItem>
												<SelectItem value="low">
													Thấp
												</SelectItem>
											</SelectContent>
										</Select>
									</Field>
								)}
							/>
							{/* Due Date */}
							<Controller
								name="due_date"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>
											Hạn chót
										</FieldLabel>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"w-full justify-start text-left font-normal bg-white/10 border-white/30",
														!field.value &&
															"text-gray-300"
													)}
												>
													<CalendarDays className="mr-2 h-4 w-4" />
													{field.value ? (
														format(
															new Date(
																field.value
															),
															"PPP"
														)
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
														field.value
															? new Date(
																	field.value
															  )
															: undefined
													}
													onSelect={field.onChange}
													autoFocus
												/>
											</PopoverContent>
										</Popover>
									</Field>
								)}
							/>
						</div>
					</FieldGroup>
					{/* Tags */}
					{/* <FieldGroup>
						<div className="space-y-2">
							<Label htmlFor="tags">
								Tags (cách nhau bằng dấu phẩy)
							</Label>
							<Input
								id="tags"
								value={newTaskData.tags?.join(", ")}
								onChange={(e) =>
									handleTaskDataChange(
										"tags",
										e.target.value
											.split(",")
											.map((tag: string) => tag.trim())
									)
								}
								className="bg-white/10 border-white/30"
								placeholder="Ví dụ: Dev, UI, Báo cáo"
							/>
						</div>
					</FieldGroup> */}
					<Field orientation={"horizontal"} className="w-full pt-4">
						<Button
							type="submit"
							disabled={form.formState.isSubmitting}
							className="cursor-pointer"
						>
							<LoadingSwap
								isLoading={form.formState.isSubmitting}
							>
								Tạo project
							</LoadingSwap>
						</Button>
						<DialogClose asChild>
							<Button type="button" variant="ghost">
								Hủy
							</Button>
						</DialogClose>
					</Field>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddTaskModal;
