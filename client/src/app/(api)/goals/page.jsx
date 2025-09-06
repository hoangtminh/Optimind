"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, AlertTriangle, Calendar, TrendingUp, Plus } from "lucide-react";

import DailyTaskChart from "@/components/goals/daily-task-chart";
import AddTask from "@/components/goals/add-tasks";
import EditTask from "@/components/goals/edit-task";
import LongtermTask from "@/components/goals/deadline-task";
import DailyTasks from "@/components/goals/daily-tasks";
import OverdueTasks from "@/components/goals/overdue-tasks";
import CompletedTasks from "@/components/goals/completed-task";
import OverviewTasks from "@/components/goals/overview-tasks";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/use-task";

export default function TasksPage() {
	const { setAddTaskDialogOpen } = useTasks();

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Quản lý Tasks
					</h1>
					<p className="text-muted-foreground">
						Đặt và theo dõi các nhiệm vụ học tập của bạn
					</p>
				</div>
				<Button
					onClick={() => setAddTaskDialogOpen(true)}
					className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-500"
				>
					<Plus className="h-4 w-4 mr-2" />
					Thêm task mới
				</Button>
				{/* Add tasks */}
				<AddTask />
				<EditTask />
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
				<LongtermTask />
			</div>

			<OverdueTasks />
		</div>
	);
}
