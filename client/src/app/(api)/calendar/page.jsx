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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Calendar,
	Clock,
	BookOpen,
	Target,
	Edit,
	Trash2,
} from "lucide-react";

export default function CalendarPage() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [events, setEvents] = useState([
		{
			id: 1,
			title: "Học Toán - Đạo hàm",
			subject: "Toán học",
			type: "study",
			date: "2024-01-15",
			startTime: "14:00",
			endTime: "16:00",
			description: "Ôn tập chương đạo hàm và ứng dụng",
			completed: true,
		},
		{
			id: 2,
			title: "Kiểm tra Vật lý",
			subject: "Vật lý",
			type: "exam",
			date: "2024-01-16",
			startTime: "08:00",
			endTime: "09:30",
			description: "Kiểm tra 1 tiết chương Dao động cơ",
			completed: false,
		},
		{
			id: 3,
			title: "Nộp bài tập Hóa học",
			subject: "Hóa học",
			type: "assignment",
			date: "2024-01-17",
			startTime: "23:59",
			endTime: "23:59",
			description: "Bài tập chương Phản ứng oxi hóa khử",
			completed: false,
		},
		{
			id: 4,
			title: "Học nhóm Tiếng Anh",
			subject: "Tiếng Anh",
			type: "group",
			date: "2024-01-18",
			startTime: "19:00",
			endTime: "21:00",
			description: "Thảo luận bài reading và writing",
			completed: false,
		},
	]);

	const [newEvent, setNewEvent] = useState({
		title: "",
		subject: "",
		type: "study",
		date: "",
		startTime: "",
		endTime: "",
		description: "",
	});

	const monthNames = [
		"Tháng 1",
		"Tháng 2",
		"Tháng 3",
		"Tháng 4",
		"Tháng 5",
		"Tháng 6",
		"Tháng 7",
		"Tháng 8",
		"Tháng 9",
		"Tháng 10",
		"Tháng 11",
		"Tháng 12",
	];

	const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}

		// Add days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(new Date(year, month, day));
		}

		return days;
	};

	const navigateMonth = (direction) => {
		const newDate = new Date(currentDate);
		newDate.setMonth(currentDate.getMonth() + direction);
		setCurrentDate(newDate);
	};

	const getEventsForDate = (date) => {
		if (!date) return [];
		const dateString = date.toISOString().split("T")[0];
		return events.filter((event) => event.date === dateString);
	};

	const addEvent = () => {
		if (
			newEvent.title &&
			newEvent.subject &&
			newEvent.date &&
			newEvent.startTime
		) {
			const event = {
				id: events.length + 1,
				...newEvent,
				completed: false,
			};
			setEvents([...events, event]);
			setNewEvent({
				title: "",
				subject: "",
				type: "study",
				date: "",
				startTime: "",
				endTime: "",
				description: "",
			});
			setIsDialogOpen(false);
		}
	};

	const deleteEvent = (id) => {
		setEvents(events.filter((event) => event.id !== id));
	};

	const toggleEventCompletion = (id) => {
		setEvents(
			events.map((event) =>
				event.id === id
					? { ...event, completed: !event.completed }
					: event
			)
		);
	};

	const getEventTypeColor = (type) => {
		switch (type) {
			case "study":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "exam":
				return "bg-red-100 text-red-800 border-red-200";
			case "assignment":
				return "bg-orange-100 text-orange-800 border-orange-200";
			case "group":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getEventTypeIcon = (type) => {
		switch (type) {
			case "study":
				return <BookOpen className="h-3 w-3" />;
			case "exam":
				return <Target className="h-3 w-3" />;
			case "assignment":
				return <Edit className="h-3 w-3" />;
			case "group":
				return <Calendar className="h-3 w-3" />;
			default:
				return <Calendar className="h-3 w-3" />;
		}
	};

	const formatTime = (time) => {
		return time.slice(0, 5);
	};

	const isToday = (date) => {
		if (!date) return false;
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const days = getDaysInMonth(currentDate);
	const todayEvents = getEventsForDate(new Date());
	const upcomingEvents = events
		.filter(
			(event) => new Date(event.date) >= new Date() && !event.completed
		)
		.sort((a, b) => new Date(a.date) - new Date(b.date))
		.slice(0, 5);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
						Lịch học tập
					</h1>
					<p className="text-gray-600 mt-2">
						Quản lý lịch trình học tập và sự kiện
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-cyan-600 hover:bg-cyan-700">
							<Plus className="h-4 w-4 mr-2" />
							Thêm sự kiện
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Tạo sự kiện mới</DialogTitle>
							<DialogDescription>
								Thêm sự kiện học tập vào lịch của bạn
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="event-title">
									Tiêu đề sự kiện
								</Label>
								<Input
									id="event-title"
									value={newEvent.title}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											title: e.target.value,
										})
									}
									placeholder="Ví dụ: Học Toán - Đạo hàm"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="event-subject">
										Môn học
									</Label>
									<Select
										value={newEvent.subject}
										onValueChange={(value) =>
											setNewEvent({
												...newEvent,
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
									<Label htmlFor="event-type">
										Loại sự kiện
									</Label>
									<Select
										value={newEvent.type}
										onValueChange={(value) =>
											setNewEvent({
												...newEvent,
												type: value,
											})
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="study">
												Học tập
											</SelectItem>
											<SelectItem value="exam">
												Kiểm tra
											</SelectItem>
											<SelectItem value="assignment">
												Bài tập
											</SelectItem>
											<SelectItem value="group">
												Học nhóm
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div>
									<Label htmlFor="event-date">Ngày</Label>
									<Input
										id="event-date"
										type="date"
										value={newEvent.date}
										onChange={(e) =>
											setNewEvent({
												...newEvent,
												date: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<Label htmlFor="start-time">
										Giờ bắt đầu
									</Label>
									<Input
										id="start-time"
										type="time"
										value={newEvent.startTime}
										onChange={(e) =>
											setNewEvent({
												...newEvent,
												startTime: e.target.value,
											})
										}
									/>
								</div>
								<div>
									<Label htmlFor="end-time">
										Giờ kết thúc
									</Label>
									<Input
										id="end-time"
										type="time"
										value={newEvent.endTime}
										onChange={(e) =>
											setNewEvent({
												...newEvent,
												endTime: e.target.value,
											})
										}
									/>
								</div>
							</div>
							<div>
								<Label htmlFor="event-description">Mô tả</Label>
								<Textarea
									id="event-description"
									value={newEvent.description}
									onChange={(e) =>
										setNewEvent({
											...newEvent,
											description: e.target.value,
										})
									}
									placeholder="Mô tả chi tiết về sự kiện..."
									rows={3}
								/>
							</div>
							<Button onClick={addEvent} className="w-full">
								Tạo sự kiện
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Calendar */}
				<div className="lg:col-span-3">
					<Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-xl text-cyan-800">
									{monthNames[currentDate.getMonth()]}{" "}
									{currentDate.getFullYear()}
								</CardTitle>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => navigateMonth(-1)}
										className="border-cyan-300 text-cyan-700 hover:bg-cyan-100"
									>
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() =>
											setCurrentDate(new Date())
										}
										className="border-cyan-300 text-cyan-700 hover:bg-cyan-100"
									>
										Hôm nay
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => navigateMonth(1)}
										className="border-cyan-300 text-cyan-700 hover:bg-cyan-100"
									>
										<ChevronRight className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-7 gap-1 mb-4">
								{dayNames.map((day) => (
									<div
										key={day}
										className="p-2 text-center text-sm font-medium text-cyan-700"
									>
										{day}
									</div>
								))}
							</div>
							<div className="grid grid-cols-7 gap-1">
								{days.map((day, index) => {
									const dayEvents = getEventsForDate(day);
									return (
										<div
											key={index}
											className={`min-h-[100px] p-2 border rounded-lg cursor-pointer hover:bg-cyan-50 transition-colors ${
												day
													? "bg-white/60 border-cyan-200"
													: "bg-cyan-100/50"
											} ${
												isToday(day)
													? "ring-2 ring-cyan-500 bg-cyan-100"
													: ""
											}`}
											onClick={() =>
												day && setSelectedDate(day)
											}
										>
											{day && (
												<>
													<div
														className={`text-sm font-medium mb-1 ${
															isToday(day)
																? "text-cyan-700"
																: "text-gray-900"
														}`}
													>
														{day.getDate()}
													</div>
													<div className="space-y-1">
														{dayEvents
															.slice(0, 2)
															.map((event) => (
																<div
																	key={
																		event.id
																	}
																	className={`text-xs p-1 rounded truncate ${getEventTypeColor(
																		event.type
																	)} ${
																		event.completed
																			? "opacity-60 line-through"
																			: ""
																	}`}
																>
																	{
																		event.title
																	}
																</div>
															))}
														{dayEvents.length >
															2 && (
															<div className="text-xs text-gray-500">
																+
																{dayEvents.length -
																	2}{" "}
																khác
															</div>
														)}
													</div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Today's Events */}
					<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
						<CardHeader>
							<CardTitle className="text-lg text-green-800">
								Hôm nay
							</CardTitle>
							<CardDescription className="text-green-600">
								{new Date().toLocaleDateString("vi-VN")}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{todayEvents.length > 0 ? (
								<div className="space-y-3">
									{todayEvents.map((event) => (
										<div
											key={event.id}
											className={`p-3 rounded-lg border ${getEventTypeColor(
												event.type
											)} ${
												event.completed
													? "opacity-60"
													: ""
											}`}
										>
											<div className="flex items-center justify-between mb-1">
												<div className="flex items-center gap-2">
													{getEventTypeIcon(
														event.type
													)}
													<span className="font-medium text-sm">
														{event.title}
													</span>
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														toggleEventCompletion(
															event.id
														)
													}
													className="h-6 w-6 p-0"
												>
													{event.completed
														? "↺"
														: "✓"}
												</Button>
											</div>
											<div className="flex items-center gap-2 text-xs">
												<Clock className="h-3 w-3" />
												<span>
													{formatTime(
														event.startTime
													)}{" "}
													-{" "}
													{formatTime(event.endTime)}
												</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-gray-500">
									Không có sự kiện nào hôm nay
								</p>
							)}
						</CardContent>
					</Card>

					{/* Upcoming Events */}
					<Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
						<CardHeader>
							<CardTitle className="text-lg text-orange-800">
								Sắp tới
							</CardTitle>
							<CardDescription className="text-orange-600">
								Các sự kiện trong tuần
							</CardDescription>
						</CardHeader>
						<CardContent>
							{upcomingEvents.length > 0 ? (
								<div className="space-y-3">
									{upcomingEvents.map((event) => (
										<div
											key={event.id}
											className="p-3 rounded-lg border hover:bg-gray-50 transition-colors"
										>
											<div className="flex items-center justify-between mb-1">
												<span className="font-medium text-sm">
													{event.title}
												</span>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														deleteEvent(event.id)
													}
													className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
												>
													<Trash2 className="h-3 w-3" />
												</Button>
											</div>
											<div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
												<Calendar className="h-3 w-3" />
												<span>
													{new Date(
														event.date
													).toLocaleDateString(
														"vi-VN"
													)}
												</span>
											</div>
											<div className="flex items-center gap-2 text-xs text-gray-500">
												<Clock className="h-3 w-3" />
												<span>
													{formatTime(
														event.startTime
													)}
												</span>
											</div>
											<Badge
												variant="outline"
												className={`mt-2 ${getEventTypeColor(
													event.type
												)}`}
											>
												{event.subject}
											</Badge>
										</div>
									))}
								</div>
							) : (
								<p className="text-sm text-gray-500">
									Không có sự kiện sắp tới
								</p>
							)}
						</CardContent>
					</Card>

					{/* Quick Stats */}
					<Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2 text-purple-800">
								<Calendar className="h-5 w-5 text-purple-600" />
								Thống kê
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-purple-700">
									Tổng sự kiện
								</span>
								<Badge
									variant="secondary"
									className="bg-purple-100 text-purple-800"
								>
									{events.length}
								</Badge>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-purple-700">
									Đã hoàn thành
								</span>
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800"
								>
									{events.filter((e) => e.completed).length}
								</Badge>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-purple-700">
									Sắp tới
								</span>
								<Badge
									variant="secondary"
									className="bg-orange-100 text-orange-800"
								>
									{upcomingEvents.length}
								</Badge>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
