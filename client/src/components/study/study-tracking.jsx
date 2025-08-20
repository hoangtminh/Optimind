"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Brain, CheckCircle2, Circle, Pause, Play, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const StudyTracking = () => {
	// Session state
	const [activeTab, setActiveTab] = useState("countdown");
	const [isRunning, setIsRunning] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);
	const [currentCycle, setCurrentCycle] = useState(1);
	const [isBreakTime, setIsBreakTime] = useState(false);

	// Timer state
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	// Session configuration
	const [pomodoroStudy, setPomodoroStudy] = useState(25);
	const [pomodoroBreak, setPomodoroBreak] = useState(5);
	const [pomodoroCycles, setPomodoroCycles] = useState(4);
	const [sessionTasks, setSessionTasks] = useState([]);

	// Focus tracking
	const [focusData, setFocusData] = useState([]);
	const [currentFocus, setCurrentFocus] = useState(85);

	const [isSessionActive, setIsSessionActive] = useState(false);
	const [sessionData, setSessionData] = useState({
		method: "countdown",
		subject: "",
		tags: [],
		tasks: [],
		duration: 25,
		breakDuration: 5,
		cycles: 4,
		currentCycle: 1,
		isBreak: false,
	});
	// Timer effect
	useEffect(() => {
		let interval = null;
		if (isSessionActive && !isPaused && timeRemaining > 0) {
			interval = setInterval(() => {
				setTimeRemaining((time) => time - 1);
			}, 1000);
		} else if (timeRemaining === 0 && isSessionActive) {
			// Handle session completion or break transition
			if (sessionData.method === "pomodoro") {
				if (!sessionData.isBreak) {
					// Switch to break
					setSessionData((prev) => ({ ...prev, isBreak: true }));
					setTimeRemaining(sessionData.breakDuration * 60);
					setTotalTime(sessionData.breakDuration * 60);
				} else {
					// End break, start next cycle or finish
					if (sessionData.currentCycle < sessionData.cycles) {
						setSessionData((prev) => ({
							...prev,
							isBreak: false,
							currentCycle: prev.currentCycle + 1,
						}));
						setTimeRemaining(sessionData.duration * 60);
						setTotalTime(sessionData.duration * 60);
					} else {
						// Session complete
						setIsSessionActive(false);
					}
				}
			} else {
				// Session complete for other methods
				setIsSessionActive(false);
			}
		}
		return () => clearInterval(interval);
	}, [isSessionActive, isPaused, timeRemaining, sessionData]);

	// Focus data simulation
	useEffect(() => {
		if (isSessionActive) {
			const interval = setInterval(() => {
				const newFocus = Math.max(
					20,
					Math.min(100, currentFocus + (Math.random() - 0.5) * 10)
				);
				setCurrentFocus(newFocus);

				const now = new Date();
				const timeLabel = `${now
					.getMinutes()
					.toString()
					.padStart(2, "0")}:${now
					.getSeconds()
					.toString()
					.padStart(2, "0")}`;

				setFocusData((prev) => {
					const newData = [
						...prev,
						{ time: timeLabel, focus: Math.round(newFocus) },
					];
					// Keep only last 2 minutes (120 data points at 1 second intervals)
					return newData.slice(-120);
				});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [isSessionActive, currentFocus]);

	const pauseSession = () => {
		setIsPaused(!isPaused);
	};

	const stopSession = () => {
		setIsRunning(false);
		setIsPaused(false);
		setTimeLeft(0);
		setCurrentCycle(1);
		setIsBreakTime(false);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	const toggleTask = (id) => {
		setSessionTasks(
			sessionTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const getProgressPercentage = () => {
		if (totalTime === 0) return 0;
		return ((totalTime - timeRemaining) / totalTime) * 100;
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">
					Phiên học đang diễn ra
				</h1>
				<div className="flex gap-2">
					<Button onClick={pauseSession} variant="outline" size="sm">
						{isPaused ? (
							<Play className="h-4 w-4" />
						) : (
							<Pause className="h-4 w-4" />
						)}
						{isPaused ? "Tiếp tục" : "Tạm dừng"}
					</Button>
					<Button
						onClick={stopSession}
						variant="destructive"
						size="sm"
					>
						<Square className="h-4 w-4" />
						Kết thúc
					</Button>
				</div>
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
						{/* Subject and Tags */}
						<div>
							<div className="flex items-center gap-2 mb-2">
								<span className="font-medium text-gray-700">
									Môn học:
								</span>
								<span className="text-lg font-semibold text-indigo-600">
									{sessionData.subject || "Không chọn môn"}
								</span>
							</div>
							<div className="flex items-center gap-2 mb-2">
								<span className="font-medium text-gray-700">
									Tags:
								</span>
								{sessionData.tags.length > 0 ? (
									<div className="flex flex-wrap gap-2">
										{sessionData.tags.map((tag) => (
											<Badge
												key={tag.id}
												style={{
													backgroundColor: tag.color,
													color: "white",
												}}
											>
												{tag.name}
											</Badge>
										))}
									</div>
								) : (
									"No tags"
								)}
							</div>
						</div>

						{/* Time and Progress */}
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="font-medium text-gray-700">
									Thời gian còn lại:
								</span>
								<div className="text-right">
									<div className="text-3xl font-bold text-indigo-600">
										{sessionData.method === "freeform"
											? formatTime(
													Math.floor(
														Date.now() / 1000
													) % 3600
											  )
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
									value={getProgressPercentage()}
									className="h-3"
								/>
							)}
						</div>

						{/* Tasks */}
						{sessionData.tasks.length > 0 && (
							<div>
								<h4 className="font-medium text-gray-700 mb-3">
									Nhiệm vụ:
								</h4>
								<div className="space-y-2">
									{sessionData.tasks.map((task) => (
										<div
											key={task.id}
											className="flex items-center gap-2"
										>
											<button
												onClick={() =>
													toggleTask(task.id)
												}
												className="flex-shrink-0"
											>
												{task.completed ? (
													<CheckCircle2 className="h-5 w-5 text-green-600" />
												) : (
													<Circle className="h-5 w-5 text-gray-400" />
												)}
											</button>
											<span
												className={`${
													task.completed
														? "line-through text-gray-500"
														: "text-gray-900"
												}`}
											>
												{task.text}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Focus Chart */}
						<div>
							<h4 className="font-medium text-gray-700 mb-3">
								Độ tập trung (2 phút gần nhất)
							</h4>
							<div className="h-32 w-full">
								<ResponsiveContainer
									className={"h-[300px]"}
									width="100%"
									height="100%"
								>
									<LineChart data={focusData}>
										<XAxis
											dataKey="time"
											axisLine={false}
											tickLine={false}
											tick={{ fontSize: 12 }}
										/>
										<YAxis
											domain={[0, 100]}
											axisLine={false}
											tickLine={false}
											tick={{ fontSize: 12 }}
										/>
										<Line
											type="monotone"
											dataKey="focus"
											stroke="#4f46e5"
											strokeWidth={2}
											dot={false}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
							<div className="text-center mt-2">
								<span className="text-sm text-gray-600">
									Độ tập trung hiện tại:
									<span className="font-semibold text-indigo-600 ml-1">
										{Math.round(currentFocus)}%
									</span>
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StudyTracking;
