"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Book, Play, Plus, X } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { subjects } from "@/lib/study-data";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

const PrepareTracking = () => {
	// Session state
	const [activeTab, setActiveTab] = useState("countdown");
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);
	const [currentCycle, setCurrentCycle] = useState(1);
	const [isBreakTime, setIsBreakTime] = useState(false);

	const [isSessionActive, setIsSessionActive] = useState(false);

	// Session configuration
	const [countdownMinutes, setCountdownMinutes] = useState(25);
	const [pomodoroStudy, setPomodoroStudy] = useState(25);
	const [pomodoroBreak, setPomodoroBreak] = useState(5);
	const [pomodoroCycles, setPomodoroCycles] = useState(4);
	const [selectedSubject, setSelectedSubject] = useState("");
	const [sessionTasks, setSessionTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [selectedTags, setSelectedTags] = useState([]);

	// Sample data
	const [availableTags, setAvailableTags] = useState([
		{ id: 1, name: "Ôn tập", color: "#6b7280" },
		{ id: 2, name: "Bài tập", color: "#6b7280" },
		{ id: 3, name: "Đọc sách", color: "#6b7280" },
		{ id: 4, name: "Nghiên cứu", color: "#6b7280" },
		{ id: 5, name: "Thực hành", color: "#6b7280" },
	]);

	const startSession = () => {
		let duration = 0;
		let method = activeTab;

		if (activeTab === "countdown") {
			duration = countdownMinutes * 60;
		} else if (activeTab === "pomodoro") {
			duration = pomodoroStudy * 60;
			method = "pomodoro";
		} else {
			duration = 0; // Freeform has no set duration
		}

		setSessionData({
			method,
			subject: selectedSubject,
			tags: selectedTags,
			tasks: sessionTasks,
			duration:
				activeTab === "pomodoro" ? pomodoroStudy : countdownMinutes,
			breakDuration: pomodoroBreak,
			cycles: pomodoroCycles,
			currentCycle: 1,
			isBreak: false,
		});

		setTimeRemaining(duration);
		setTotalTime(duration);
		setIsSessionActive(true);
		setIsPaused(false);
		setFocusData([]);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	const addTask = () => {
		if (newTask.trim()) {
			setSessionTasks([
				...sessionTasks,
				{ id: Date.now(), text: newTask, completed: false },
			]);
			setNewTask("");
		}
	};

	const toggleTask = (id) => {
		setSessionTasks(
			sessionTasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const removeTask = (id) => {
		setSessionTasks(sessionTasks.filter((task) => task.id !== id));
	};

	return (
		<Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
			<CardHeader>
				<CardTitle className="flex flex-row items-center gap-2 text-xl text-green-700">
					<Book className="w-5 h-5" />
					Chuẩn bị phiên học
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Study Methods Tabs */}
				<div>
					<Label className="text-base font-medium mb-3 block">
						Phương pháp học
					</Label>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList className="grid  w-full grid-cols-3 bg-green-500">
							<TabsTrigger
								className={
									activeTab !== "countdown" &&
									"text-white font-bold"
								}
								value="countdown"
							>
								Đếm ngược
							</TabsTrigger>
							<TabsTrigger
								className={
									activeTab !== "pomodoro" &&
									"text-white font-bold"
								}
								value="pomodoro"
							>
								Pomodoro
							</TabsTrigger>
							<TabsTrigger
								className={
									activeTab !== "free" &&
									"text-white font-bold"
								}
								value="free"
							>
								Free
							</TabsTrigger>
						</TabsList>
						<TabsContent value="countdown" className="mt-4">
							<div className="space-y-4 w-full">
								<div className="w-full flex flex-col justify-center items-center space-y-2">
									<Label
										htmlFor="countdown-time"
										className="text-base"
									>
										Thời gian (phút)
									</Label>
									<Input
										id="countdown-time"
										type="number"
										value={countdownMinutes}
										onChange={(e) =>
											setCountdownMinutes(
												Number.parseInt(
													e.target.value
												) || 1
											)
										}
										className="w-25 h-10 shadow-md border-green-300"
										min="1"
										max="180"
									/>
								</div>
								<div className="text-center">
									<div className="text-4xl font-mono font-bold text-slate-700 mb-4">
										{formatTime(
											isRunning
												? timeLeft
												: countdownMinutes * 60
										)}
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="pomodoro" className="mt-4">
							<div className="space-y-4">
								<div className="grid grid-cols-3 gap-4">
									<div className="flex flex-col gap-2">
										<Label htmlFor="pomodoro-study">
											Học (phút)
										</Label>
										<Input
											id="pomodoro-study"
											type="number"
											value={pomodoroStudy}
											onChange={(e) =>
												setPomodoroStudy(
													Number.parseInt(
														e.target.value
													) || 1
												)
											}
											className="w-full h-10 shadow-md border-green-300"
											min="1"
											max="60"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<Label htmlFor="pomodoro-break">
											Nghỉ (phút)
										</Label>
										<Input
											id="pomodoro-break"
											type="number"
											value={pomodoroBreak}
											onChange={(e) =>
												setPomodoroBreak(
													Number.parseInt(
														e.target.value
													) || 5
												)
											}
											className="w-full h-10 shadow-md border-green-300"
											min="1"
											max="30"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<Label htmlFor="pomodoro-cycles">
											Chu kỳ
										</Label>
										<Input
											id="pomodoro-cycles"
											type="number"
											value={pomodoroCycles}
											onChange={(e) =>
												setPomodoroCycles(
													Number.parseInt(
														e.target.value
													) || 4
												)
											}
											className="w-full h-10 shadow-md border-green-300"
											min="1"
											max="10"
										/>
									</div>
								</div>
								<div className="text-center">
									<div className="text-4xl font-mono font-bold text-slate-700 mb-2">
										{formatTime(
											isRunning
												? timeLeft
												: pomodoroStudy * 60
										)}
									</div>
									<div className="text-sm text-slate-500">
										{isRunning && (
											<span>
												{isBreakTime ? "Nghỉ" : "Học"} -
												Chu kỳ {currentCycle}/
												{pomodoroCycles}
											</span>
										)}
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="free" className="mt-4">
							<div className="text-center">
								<div className="text-4xl font-mono font-bold text-slate-700 mb-4">
									{formatTime(timeLeft)}
								</div>
								<p className="text-sm text-slate-500">
									Bấm giờ tự do
								</p>
							</div>
						</TabsContent>
					</Tabs>
				</div>

				{/* Subject Selection */}
				<div>
					<Label className="text-md font-medium mb-3 block">
						Môn học (tùy chọn)
					</Label>
					<Select
						value={selectedSubject}
						onValueChange={setSelectedSubject}
					>
						<SelectTrigger
							className={
								"bg-white h-10 shadow-md border-green-300"
							}
						>
							<SelectValue placeholder="Chọn môn học" />
						</SelectTrigger>
						<SelectContent>
							{subjects.map((subject) => (
								<SelectItem key={subject} value={subject}>
									{subject}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Task Planning */}
				<div>
					<Label className="text-md font-medium mb-3">
						Nhiệm vụ trong phiên học
					</Label>
					<div className="space-y-3">
						<div className="flex gap-2">
							<Input
								placeholder="Thêm nhiệm vụ..."
								value={newTask}
								onChange={(e) => setNewTask(e.target.value)}
								onKeyPress={(e) =>
									e.key === "Enter" && addTask()
								}
								className={"h-10 shadow-md border-green-300"}
							/>
							<Button
								onClick={addTask}
								size="lg"
								className={
									"h-auto bg-green-500 hover:bg-green-600 hover:scale-110 hover:cursor-pointer"
								}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						{sessionTasks.length > 0 && (
							<div className="space-y-2 max-h-32 overflow-y-auto">
								{sessionTasks.map((task) => (
									<div
										key={task.id}
										className="flex items-center gap-2 p-2 bg-white rounded border-green-300 shadow-md"
									>
										{isRunning && (
											<Checkbox
												variant="ghost"
												size="sm"
												onClick={() =>
													toggleTask(task.id)
												}
												className={`${
													task.completed
														? "text-green-600"
														: "text-slate-400"
												}`}
											></Checkbox>
										)}
										<span
											className={`pl-3 flex-1 text-md ${
												task.completed
													? "line-through text-slate-400"
													: "text-slate-700"
											}`}
										>
											{task.text}
										</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => removeTask(task.id)}
											className="p-0 text-slate-400 hover:text-red-500"
										>
											<X className="h-6 w-6" />
										</Button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Session Tags */}
				<div>
					<Label className="text-md font-medium mb-3 block">
						Tags cho phiên học
					</Label>
					<div className="flex flex-wrap gap-2">
						{availableTags.map((tag) => (
							<Badge
								key={tag.id}
								variant={
									selectedTags.includes(tag.id)
										? "default"
										: "outline"
								}
								className="cursor-pointer"
								style={{
									backgroundColor: selectedTags.includes(
										tag.id
									)
										? tag.color
										: "transparent",
									borderColor: tag.color,
									color: selectedTags.includes(tag.id)
										? "white"
										: tag.color,
								}}
								onClick={() => {
									setSelectedTags((prev) =>
										prev.includes(tag.id)
											? prev.filter((id) => id !== tag.id)
											: [...prev, tag.id]
									);
								}}
							>
								{tag.name}
							</Badge>
						))}
					</div>
				</div>

				{/* Control Buttons */}
				<Button
					onClick={startSession}
					className="w-full bg-green-600 hover:bg-green-700 hover:cursor-pointer"
					size="lg"
				>
					<Play className="h-5 w-5 mr-2" />
					Bắt đầu phiên học
				</Button>
			</CardContent>
		</Card>
	);
};

export default PrepareTracking;
