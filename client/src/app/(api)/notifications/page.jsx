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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Bell,
	Clock,
	Target,
	Award,
	AlertTriangle,
	CheckCircle,
	X,
	Settings,
	Calendar,
	BookOpen,
} from "lucide-react";

export default function NotificationsPage() {
	const [notifications, setNotifications] = useState([
		{
			id: 1,
			type: "reminder",
			title: "Giờ học Toán",
			message: "Đã đến giờ học Toán theo lịch trình của bạn",
			time: "10 phút trước",
			read: false,
			priority: "high",
		},
		{
			id: 2,
			type: "goal",
			title: "Mục tiêu sắp đạt được",
			message: "Bạn đã hoàn thành 90% mục tiêu học Vật lý tuần này",
			time: "30 phút trước",
			read: false,
			priority: "medium",
		},
		{
			id: 3,
			type: "achievement",
			title: "Thành tựu mới!",
			message: "Bạn đã học liên tục 7 ngày. Tuyệt vời!",
			time: "1 giờ trước",
			read: true,
			priority: "low",
		},
		{
			id: 4,
			type: "warning",
			title: "Mục tiêu có thể bị trễ",
			message:
				"Mục tiêu 'Hoàn thành chương Đạo hàm' sẽ hết hạn trong 2 ngày",
			time: "2 giờ trước",
			read: false,
			priority: "high",
		},
		{
			id: 5,
			type: "completed",
			title: "Phiên học hoàn thành",
			message: "Bạn đã hoàn thành 2 giờ học Hóa học",
			time: "3 giờ trước",
			read: true,
			priority: "low",
		},
	]);

	const [settings, setSettings] = useState({
		studyReminders: true,
		goalUpdates: true,
		achievements: true,
		deadlineWarnings: true,
		dailySummary: false,
		weeklyReport: true,
		soundEnabled: true,
		emailNotifications: false,
	});

	const markAsRead = (id) => {
		setNotifications(
			notifications.map((notif) =>
				notif.id === id ? { ...notif, read: true } : notif
			)
		);
	};

	const markAllAsRead = () => {
		setNotifications(
			notifications.map((notif) => ({ ...notif, read: true }))
		);
	};

	const deleteNotification = (id) => {
		setNotifications(notifications.filter((notif) => notif.id !== id));
	};

	const updateSetting = (key, value) => {
		setSettings({ ...settings, [key]: value });
	};

	const getNotificationIcon = (type) => {
		switch (type) {
			case "reminder":
				return <Clock className="h-5 w-5 text-blue-500" />;
			case "goal":
				return <Target className="h-5 w-5 text-green-500" />;
			case "achievement":
				return <Award className="h-5 w-5 text-yellow-500" />;
			case "warning":
				return <AlertTriangle className="h-5 w-5 text-red-500" />;
			case "completed":
				return <CheckCircle className="h-5 w-5 text-green-500" />;
			default:
				return <Bell className="h-5 w-5 text-gray-500" />;
		}
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "high":
				return "border-l-red-500 bg-red-50";
			case "medium":
				return "border-l-orange-500 bg-orange-50";
			case "low":
				return "border-l-green-500 bg-green-50";
			default:
				return "border-l-gray-500 bg-gray-50";
		}
	};

	const unreadCount = notifications.filter((notif) => !notif.read).length;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						Thông báo
					</h1>
					<p className="text-gray-600 mt-2">
						Quản lý thông báo và cài đặt nhắc nhở học tập
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Badge
						variant="secondary"
						className="bg-blue-100 text-blue-800"
					>
						{unreadCount} chưa đọc
					</Badge>
					<Button
						variant="outline"
						onClick={markAllAsRead}
						disabled={unreadCount === 0}
					>
						Đánh dấu tất cả đã đọc
					</Button>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-blue-600 font-medium">
									Tổng thông báo
								</p>
								<p className="text-2xl font-bold text-blue-700">
									{notifications.length}
								</p>
							</div>
							<Bell className="h-8 w-8 text-blue-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-orange-600 font-medium">
									Chưa đọc
								</p>
								<p className="text-2xl font-bold text-orange-700">
									{unreadCount}
								</p>
							</div>
							<AlertTriangle className="h-8 w-8 text-orange-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-green-600 font-medium">
									Thành tựu
								</p>
								<p className="text-2xl font-bold text-green-700">
									{
										notifications.filter(
											(n) => n.type === "achievement"
										).length
									}
								</p>
							</div>
							<Award className="h-8 w-8 text-green-500" />
						</div>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-purple-600 font-medium">
									Nhắc nhở
								</p>
								<p className="text-2xl font-bold text-purple-700">
									{
										notifications.filter(
											(n) => n.type === "reminder"
										).length
									}
								</p>
							</div>
							<Clock className="h-8 w-8 text-purple-500" />
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Notifications List */}
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Thông báo gần đây</CardTitle>
							<CardDescription>
								Danh sách các thông báo mới nhất
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{notifications.map((notification) => (
									<div
										key={notification.id}
										className={`border-l-4 p-4 rounded-r-lg transition-all hover:shadow-sm ${getPriorityColor(
											notification.priority
										)} ${
											notification.read
												? "opacity-60"
												: ""
										}`}
									>
										<div className="flex items-start justify-between">
											<div className="flex items-start gap-3 flex-1">
												{getNotificationIcon(
													notification.type
												)}
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-1">
														<h4 className="font-medium">
															{notification.title}
														</h4>
														{!notification.read && (
															<div className="w-2 h-2 bg-blue-500 rounded-full" />
														)}
													</div>
													<p className="text-sm text-gray-600 mb-2">
														{notification.message}
													</p>
													<p className="text-xs text-gray-500">
														{notification.time}
													</p>
												</div>
											</div>
											<div className="flex items-center gap-1">
												{!notification.read && (
													<Button
														variant="ghost"
														size="sm"
														onClick={() =>
															markAsRead(
																notification.id
															)
														}
													>
														<CheckCircle className="h-4 w-4" />
													</Button>
												)}
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														deleteNotification(
															notification.id
														)
													}
												>
													<X className="h-4 w-4" />
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Notification Settings */}
				<div>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Settings className="h-5 w-5" />
								Cài đặt thông báo
							</CardTitle>
							<CardDescription>
								Tùy chỉnh các loại thông báo bạn muốn nhận
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<h4 className="font-medium mb-3">
									Thông báo học tập
								</h4>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-blue-500" />
											<Label
												htmlFor="study-reminders"
												className="text-sm"
											>
												Nhắc nhở giờ học
											</Label>
										</div>
										<Switch
											id="study-reminders"
											checked={settings.studyReminders}
											onCheckedChange={(checked) =>
												updateSetting(
													"studyReminders",
													checked
												)
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Target className="h-4 w-4 text-green-500" />
											<Label
												htmlFor="goal-updates"
												className="text-sm"
											>
												Cập nhật mục tiêu
											</Label>
										</div>
										<Switch
											id="goal-updates"
											checked={settings.goalUpdates}
											onCheckedChange={(checked) =>
												updateSetting(
													"goalUpdates",
													checked
												)
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Award className="h-4 w-4 text-yellow-500" />
											<Label
												htmlFor="achievements"
												className="text-sm"
											>
												Thành tựu
											</Label>
										</div>
										<Switch
											id="achievements"
											checked={settings.achievements}
											onCheckedChange={(checked) =>
												updateSetting(
													"achievements",
													checked
												)
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<AlertTriangle className="h-4 w-4 text-red-500" />
											<Label
												htmlFor="deadline-warnings"
												className="text-sm"
											>
												Cảnh báo hạn chót
											</Label>
										</div>
										<Switch
											id="deadline-warnings"
											checked={settings.deadlineWarnings}
											onCheckedChange={(checked) =>
												updateSetting(
													"deadlineWarnings",
													checked
												)
											}
										/>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h4 className="font-medium mb-3">
									Báo cáo định kỳ
								</h4>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Calendar className="h-4 w-4 text-purple-500" />
											<Label
												htmlFor="daily-summary"
												className="text-sm"
											>
												Tóm tắt hàng ngày
											</Label>
										</div>
										<Switch
											id="daily-summary"
											checked={settings.dailySummary}
											onCheckedChange={(checked) =>
												updateSetting(
													"dailySummary",
													checked
												)
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<BookOpen className="h-4 w-4 text-indigo-500" />
											<Label
												htmlFor="weekly-report"
												className="text-sm"
											>
												Báo cáo tuần
											</Label>
										</div>
										<Switch
											id="weekly-report"
											checked={settings.weeklyReport}
											onCheckedChange={(checked) =>
												updateSetting(
													"weeklyReport",
													checked
												)
											}
										/>
									</div>
								</div>
							</div>

							<Separator />

							<div>
								<h4 className="font-medium mb-3">
									Cài đặt khác
								</h4>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Label
											htmlFor="sound-enabled"
											className="text-sm"
										>
											Âm thanh thông báo
										</Label>
										<Switch
											id="sound-enabled"
											checked={settings.soundEnabled}
											onCheckedChange={(checked) =>
												updateSetting(
													"soundEnabled",
													checked
												)
											}
										/>
									</div>

									<div className="flex items-center justify-between">
										<Label
											htmlFor="email-notifications"
											className="text-sm"
										>
											Thông báo qua email
										</Label>
										<Switch
											id="email-notifications"
											checked={
												settings.emailNotifications
											}
											onCheckedChange={(checked) =>
												updateSetting(
													"emailNotifications",
													checked
												)
											}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
