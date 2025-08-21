import React from "react";

import { Card, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const TodayActivity = () => {
	return (
		<Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
			<CardHeader>
				<CardTitle className="text-emerald-800">
					Hoạt động hôm nay
				</CardTitle>
				<CardDescription className="text-emerald-600">
					Tổng quan về các môn học đã học
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{todayStats.subjects.map((subject, index) => (
					<div
						key={subject}
						className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-emerald-200"
					>
						<div className="flex items-center gap-3">
							<div className="w-3 h-3 bg-emerald-500 rounded-full" />
							<span className="font-medium text-emerald-800">
								{subject}
							</span>
						</div>
						<Badge
							variant="secondary"
							className="bg-emerald-100 text-emerald-800"
						>
							{(1.5 - index * 0.3).toFixed(1)}h
						</Badge>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default TodayActivity;
