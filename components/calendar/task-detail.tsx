import { Button } from "../ui/button";
import { Check, Clock, Flag, Pencil, Trash2, X, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/lib/type/tasks-type";
import { useTask } from "@/hooks/useTask";

const TaskDetail = ({
	taskDetail,
	setTaskDetail,
	handleToggleTask,
}: {
	taskDetail: Task;
	setTaskDetail: (task: Task | null) => void;
	handleToggleTask: (taskId: string) => void;
}) => {
	const { setIsDetailSheetOpen, setSelectedTask, handleDeleteTask } =
		useTask();

	const getPriorityColor = (p: string) => {
		switch (p) {
			case "high":
				return "text-red-400 border-red-400 bg-red-400/10";
			case "low":
				return "text-green-400 border-green-400 bg-green-400/10";
			default:
				return "text-yellow-400 border-yellow-400 bg-yellow-400/10";
		}
	};

	const onDeleteTask = async (taskId: string) => {
		await handleDeleteTask(taskId);
	};

	return (
		<div className="space-y-5 animate-in slide-in-from-right-5 fade-in duration-300">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">Chi tiết</h2>
				<Button
					variant="ghost"
					size="icon"
					className="text-white/70 hover:text-white hover:bg-white/20 -mr-2"
					onClick={() => setTaskDetail(null)}
				>
					<X size={20} />
				</Button>
			</div>

			<h3 className="text-2xl font-semibold">{taskDetail.title}</h3>

			<div className="flex items-center gap-2 text-white/80">
				<Clock size={16} />
				<span>{taskDetail.due_date?.slice(0, 10)}</span>
			</div>

			{/* <div className="flex items-center gap-2">
						<TagIcon size={16} className="text-white/80" />
						<span
							className={cn(
								"text-sm font-medium px-3 py-1 rounded-full shadow-sm text-white bg-opacity-70",
								taskDetail.tag.color
							)}
						>
							{taskDetail.tag.name}
						</span>
					</div> */}

			<div className="flex items-center gap-2">
				<Flag size={16} className="text-white/80" />
				<span
					className={cn(
						"text-sm font-medium px-3 py-1 rounded-full border uppercase",
						getPriorityColor(taskDetail.priority as string)
					)}
				>
					{taskDetail.priority}
				</span>
			</div>

			<div>
				<h4 className="font-semibold mb-2">Mô tả</h4>
				<p className="text-sm text-white/90 bg-white/10 p-3 rounded-md min-h-20">
					{taskDetail.note || "No note for this task."}
				</p>
			</div>

			{/* Các nút hành động */}
			<div className="flex gap-3 pt-4 border-t border-white/20">
				<Button
					className={cn(
						"flex-1",
						!taskDetail.is_completed
							? "bg-green-600 hover:bg-green-700"
							: "bg-red-600 hover:bg-red-700"
					)}
					onClick={() => handleToggleTask(taskDetail.id)}
				>
					{taskDetail.is_completed ? (
						<>
							<XIcon size={18} className="mr-2" />
							Đánh dấu Chưa làm
						</>
					) : (
						<>
							<Check size={18} className="mr-2" />
							Hoàn thành
						</>
					)}
				</Button>
				<Button
					variant="outline"
					className="bg-transparent hover:bg-white/20 text-white"
					onClick={() => {
						setSelectedTask(taskDetail);
						setIsDetailSheetOpen(true);
					}}
				>
					<Pencil size={16} />
				</Button>
				<Button
					variant="destructive"
					className="bg-red-600/80 hover:bg-red-600"
					onClick={() => onDeleteTask(taskDetail.id)}
				>
					<Trash2 size={16} />
				</Button>
			</div>
		</div>
	);
};

export default TaskDetail;
