import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Timer } from "lucide-react";

const ProgressCard = () => {
	// Progress data
	const progressData = {
		today: { studied: 3.2, goal: 6 },
		week: { studied: 18.5, goal: 35 },
	};

	return (
		<Card className="grid grid-cols-1 lg:grid-cols-2 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
			<CardHeader>
				<CardTitle className="text-lg flex items-center gap-2 text-indigo-800">
					<Timer className="w-5 h-5" />
					Tiến độ học tập
				</CardTitle>
				<CardDescription className="text-indigo-500">
					Tiến độ hoàn thành trong tuần
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="w-full grid grid-cols-2 gap-4">
					<div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
						<div className="flex justify-between items-center mb-2">
							<span className="text-md text-slate-600 font-medium">
								Hôm nay
							</span>
							<span className="text-sm font-medium text-blue-600">
								{progressData.today.studied}h /{" "}
								{progressData.today.goal}h
							</span>
						</div>
						<Progress
							value={
								(progressData.today.studied /
									progressData.today.goal) *
								100
							}
							indicatorColor={"bg-blue-600"}
							className="h-2 bg-blue-200"
						/>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-md border border-blue-100">
						<div className="flex justify-between items-center mb-2">
							<span className="text-md text-slate-600 font-medium">
								Tuần này
							</span>
							<span className="text-sm font-medium text-green-600">
								{progressData.week.studied}h /{" "}
								{progressData.week.goal}h
							</span>
						</div>
						<Progress
							value={
								(progressData.week.studied /
									progressData.week.goal) *
								100
							}
							indicatorColor={"bg-green-600"}
							className="h-2 bg-green-200"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProgressCard;
