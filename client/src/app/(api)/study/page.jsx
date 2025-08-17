"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
	Play,
	Pause,
	Square,
	Clock,
	BookOpen,
	Target,
	TrendingUp,
	Timer,
	Coffee,
	CheckCircle,
	Plus,
	X,
	Tag,
} from "lucide-react";

export default function TrackingPage() {
	const [isTracking, setIsTracking] = useState(false);
	const [currentSession, setCurrentSession] = useState({
		subject: "",
		startTime: null,
		duration: 0,
		goal: 60,
		method: "",
		methodConfig: {
			countdownDuration: 60,
			pomodoroStudyTime: 25,
			pomodoroBreakTime: 5,
			pomodoroCycles: 4,
		},
		tasks: [],
		tags: [],
	});
	const [newTask, setNewTask] = useState("");
	const [newTag, setNewTag] = useState("");
	const [sessions, setSessions] = useState([
		{
			id: 1,
			subject: "Toán học",
			duration: 120,
			goal: 90,
			date: "2024-01-15",
			efficiency: 85,
			status: "completed",
			method: "pomodoro",
			tasksCompleted: 4,
			totalTasks: 5,
			tags: ["ôn tập", "đại số"],
		},
		{
			id: 2,
			subject: "Vật lý",
			duration: 75,
			goal: 60,
			date: "2024-01-15",
			efficiency: 92,
			status: "completed",
			method: "countdown",
			tasksCompleted: 3,
			totalTasks: 3,
			tags: ["bài mới", "cơ học"],
		},
		{
			id: 3,
			subject: "Hóa học",
			duration: 45,
			goal: 90,
			date: "2024-01-14",
			efficiency: 68,
			status: "incomplete",
			method: "freeform",
			tasksCompleted: 2,
			totalTasks: 4,
			tags: ["thí nghiệm"],
		},
	]);

	const studyMethods = [
		{
			value: "countdown",
			label: "Đếm ngược thời gian",
			icon: Timer,
			description: "Học liên tục trong khoảng thời gian đã định",
		},
		{
			value: "pomodoro",
			label: "Pomodoro",
			icon: Coffee,
			description: "Học với chu kỳ nghỉ ngơi có kế hoạch",
		},
		{
			value: "freeform",
			label: "Tự do",
			icon: CheckCircle,
			description: "Học không giới hạn thời gian, bấm giờ tự do",
		},
	];

	const predefinedTags = [
		"ôn tập",
		"bài mới",
		"thí nghiệm",
		"bài tập",
		"đọc sách",
		"ghi chú",
		"kiểm tra",
		"dự án",
		"nghiên cứu",
		"thảo luận",
	];

	const addTask = () => {
		if (newTask.trim()) {
			setCurrentSession((prev) => ({
				...prev,
				tasks: [
					...prev.tasks,
					{ id: Date.now(), text: newTask.trim(), completed: false },
				],
			}));
			setNewTask("");
		}
	};

	const removeTask = (taskId) => {
		setCurrentSession((prev) => ({
			...prev,
			tasks: prev.tasks.filter((task) => task.id !== taskId),
		}));
	};

	const toggleTask = (taskId) => {
		setCurrentSession((prev) => ({
			...prev,
			tasks: prev.tasks.map((task) =>
				task.id === taskId
					? { ...task, completed: !task.completed }
					: task
			),
		}));
	};

	const addTag = (tagText) => {
		const tag = tagText.trim();
		if (tag && !currentSession.tags.includes(tag)) {
			setCurrentSession((prev) => ({
				...prev,
				tags: [...prev.tags, tag],
			}));
		}
		setNewTag("");
	};

	const removeTag = (tagToRemove) => {
		setCurrentSession((prev) => ({
			...prev,
			tags: prev.tags.filter((tag) => tag !== tagToRemove),
		}));
	};

	const updateMethodConfig = (key, value) => {
		setCurrentSession((prev) => ({
			...prev,
			methodConfig: {
				...prev.methodConfig,
				[key]: Number.parseInt(value) || 0,
			},
		}));
	};

	const startTracking = () => {
		if (currentSession.subject && currentSession.method) {
			setIsTracking(true);
			setCurrentSession((prev) => ({
				...prev,
				startTime: new Date(),
				duration: 0,
			}));
		}
	};

	const pauseTracking = () => {
		setIsTracking(false);
	};

	const stopTracking = () => {
		setIsTracking(false);
		if (currentSession.duration > 0) {
			const completedTasks = currentSession.tasks.filter(
				(task) => task.completed
			).length;
			const newSession = {
				id: sessions.length + 1,
				subject: currentSession.subject,
				duration: currentSession.duration,
				goal: currentSession.goal,
				date: new Date().toISOString().split("T")[0],
				efficiency: Math.floor(Math.random() * 30) + 70,
				status:
					currentSession.duration >= currentSession.goal
						? "completed"
						: "incomplete",
				method: currentSession.method,
				tasksCompleted: completedTasks,
				totalTasks: currentSession.tasks.length,
				tags: currentSession.tags,
			};
			setSessions((prev) => [newSession, ...prev]);
		}
		setCurrentSession({
			subject: "",
			startTime: null,
			duration: 0,
			goal: 60,
			method: "",
			methodConfig: {
				countdownDuration: 60,
				pomodoroStudyTime: 25,
				pomodoroBreakTime: 5,
				pomodoroCycles: 4,
			},
			tasks: [],
			tags: [],
		});
	};

	const formatTime = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${hours}h ${mins}m`;
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "bg-green-500";
			case "incomplete":
				return "bg-orange-500";
			default:
				return "bg-gray-500";
		}
	};

	const getEfficiencyColor = (efficiency) => {
		if (efficiency >= 85) return "text-green-600";
		if (efficiency >= 70) return "text-orange-600";
		return "text-red-600";
	};

	const getMethodLabel = (method) => {
		const methodObj = studyMethods.find((m) => m.value === method);
		return methodObj ? methodObj.label : method;
	};

	const renderMethodConfig = () => {
		if (!currentSession.method) return null;

		switch (currentSession.method) {
			case "countdown":
				return (
					<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
						<Label className="text-sm font-medium text-blue-700">
							Cấu hình đếm ngược
						</Label>
						<div className="mt-2">
							<Label
								htmlFor="countdownDuration"
								className="text-sm"
							>
								Thời gian đếm ngược (phút)
							</Label>
							<Input
								id="countdownDuration"
								type="number"
								value={
									currentSession.methodConfig
										.countdownDuration
								}
								onChange={(e) =>
									updateMethodConfig(
										"countdownDuration",
										e.target.value
									)
								}
								disabled={isTracking}
								min="1"
								max="480"
								className="mt-1"
							/>
						</div>
					</div>
				);

			case "pomodoro":
				return (
					<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
						<Label className="text-sm font-medium text-red-700">
							Cấu hình Pomodoro
						</Label>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
							<div>
								<Label
									htmlFor="pomodoroStudyTime"
									className="text-sm"
								>
									Thời gian học (phút)
								</Label>
								<Input
									id="pomodoroStudyTime"
									type="number"
									value={
										currentSession.methodConfig
											.pomodoroStudyTime
									}
									onChange={(e) =>
										updateMethodConfig(
											"pomodoroStudyTime",
											e.target.value
										)
									}
									disabled={isTracking}
									min="5"
									max="90"
									className="mt-1"
								/>
							</div>
							<div>
								<Label
									htmlFor="pomodoroBreakTime"
									className="text-sm"
								>
									Thời gian nghỉ (phút)
								</Label>
								<Input
									id="pomodoroBreakTime"
									type="number"
									value={
										currentSession.methodConfig
											.pomodoroBreakTime
									}
									onChange={(e) =>
										updateMethodConfig(
											"pomodoroBreakTime",
											e.target.value
										)
									}
									disabled={isTracking}
									min="1"
									max="30"
									className="mt-1"
								/>
							</div>
							<div>
								<Label
									htmlFor="pomodoroCycles"
									className="text-sm"
								>
									Số chu kỳ
								</Label>
								<Input
									id="pomodoroCycles"
									type="number"
									value={
										currentSession.methodConfig
											.pomodoroCycles
									}
									onChange={(e) =>
										updateMethodConfig(
											"pomodoroCycles",
											e.target.value
										)
									}
									disabled={isTracking}
									min="1"
									max="10"
									className="mt-1"
								/>
							</div>
						</div>
						<div className="mt-2 text-sm text-red-600">
							Tổng thời gian dự kiến:{" "}
							{formatTime(
								(currentSession.methodConfig.pomodoroStudyTime +
									currentSession.methodConfig
										.pomodoroBreakTime) *
									currentSession.methodConfig.pomodoroCycles
							)}
						</div>
					</div>
				);

			case "freeform":
				return (
					<div className="p-4 bg-green-50 border border-green-200 rounded-lg">
						<Label className="text-sm font-medium text-green-700">
							Chế độ tự do
						</Label>
						<p className="text-sm text-green-600 mt-1">
							Bấm giờ tự do - bắt đầu và kết thúc khi bạn muốn
						</p>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
					Theo dõi học tập
				</h1>
				<p className="text-gray-600 mt-2">
					Theo dõi thời gian học và hiệu suất của bạn
				</p>
			</div>

			{/* Active Session Tracker */}
			<Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-purple-600" />
						Phiên học hiện tại
					</CardTitle>
					<CardDescription>
						Bắt đầu theo dõi thời gian học của bạn
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Basic Settings */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<Label htmlFor="subject">Môn học</Label>
							<Select
								value={currentSession.subject}
								onValueChange={(value) =>
									setCurrentSession((prev) => ({
										...prev,
										subject: value,
									}))
								}
								disabled={isTracking}
							>
								<SelectTrigger>
									<SelectValue placeholder="Chọn môn học" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="math">
										Toán học
									</SelectItem>
									<SelectItem value="physics">
										Vật lý
									</SelectItem>
									<SelectItem value="chemistry">
										Hóa học
									</SelectItem>
									<SelectItem value="biology">
										Sinh học
									</SelectItem>
									<SelectItem value="literature">
										Văn học
									</SelectItem>
									<SelectItem value="english">
										Tiếng Anh
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="goal">Mục tiêu (phút)</Label>
							<Input
								type="number"
								value={currentSession.goal}
								onChange={(e) =>
									setCurrentSession((prev) => ({
										...prev,
										goal:
											Number.parseInt(e.target.value) ||
											60,
									}))
								}
								disabled={isTracking}
								min="1"
							/>
						</div>
						<div>
							<Label>Thời gian hiện tại</Label>
							<div className="text-2xl font-bold text-purple-600">
								{formatTime(currentSession.duration)}
							</div>
						</div>
					</div>

					{/* Study method selection */}
					<div>
						<Label className="text-base font-semibold">
							Phương pháp học
						</Label>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
							{studyMethods.map((method) => {
								const IconComponent = method.icon;
								return (
									<div
										key={method.value}
										className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
											currentSession.method ===
											method.value
												? "border-purple-500 bg-purple-50"
												: "border-gray-200 hover:border-purple-300"
										} ${
											isTracking
												? "opacity-50 cursor-not-allowed"
												: ""
										}`}
										onClick={() =>
											!isTracking &&
											setCurrentSession((prev) => ({
												...prev,
												method: method.value,
											}))
										}
									>
										<div className="flex items-start gap-3">
											<IconComponent
												className={`h-5 w-5 mt-0.5 ${
													currentSession.method ===
													method.value
														? "text-purple-600"
														: "text-gray-500"
												}`}
											/>
											<div>
												<h4
													className={`font-medium ${
														currentSession.method ===
														method.value
															? "text-purple-700"
															: "text-gray-700"
													}`}
												>
													{method.label}
												</h4>
												<p className="text-sm text-gray-500 mt-1">
													{method.description}
												</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{renderMethodConfig()}

					<div>
						<Label className="text-base font-semibold flex items-center gap-2">
							<Tag className="h-4 w-4" />
							Tags phân loại
						</Label>
						<div className="space-y-3 mt-3">
							<div className="flex gap-2">
								<Input
									placeholder="Thêm tag để phân loại phiên học..."
									value={newTag}
									onChange={(e) => setNewTag(e.target.value)}
									onKeyPress={(e) =>
										e.key === "Enter" && addTag(newTag)
									}
									disabled={isTracking}
								/>
								<Button
									onClick={() => addTag(newTag)}
									disabled={!newTag.trim() || isTracking}
									size="sm"
									className="bg-blue-600 hover:bg-blue-700"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>

							{/* Predefined tags */}
							<div className="flex flex-wrap gap-2">
								<span className="text-sm text-gray-500">
									Gợi ý:
								</span>
								{predefinedTags.map((tag) => (
									<Badge
										key={tag}
										variant="outline"
										className={`cursor-pointer hover:bg-blue-50 ${
											currentSession.tags.includes(tag)
												? "bg-blue-100 border-blue-300"
												: ""
										} ${
											isTracking
												? "opacity-50 cursor-not-allowed"
												: ""
										}`}
										onClick={() =>
											!isTracking &&
											!currentSession.tags.includes(
												tag
											) &&
											addTag(tag)
										}
									>
										{tag}
									</Badge>
								))}
							</div>

							{/* Current tags */}
							{currentSession.tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									<span className="text-sm text-gray-500">
										Tags đã chọn:
									</span>
									{currentSession.tags.map((tag) => (
										<Badge
											key={tag}
											className="bg-purple-100 text-purple-700 border-purple-300"
										>
											{tag}
											{!isTracking && (
												<X
													className="h-3 w-3 ml-1 cursor-pointer hover:text-purple-900"
													onClick={() =>
														removeTag(tag)
													}
												/>
											)}
										</Badge>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Task planning section */}
					<div>
						<Label className="text-base font-semibold">
							Kế hoạch nhiệm vụ
						</Label>
						<div className="space-y-3 mt-3">
							<div className="flex gap-2">
								<Input
									placeholder="Thêm nhiệm vụ cần hoàn thành..."
									value={newTask}
									onChange={(e) => setNewTask(e.target.value)}
									onKeyPress={(e) =>
										e.key === "Enter" && addTask()
									}
									disabled={isTracking}
								/>
								<Button
									onClick={addTask}
									disabled={!newTask.trim() || isTracking}
									size="sm"
									className="bg-green-600 hover:bg-green-700"
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>

							{currentSession.tasks.length > 0 && (
								<div className="space-y-2 max-h-40 overflow-y-auto">
									{currentSession.tasks.map((task) => (
										<div
											key={task.id}
											className={`flex items-center gap-3 p-3 border rounded-lg ${
												task.completed
													? "bg-green-50 border-green-200"
													: "bg-gray-50 border-gray-200"
											}`}
										>
											<input
												type="checkbox"
												checked={task.completed}
												onChange={() =>
													toggleTask(task.id)
												}
												className="h-4 w-4 text-green-600 rounded"
											/>
											<span
												className={`flex-1 ${
													task.completed
														? "line-through text-gray-500"
														: "text-gray-700"
												}`}
											>
												{task.text}
											</span>
											{!isTracking && (
												<Button
													onClick={() =>
														removeTask(task.id)
													}
													variant="ghost"
													size="sm"
													className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
												>
													<X className="h-4 w-4" />
												</Button>
											)}
										</div>
									))}
									<div className="text-sm text-gray-500 text-center pt-2">
										{
											currentSession.tasks.filter(
												(t) => t.completed
											).length
										}{" "}
										/ {currentSession.tasks.length} nhiệm vụ
										hoàn thành
									</div>
								</div>
							)}
						</div>
					</div>

					<Separator />

					{currentSession.goal > 0 && (
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Tiến độ</span>
								<span>
									{Math.round(
										(currentSession.duration /
											currentSession.goal) *
											100
									)}
									%
								</span>
							</div>
							<Progress
								value={
									(currentSession.duration /
										currentSession.goal) *
									100
								}
								className="h-2"
							/>
						</div>
					)}

					<div className="flex gap-2">
						{!isTracking ? (
							<Button
								onClick={startTracking}
								disabled={
									!currentSession.subject ||
									!currentSession.method
								}
								className="bg-green-600 hover:bg-green-700"
							>
								<Play className="h-4 w-4 mr-2" />
								Bắt đầu
							</Button>
						) : (
							<Button onClick={pauseTracking} variant="outline">
								<Pause className="h-4 w-4 mr-2" />
								Tạm dừng
							</Button>
						)}
						<Button
							onClick={stopTracking}
							variant="destructive"
							disabled={
								!isTracking && currentSession.duration === 0
							}
						>
							<Square className="h-4 w-4 mr-2" />
							Kết thúc
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Today's Summary */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-blue-600 font-medium">
									Hôm nay
								</p>
								<p className="text-2xl font-bold text-blue-700">
									4h 30m
								</p>
							</div>
							<Clock className="h-8 w-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-green-600 font-medium">
									Phiên học
								</p>
								<p className="text-2xl font-bold text-green-700">
									3
								</p>
							</div>
							<BookOpen className="h-8 w-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-orange-600 font-medium">
									Mục tiêu
								</p>
								<p className="text-2xl font-bold text-orange-700">
									85%
								</p>
							</div>
							<Target className="h-8 w-8 text-orange-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-purple-600 font-medium">
									Hiệu suất
								</p>
								<p className="text-2xl font-bold text-purple-700">
									88%
								</p>
							</div>
							<TrendingUp className="h-8 w-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Recent Sessions */}
			<Card>
				<CardHeader>
					<CardTitle>Phiên học gần đây</CardTitle>
					<CardDescription>
						Lịch sử các phiên học của bạn
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{sessions.map((session) => (
							<div
								key={session.id}
								className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-center gap-4">
									<div
										className={`w-3 h-3 rounded-full ${getStatusColor(
											session.status
										)}`}
									/>
									<div>
										<p className="font-medium">
											{session.subject}
										</p>
										<p className="text-sm text-gray-500">
											{session.date}
										</p>
										{/* Method and task completion info */}
										<div className="flex items-center gap-2 mt-1">
											<Badge
												variant="outline"
												className="text-xs"
											>
												{getMethodLabel(session.method)}
											</Badge>
											<span className="text-xs text-gray-500">
												{session.tasksCompleted}/
												{session.totalTasks} nhiệm vụ
											</span>
										</div>
										{session.tags &&
											session.tags.length > 0 && (
												<div className="flex flex-wrap gap-1 mt-1">
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
											)}
									</div>
								</div>
								<div className="flex items-center gap-6">
									<div className="text-center">
										<p className="text-sm text-gray-500">
											Thời gian
										</p>
										<p className="font-medium">
											{formatTime(session.duration)}
										</p>
									</div>
									<div className="text-center">
										<p className="text-sm text-gray-500">
											Mục tiêu
										</p>
										<p className="font-medium">
											{formatTime(session.goal)}
										</p>
									</div>
									<div className="text-center">
										<p className="text-sm text-gray-500">
											Hiệu suất
										</p>
										<p
											className={`font-medium ${getEfficiencyColor(
												session.efficiency
											)}`}
										>
											{session.efficiency}%
										</p>
									</div>
									<Badge
										variant={
											session.status === "completed"
												? "default"
												: "secondary"
										}
									>
										{session.status === "completed"
											? "Hoàn thành"
											: "Chưa đạt"}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
