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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Target,
	Plus,
	Calendar,
	Clock,
	TrendingUp,
	Award,
	Edit,
	Trash2,
} from "lucide-react";

export default function GoalsPage() {
	const [goals, setGoals] = useState([
		{
			id: 1,
			title: "Hoàn thành chương Đạo hàm",
			subject: "Toán học",
			type: "study",
			target: 20,
			current: 15,
			unit: "hours",
			deadline: "2024-02-15",
			priority: "high",
			status: "active",
		},
		{
			id: 2,
			title: "Đạt 8.5 điểm kiểm tra Vật lý",
			subject: "Vật lý",
			type: "score",
			target: 8.5,
			current: 7.8,
			unit: "points",
			deadline: "2024-02-10",
			priority: "high",
			status: "active",
		},
		{
			id: 3,
			title: "Học 30 từ vựng tiếng Anh mới",
			subject: "Tiếng Anh",
			type: "quantity",
			target: 30,
			current: 22,
			unit: "words",
			deadline: "2024-02-20",
			priority: "medium",
			status: "active",
		},
		{
			id: 4,
			title: "Hoàn thành bài tập Hóa học",
			subject: "Hóa học",
			type: "task",
			target: 10,
			current: 10,
			unit: "exercises",
			deadline: "2024-01-30",
			priority: "low",
			status: "completed",
		},
	]);

	const [newGoal, setNewGoal] = useState({
		title: "",
		subject: "",
		type: "study",
		target: "",
		unit: "hours",
		deadline: "",
		priority: "medium",
	});

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const addGoal = () => {
		if (
			newGoal.title &&
			newGoal.subject &&
			newGoal.target &&
			newGoal.deadline
		) {
			const goal = {
				id: goals.length + 1,
				...newGoal,
				target: Number.parseFloat(newGoal.target),
				current: 0,
				status: "active",
			};
			setGoals([...goals, goal]);
			setNewGoal({
				title: "",
				subject: "",
				type: "study",
				target: "",
				unit: "hours",
				deadline: "",
				priority: "medium",
			});
			setIsDialogOpen(false);
		}
	};

	const deleteGoal = (id) => {
		setGoals(goals.filter((goal) => goal.id !== id));
	};

	const updateProgress = (id, newCurrent) => {
		setGoals(
			goals.map((goal) =>
				goal.id === id
					? {
							...goal,
							current: newCurrent,
							status:
								newCurrent >= goal.target
									? "completed"
									: "active",
					  }
					: goal
			)
		);
	};

	const getProgressPercentage = (current, target) => {
		return Math.min((current / target) * 100, 100);
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "high":
				return "bg-red-500";
			case "medium":
				return "bg-orange-500";
			case "low":
				return "bg-green-500";
			default:
				return "bg-gray-500";
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "completed":
				return "bg-green-100 text-green-800 border-green-200";
			case "active":
				return "bg-blue-100 text-blue-800 border-blue-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getDaysLeft = (deadline) => {
		const today = new Date();
		const deadlineDate = new Date(deadline);
		const diffTime = deadlineDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const activeGoals = goals.filter((goal) => goal.status === "active");
	const completedGoals = goals.filter((goal) => goal.status === "completed");
	const totalProgress =
		goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
						Mục tiêu học tập
					</h1>
					<p className="text-gray-600 mt-2">
						Đặt và theo dõi các mục tiêu học tập của bạn
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-green-600 hover:bg-green-700">
							<Plus className="h-4 w-4 mr-2" />
							Thêm mục tiêu
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Tạo mục tiêu mới</DialogTitle>
							<DialogDescription>
								Đặt một mục tiêu học tập mới để theo dõi tiến độ
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="title">Tiêu đề mục tiêu</Label>
								<Input
									id="title"
									value={newGoal.title}
									onChange={(e) =>
										setNewGoal({
											...newGoal,
											title: e.target.value,
										})
									}
									placeholder="Ví dụ: Hoàn thành chương 1"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="subject">Môn học</Label>
									<Select
										value={newGoal.subject}
										onValueChange={(value) =>
											setNewGoal({
												...newGoal,
												subject: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Chọn môn học" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Toán học">
												Toán học
											</SelectItem>
											<SelectItem value="Vật lý">
												Vật lý
											</SelectItem>
											<SelectItem value="Hóa học">
												Hóa học
											</SelectItem>
											<SelectItem value="Sinh học">
												Sinh học
											</SelectItem>
											<SelectItem value="Văn học">
												Văn học
											</SelectItem>
											<SelectItem value="Tiếng Anh">
												Tiếng Anh
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="type">Loại mục tiêu</Label>
									<Select
										value={newGoal.type}
										onValueChange={(value) =>
											setNewGoal({
												...newGoal,
												type: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="study">
												Thời gian học
											</SelectItem>
											<SelectItem value="score">
												Điểm số
											</SelectItem>
											<SelectItem value="quantity">
												Số lượng
											</SelectItem>
											<SelectItem value="task">
												Nhiệm vụ
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="target">Mục tiêu</Label>
									<Input
										id="target"
										type="number"
										value={newGoal.target}
										onChange={(e) =>
											setNewGoal({
												...newGoal,
												target: e.target.value,
											})
										}
										placeholder="Nhập số"
									/>
								</div>
								<div>
									<Label htmlFor="unit">Đơn vị</Label>
									<Select
										value={newGoal.unit}
										onValueChange={(value) =>
											setNewGoal({
												...newGoal,
												unit: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="hours">
												Giờ
											</SelectItem>
											<SelectItem value="points">
												Điểm
											</SelectItem>
											<SelectItem value="words">
												Từ
											</SelectItem>
											<SelectItem value="exercises">
												Bài tập
											</SelectItem>
											<SelectItem value="chapters">
												Chương
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="deadline">Hạn chót</Label>
									<Input
										id="deadline"
										type="date"
										value={newGoal.deadline}
										onChange={(e) =>
											setNewGoal({
												...newGoal,
												deadline: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<Label htmlFor="priority">Độ ưu tiên</Label>
									<Select
										value={newGoal.priority}
										onValueChange={(value) =>
											setNewGoal({
												...newGoal,
												priority: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="high">
												Cao
											</SelectItem>
											<SelectItem value="medium">
												Trung bình
											</SelectItem>
											<SelectItem value="low">
												Thấp
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<Button onClick={addGoal} className="w-full">
								Tạo mục tiêu
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Overview Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-blue-600 font-medium">
									Tổng mục tiêu
								</p>
								<p className="text-2xl font-bold text-blue-700">
									{goals.length}
								</p>
							</div>
							<Target className="h-8 w-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-green-600 font-medium">
									Đã hoàn thành
								</p>
								<p className="text-2xl font-bold text-green-700">
									{completedGoals.length}
								</p>
							</div>
							<Award className="h-8 w-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-orange-600 font-medium">
									Đang thực hiện
								</p>
								<p className="text-2xl font-bold text-orange-700">
									{activeGoals.length}
								</p>
							</div>
							<Clock className="h-8 w-8 text-orange-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-purple-600 font-medium">
									Tỷ lệ hoàn thành
								</p>
								<p className="text-2xl font-bold text-purple-700">
									{Math.round(totalProgress)}%
								</p>
							</div>
							<TrendingUp className="h-8 w-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Active Goals */}
			<Card>
				<CardHeader>
					<CardTitle>Mục tiêu đang thực hiện</CardTitle>
					<CardDescription>
						Các mục tiêu bạn đang theo dõi
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{activeGoals.map((goal) => (
							<div
								key={goal.id}
								className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-start justify-between mb-3">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-semibold">
												{goal.title}
											</h3>
											<Badge
												variant="outline"
												className={getStatusColor(
													goal.status
												)}
											>
												{goal.status === "active"
													? "Đang thực hiện"
													: "Hoàn thành"}
											</Badge>
											<div
												className={`w-2 h-2 rounded-full ${getPriorityColor(
													goal.priority
												)}`}
											/>
										</div>
										<p className="text-sm text-gray-600">
											{goal.subject}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="sm">
											<Edit className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => deleteGoal(goal.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Tiến độ</span>
										<span>
											{goal.current}/{goal.target}{" "}
											{goal.unit}
										</span>
									</div>
									<Progress
										value={getProgressPercentage(
											goal.current,
											goal.target
										)}
										className="h-2"
									/>
								</div>

								<div className="flex justify-between items-center mt-3 text-sm text-gray-500">
									<div className="flex items-center gap-1">
										<Calendar className="h-4 w-4" />
										<span>
											Còn {getDaysLeft(goal.deadline)}{" "}
											ngày
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Input
											type="number"
											value={goal.current}
											onChange={(e) =>
												updateProgress(
													goal.id,
													Number.parseFloat(
														e.target.value
													) || 0
												)
											}
											className="w-20 h-8"
											step="0.1"
										/>
										<span>/{goal.target}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Completed Goals */}
			{completedGoals.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Mục tiêu đã hoàn thành</CardTitle>
						<CardDescription>
							Những thành tựu bạn đã đạt được
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{completedGoals.map((goal) => (
								<div
									key={goal.id}
									className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
								>
									<div className="flex items-center gap-3">
										<Award className="h-5 w-5 text-green-600" />
										<div>
											<p className="font-medium text-green-800">
												{goal.title}
											</p>
											<p className="text-sm text-green-600">
												{goal.subject}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium text-green-700">
											{goal.current}/{goal.target}{" "}
											{goal.unit}
										</p>
										<p className="text-xs text-green-600">
											Hoàn thành
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
