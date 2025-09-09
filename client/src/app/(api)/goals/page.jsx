"use client";

import { Button } from "@/components/ui/button";
import DailyTaskChart from "@/components/goals/daily-task-chart";
import StudyProgress from "@/components/goals/study-progress/study-progress";
import DailyTasks from "@/components/goals/task/tasks";
import OverdueTasks from "@/components/goals/overdue-tasks";
import CompletedTasks from "@/components/goals/completed-task";
import OverviewTasks from "@/components/goals/overview-tasks";
import AddTask from "@/components/goals/task/add-tasks";
import EditTask from "@/components/goals/task/edit-task";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/use-task";
import { useStudyProgress } from "@/hooks/use-study-progress";
import AddStudyProgress from "@/components/goals/study-progress/add-study-progress";
import EditStudyProgress from "@/components/goals/study-progress/edit-study-progress";

export default function TasksPage() {
	const { setAddTaskDialogOpen } = useTasks();
	const { setAddStudyProgressDialogOpen } = useStudyProgress();

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Quản lý mục tiêu và nhiệm vụ
					</h1>
					<p className="text-muted-foreground">
						Đặt và theo dõi các nhiệm vụ học tập của bạn
					</p>
				</div>
				<div className="flex flex-row gap-2">
					<Button
						variant={`primary`}
						onClick={() => setAddStudyProgressDialogOpen(true)}
					>
						<Plus className="h-4 w-4" />
						Thêm tiến trình mới
					</Button>
					<Button
						variant={`primary`}
						onClick={() => setAddTaskDialogOpen(true)}
					>
						<Plus className="h-4 w-4" />
						Thêm task mới
					</Button>
				</div>
				{/* Add tasks */}
				<AddTask />
				<EditTask />

				<AddStudyProgress />
				<EditStudyProgress />
			</div>

			{/* Overview Stats */}
			<OverviewTasks />

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Daily tasks chart */}
				<DailyTaskChart />

				{/* Completed Tasks */}
				<CompletedTasks />
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				{/* Active Daily Tasks */}
				<DailyTasks />

				{/* Active Long-term Tasks */}
				<StudyProgress />
			</div>

			<OverdueTasks />
		</div>
	);
}
