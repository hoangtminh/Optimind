import React from "react";
import { Card, CardContent } from "../ui/card";
import { AlertTriangle, Award, Calendar, TrendingUp } from "lucide-react";
import { useTasks } from "@/hooks/use-task";

const OverviewTasks = () => {
	const { tasks, overdueLongTermTasks } = useTasks();

	const dailyTasks = tasks.filter((task) => task.taskType === "daily");
	const longTermTasks = tasks.filter((task) => task.taskType === "long-term");
	const completedTasks = tasks.filter((task) => task.status === "completed");

	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			<Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-blue-800 font-medium">
								Tasks hàng ngày
							</p>
							<p className="text-2xl font-bold text-blue-900">
								{dailyTasks.length}
							</p>
						</div>
						<Calendar className="h-8 w-8 text-blue-600" />
					</div>
				</CardContent>
			</Card>

			<Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-purple-800 font-medium">
								Tasks dài hạn
							</p>
							<p className="text-2xl font-bold text-purple-900">
								{longTermTasks.length}
							</p>
						</div>
						<TrendingUp className="h-8 w-8 text-purple-600" />
					</div>
				</CardContent>
			</Card>

			<Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-green-800 font-medium">
								Đã hoàn thành
							</p>
							<p className="text-2xl font-bold text-green-900">
								{completedTasks.length}
							</p>
						</div>
						<Award className="h-8 w-8 text-green-600" />
					</div>
				</CardContent>
			</Card>

			<Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
				<CardContent className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-red-800 font-medium">
								Quá hạn
							</p>
							<p className="text-2xl font-bold text-red-900">
								{overdueLongTermTasks.length}
							</p>
						</div>
						<AlertTriangle className="h-8 w-8 text-red-600" />
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default OverviewTasks;
