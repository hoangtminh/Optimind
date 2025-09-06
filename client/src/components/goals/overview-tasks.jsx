import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle, Award, Calendar, TrendingUp } from "lucide-react";
import { useTasks } from "@/hooks/use-task";
import { getDaysLeft } from "@/lib/utils";

const OverviewTasks = () => {
	const { tasks } = useTasks();

	const deadlineTasks = tasks.filter(
		(task) => task.frequencyType === "deadline"
	);
	const completedTasks = tasks.filter((task) => task.complete);
	const overdueDeadlineTasks = tasks.filter(
		(task) =>
			task.frequencyType === "deadline" && getDaysLeft(task.deadline) < 0
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			<Card className="py-5 gap-3 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-lg font-medium text-blue-800">
						Số lượng task
					</CardTitle>
					<Calendar className="h-6 w-6 text-blue-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl  font-bold text-blue-900">
						{tasks.length} task
					</div>
					<div className="text-blue-700">cần được hoàn thành</div>
				</CardContent>
			</Card>

			<Card className="py-5 gap-3 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-lg font-medium text-purple-800">
						Số tiến trình học
					</CardTitle>
					<TrendingUp className="h-6 w-6 text-purple-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-purple-900">
						{deadlineTasks.length} tiến độ
					</div>
					<div className="text-purple-700">đang thực hiện</div>
				</CardContent>
			</Card>

			<Card className="py-5 gap-3 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-lg font-medium text-green-800">
						Đã hoàn thành
					</CardTitle>
					<Award className="h-6 w-6 text-green-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-green-900">
						{completedTasks.length}
					</div>
					<div className="text-green-700">task và tiến độ</div>
				</CardContent>
			</Card>

			<Card className="py-5 gap-3 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
				<CardHeader className="flex flex-row items-center justify-between space-y-0">
					<CardTitle className="text-lg font-medium text-red-800">
						Đã quá hạn
					</CardTitle>
					<AlertTriangle className="h-6 w-6 text-red-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-red-900">
						{overdueDeadlineTasks.length}
					</div>
					<div className="text-red-700">task và tiến độ</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default OverviewTasks;
