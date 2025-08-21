import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, History } from "lucide-react";
import { Badge } from "../ui/badge";
import { todaySessions } from "@/data/study-data";

const TodaySession = () => {
	return (
		<Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-200">
			<CardHeader>
				<CardTitle className="flex flex-row gap-2 items-center text-lg text-purple-600">
					<History className="w-5 h-5" />
					Phiên học hôm nay
				</CardTitle>
			</CardHeader>
			<CardContent>
				{todaySessions.length === 0 ? (
					<p className="text-slate-500 text-center py-4">
						Chưa có phiên học nào hôm nay
					</p>
				) : (
					<div className="space-y-3">
						{todaySessions.map((session) => (
							<div
								key={session.id}
								className="flex items-center justify-between px-3 py-2 bg-white rounded-lg"
							>
								<div className="flex items-center gap-3">
									<Clock className="h-4 w-4 text-slate-400" />
									<div>
										<div className="font-medium text-slate-700">
											{session.method} - {session.subject}
										</div>
										<div className="text-sm text-slate-500">
											{session.duration} •{" "}
											{session.completedAt}
										</div>
									</div>
								</div>
								<div className="flex gap-1">
									{session.tags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="text-xs"
										>
											{tag}
										</Badge>
									))}
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default TodaySession;
