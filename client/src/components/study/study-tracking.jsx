"use client";

import React, { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import { Button } from "../ui/button";
import { Brain, CheckCircle2, Circle, Pause, Play, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

import { useStudy } from "@/hooks/use-study-session";
import FocusChart from "./study-tracking/focus-chart";
import SubjectAndTags from "./study-tracking/subjects-and-tags";
import TimeAndProgress from "./study-tracking/time-and-progress";
import { Label } from "../ui/label";
import NameAndDescription from "./study-tracking/name-and-description";
import TaskList from "./study-tracking/task-list";

const StudyTracking = () => {
	const {
		sessionData,
		setSessionData,

		isPaused,
		setIsPaused,
		isSessionActive,
		setIsSessionActive,

		maxTime,
		setMaxTime,
		timeRemaining,
		setTimeRemaining,

		endSession,
	} = useStudy();
	// Timer state
	const [progressPercentage, setProgressPercentage] = useState(100);
	const [sessionTasks, setSessionTasks] = useState([]);

	// Timer effect
	useEffect(() => {
		let interval = null;
		if (isSessionActive && !isPaused && timeRemaining > 0) {
			interval = setInterval(() => {
				setTimeRemaining((time) => time - 1);
				setProgressPercentage(() => (timeRemaining / maxTime) * 100);
			}, 1000);
		} else if (timeRemaining === 0 && isSessionActive) {
			// Handle session completion or break transition
			if (sessionData.method === "pomodoro") {
				if (!sessionData.isBreak) {
					// Switch to break
					setSessionData((prev) => ({ ...prev, isBreak: true }));
					setTimeRemaining(sessionData.breakDuration * 60);
					setMaxTime(sessionData.breakDuration * 60);
				} else {
					// End break, start next cycle or finish
					if (sessionData.currentCycle < sessionData.cycles) {
						setSessionData((prev) => ({
							...prev,
							isBreak: false,
							currentCycle: prev.currentCycle + 1,
						}));
						setTimeRemaining(sessionData.duration * 60);
						setMaxTime(sessionData.duration * 60);
					} else {
						// Session complete
						setIsSessionActive(false);
						endSession();
					}
				}
			} else {
				// Session complete for other methods
				setIsSessionActive(false);
			}
		}
		return () => clearInterval(interval);
	}, [isSessionActive, isPaused, timeRemaining]);

	const pauseSession = () => {
		setIsPaused(!isPaused);
	};

	const toggleTask = (id) => {
		setSessionTasks(
			sessionTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">
					Phiên học đang diễn ra
				</h1>
			</div>

			<div className="gap-6">
				{/* Session Info */}
				<Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
					<CardHeader>
						<CardTitle className="flex flex-row items-center gap-2 text-xl text-green-700">
							<Brain className="h-5 w-5 text-green-600" />
							Thông tin phiên học
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Name and Description */}
						<NameAndDescription />

						{/* Subjects and Tags */}
						<SubjectAndTags />

						{/* Time and Progress */}
						<TimeAndProgress
							progressPercentage={progressPercentage}
						/>

						{/* Tasks */}
						<TaskList />

						{/* Focus Chart */}
						<FocusChart />

						<div className="flex gap-2 items-center justify-center">
							<Button
								onClick={pauseSession}
								variant="outline"
								size="sm"
							>
								{isPaused ? (
									<Play className="h-4 w-4" />
								) : (
									<Pause className="h-4 w-4" />
								)}
								{isPaused ? "Tiếp tục" : "Tạm dừng"}
							</Button>
							<Button
								onClick={endSession}
								variant="destructive"
								size="sm"
							>
								<Square className="h-4 w-4" />
								Kết thúc
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StudyTracking;
