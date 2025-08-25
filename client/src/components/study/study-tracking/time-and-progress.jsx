import { Progress } from "@/components/ui/progress";
import { useStudy } from "@/hooks/use-study-session";
import { formatTime } from "@/lib/utils";
import React from "react";

const TimeAndProgress = ({ progressPercentage }) => {
	const { sessionData, timeRemaining } = useStudy();
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="font-medium text-gray-700">
					Thời gian còn lại:
				</span>
				<div className="text-right">
					<div className="text-3xl font-bold text-indigo-600">
						{sessionData.method === "freeform"
							? formatTime(Math.floor(Date.now() / 1000) % 3600)
							: formatTime(timeRemaining)}
					</div>
					{sessionData.method === "pomodoro" && (
						<div className="text-sm text-gray-500">
							{sessionData.isBreak
								? "Nghỉ giải lao"
								: "Thời gian học"}{" "}
							- Chu kỳ {sessionData.currentCycle}/
							{sessionData.cycles}
						</div>
					)}
				</div>
			</div>

			{sessionData.method !== "freeform" && (
				<Progress
					value={progressPercentage}
					className="h-3 bg-green-200"
					indicatorColor="bg-green-600"
				/>
			)}
		</div>
	);
};

export default TimeAndProgress;
