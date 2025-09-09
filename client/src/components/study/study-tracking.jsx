"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Brain, Pause, Play, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { useStudy } from "@/hooks/use-study-session";
import FocusChart from "./focus-chart";
import SubjectAndTags from "./study-tracking/subjects-and-tags";
import TimeAndProgress from "./study-tracking/time-and-progress";
import NameAndDescription from "./study-tracking/name-and-description";
import TaskList from "./study-tracking/task-list";
import Camera from "./camera";
import StudyProgressList from "./study-tracking/progress-list";

const StudyTracking = () => {
	const {
		sessionData,
		setSessionData,
		sessionStudyProgress,
		setSessionStudyProgress,

		isPaused,
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
	const [activeProgress, setActiveProgress] = useState(
		sessionStudyProgress[0]
	);

	const changeActiveProgress = (progress) => {
		setActiveProgress(progress);
	};

	// Timer effect
	useEffect(() => {
		let interval = null;
		if (isSessionActive && !isPaused && timeRemaining > 0) {
			interval = setInterval(() => {
				setTimeRemaining((time) => time - 1);
				setProgressPercentage(() => (timeRemaining / maxTime) * 100);
				if (!sessionData.isBreak) {
					setSessionStudyProgress((prev) =>
						prev.map((studyProgress) =>
							studyProgress._id === activeProgress._id
								? {
										...studyProgress,
										progress: (studyProgress.progress += 1),
								  }
								: studyProgress
						)
					);
				}
			}, 1000);
		} else if (timeRemaining === 0 && isSessionActive) {
			// Handle session completion or break transition
			if (sessionData.method === "pomodoro") {
				if (!sessionData.isBreak) {
					// Switch to break
					setSessionData((prev) => ({ ...prev, isBreak: true }));
					setTimeRemaining(sessionData.breakTime * 60);
					setMaxTime(sessionData.breakTime * 60);
				} else {
					// End break, start next cycle or finish
					if (sessionData.currentCycle < sessionData.cycles) {
						setSessionData((prev) => ({
							...prev,
							isBreak: false,
							currentCycle: prev.currentCycle + 1,
						}));
						setTimeRemaining(sessionData.studyTime * 60);
						setMaxTime(sessionData.studyTime * 60);
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
						<div className="grid grid-cols-5 gap-4">
							<div className="space-y-2 col-span-3 ">
								{/* Name and Description */}
								<NameAndDescription />

								{/* Subjects and Tags */}
								<SubjectAndTags />
							</div>

							<div className="col-span-2">
								{/* Time and Progress */}
								<TimeAndProgress
									progressPercentage={progressPercentage}
								/>
							</div>
						</div>

						{/* Tasks and Progress */}
						<div className="grid grid-cols-2 gap-4">
							<TaskList />
							<StudyProgressList
								activeProgress={activeProgress}
								changeActiveProgress={changeActiveProgress}
							/>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-2">
							{/* Focus Chart */}
							<Camera />
							<FocusChart />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StudyTracking;
