// Tên file: components/tasks/TaskHeader.tsx
import { Button } from "@/components/ui/button";
import { useTask } from "@/hooks/useTask";
import { Plus } from "lucide-react";
import ProjectSelector from "./project-selector";
import { useProject } from "@/hooks/useProject";

const TaskHeader = () => {
	const { setIsModalOpen } = useTask();
	const { selectedProjectId } = useProject();

	return (
		<div className="flex justify-between items-center px-4 py-3 border-b border-white/20 shrink-0">
			<div className="flex gap-4">
				<h1 className="text-2xl font-bold text-white">Tasks Board</h1>
				<ProjectSelector />
			</div>
			{selectedProjectId && (
				<Button
					className="bg-white text-black cursor-pointer hover:bg-gray-200"
					onClick={() => setIsModalOpen(true)}
				>
					<Plus size={18} className="mr-2" /> Add Task
				</Button>
			)}
		</div>
	);
};

export default TaskHeader;
