import { Button } from "@/components/ui/button";
import { useStudy } from "@/hooks/use-study-session";
import { formatTime } from "@/lib/utils";
import { Pause, Play, Square } from "lucide-react";
import React from "react";

const TimeAndProgress = ({ progressPercentage }) => {
	const { sessionData, timeRemaining, setIsPaused, isPaused, endSession } =
		useStudy();

	const progress = progressPercentage;
	const circumference = 2 * Math.PI * 60; // radius of 45
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	const pauseSession = () => {
		setIsPaused(!isPaused);
	};

	return (
		<div className="space-y-3 bg-white p-3 rounded-lg shadow-lg border-gray-400/70">
			<span className="text-lg font-medium text-gray-700 capitalize">
				{sessionData.method}
			</span>

			{sessionData.method !== "freeform" && (
				<div className="flex justify-center items-center">
					<div className="relative w-45 h-45">
						<svg
							className="w-45 h-45 transform -rotate-90"
							viewBox="0 0 120 120"
						>
							{/* Blue background circle */}
							<circle
								cx="60"
								cy="60"
								r="55"
								stroke="#3b82f6"
								strokeWidth="8"
								fill="none"
								className="opacity-20"
							/>
							{/* Green progress circle */}
							<circle
								cx="60"
								cy="60"
								r="55"
								stroke="#22c55e"
								strokeWidth="8"
								fill="none"
								strokeDasharray={strokeDasharray}
								strokeDashoffset={strokeDashoffset}
								className={`transition-all duration-${
									timeRemaining * 1000
								} ease-linear`}
								strokeLinecap="round"
							/>
						</svg>
						{/* Remaining time in center */}
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-2xl font-bold text-foreground">
								<div className="text-center">
									<div className="text-3xl font-bold text-indigo-600"></div>
									{sessionData.method === "pomodoro" && (
										<div className="text-sm">
											{sessionData.isBreak
												? "Giải lao"
												: "Học"}{" "}
											- Chu kỳ {sessionData.currentCycle}/
											{sessionData.cycles}
										</div>
									)}
									{sessionData.method === "countdown" && (
										<div className="text-base">
											Time left
										</div>
									)}
									{sessionData.method === "freeform"
										? formatTime(
												Math.floor(Date.now() / 1000) %
													3600
										  )
										: formatTime(timeRemaining)}
								</div>
							</span>
						</div>
					</div>
				</div>
			)}

			<div className="flex gap-2 items-center justify-center">
				<Button onClick={pauseSession} variant="outline" size="sm">
					{isPaused ? (
						<Play className="h-4 w-4" />
					) : (
						<Pause className="h-4 w-4" />
					)}
					{isPaused ? "Tiếp tục" : "Tạm dừng"}
				</Button>
				<Button onClick={endSession} variant="destructive" size="sm">
					<Square className="h-4 w-4" />
					Kết thúc
				</Button>
			</div>
		</div>
	);
};

export default TimeAndProgress;
