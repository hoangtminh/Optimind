"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, AlertTriangle, Calendar, TrendingUp } from "lucide-react";

import DailyTaskChart from "@/components/goals/daily-task-chart";
import AddTask from "@/components/goals/add-tasks";
import EditTask from "@/components/goals/edit-task";
import LongtermTask from "@/components/goals/long-term-task";
import DailyTasks from "@/components/goals/daily-tasks";
import OverdueTasks from "@/components/goals/overdue-tasks";
import CompletedTasks from "@/components/goals/completed-task";
import OverviewTasks from "@/components/goals/overview-tasks";

export default function TasksPage() {
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
