import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { upcomingSchedule } from "@/data/dashboard-data";

const UpcomingSchedules = () => {
	return (
		<Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-teal-800">
					<Calendar className="h-5 w-5" />
					Lịch học sắp tới
				</CardTitle>
				<CardDescription className="text-teal-600">
					Các buổi học và kiểm tra trong tuần
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				{upcomingSchedule.map((item, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-teal-200"
					>
						<div className="flex items-center gap-3">
							<div
								className={`w-3 h-3 rounded-full ${
									item.type === "exam"
										? "bg-red-500"
										: item.type === "review"
										? "bg-orange-500"
										: "bg-teal-500"
								}`}
							/>
							<div>
								<p className="font-medium text-teal-800 text-sm">
									{item.subject}
								</p>
								<p className="text-xs text-teal-600">
									{item.time}
								</p>
							</div>
						</div>
						<Badge
							variant="secondary"
							className="bg-teal-100 text-teal-800 text-xs"
						>
							{item.date}
						</Badge>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default UpcomingSchedules;
