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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	User,
	Settings,
	Target,
	Shield,
	Download,
	Upload,
	Trash2,
	Save,
	Camera,
} from "lucide-react";

export default function SettingsPage() {
	const [profile, setProfile] = useState({
		name: "Nguyễn Văn A",
		email: "nguyenvana@email.com",
		avatar: "",
		bio: "Học sinh lớp 12, đam mê Toán học và Vật lý",
		grade: "12",
		school: "THPT ABC",
		phone: "0123456789",
	});

	const [preferences, setPreferences] = useState({
		theme: "light",
		language: "vi",
		timezone: "Asia/Ho_Chi_Minh",
		dateFormat: "dd/mm/yyyy",
		timeFormat: "24h",
		defaultStudyDuration: 60,
		breakReminder: true,
		autoSave: true,
		soundEffects: true,
	});

	const [privacy, setPrivacy] = useState({
		profileVisibility: "private",
		shareProgress: false,
		dataCollection: true,
		emailMarketing: false,
	});

	const [goals, setGoals] = useState({
		dailyStudyGoal: 4,
		weeklyStudyGoal: 25,
		monthlyStudyGoal: 100,
		breakDuration: 15,
		sessionReminder: 30,
	});

	const updateProfile = (key, value) => {
		setProfile({ ...profile, [key]: value });
	};

	const updatePreferences = (key, value) => {
		setPreferences({ ...preferences, [key]: value });
	};

	const updatePrivacy = (key, value) => {
		setPrivacy({ ...privacy, [key]: value });
	};

	const updateGoals = (key, value) => {
		setGoals({ ...goals, [key]: value });
	};

	const saveSettings = () => {
		// Save settings logic here
		console.log("Settings saved:", {
			profile,
			preferences,
			privacy,
			goals,
		});
	};

	const exportData = () => {
		// Export data logic here
		console.log("Exporting data...");
	};

	const importData = () => {
		// Import data logic here
		console.log("Importing data...");
	};

	const deleteAccount = () => {
		// Delete account logic here
		if (
			confirm(
				"Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác."
			)
		) {
			console.log("Account deleted");
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
					Cài đặt
				</h1>
				<p className="text-gray-600 mt-2">
					Quản lý thông tin cá nhân và tùy chỉnh ứng dụng
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Profile Settings */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5" />
								Thông tin cá nhân
							</CardTitle>
							<CardDescription>
								Cập nhật thông tin hồ sơ của bạn
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-4">
								<Avatar className="h-20 w-20">
									<AvatarImage
										src={
											profile.avatar || "/placeholder.svg"
										}
									/>
									<AvatarFallback className="text-lg">
										{profile.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div>
									<Button variant="outline" size="sm">
										<Camera className="h-4 w-4 mr-2" />
										Thay đổi ảnh
									</Button>
									<p className="text-sm text-gray-500 mt-1">
										JPG, PNG tối đa 2MB
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Họ và tên</Label>
									<Input
										id="name"
										value={profile.name}
										onChange={(e) =>
											updateProfile(
												"name",
												e.target.value
											)
										}
									/>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={profile.email}
										onChange={(e) =>
											updateProfile(
												"email",
												e.target.value
											)
										}
									/>
								</div>
								<div>
									<Label htmlFor="grade">Lớp</Label>
									<Select
										value={profile.grade}
										onValueChange={(value) =>
											updateProfile("grade", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="10">
												Lớp 10
											</SelectItem>
											<SelectItem value="11">
												Lớp 11
											</SelectItem>
											<SelectItem value="12">
												Lớp 12
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="phone">Số điện thoại</Label>
									<Input
										id="phone"
										value={profile.phone}
										onChange={(e) =>
											updateProfile(
												"phone",
												e.target.value
											)
										}
									/>
								</div>
							</div>

							<div>
								<Label htmlFor="school">Trường học</Label>
								<Input
									id="school"
									value={profile.school}
									onChange={(e) =>
										updateProfile("school", e.target.value)
									}
								/>
							</div>

							<div>
								<Label htmlFor="bio">Giới thiệu</Label>
								<Textarea
									id="bio"
									value={profile.bio}
									onChange={(e) =>
										updateProfile("bio", e.target.value)
									}
									placeholder="Viết vài dòng về bản thân..."
									rows={3}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Study Goals */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Target className="h-5 w-5" />
								Mục tiêu học tập
							</CardTitle>
							<CardDescription>
								Thiết lập mục tiêu và thời gian học
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<Label htmlFor="daily-goal">
										Mục tiêu hàng ngày (giờ)
									</Label>
									<Input
										id="daily-goal"
										type="number"
										value={goals.dailyStudyGoal}
										onChange={(e) =>
											updateGoals(
												"dailyStudyGoal",
												Number.parseInt(e.target.value)
											)
										}
										min="1"
										max="12"
									/>
								</div>
								<div>
									<Label htmlFor="weekly-goal">
										Mục tiêu hàng tuần (giờ)
									</Label>
									<Input
										id="weekly-goal"
										type="number"
										value={goals.weeklyStudyGoal}
										onChange={(e) =>
											updateGoals(
												"weeklyStudyGoal",
												Number.parseInt(e.target.value)
											)
										}
										min="1"
										max="50"
									/>
								</div>
								<div>
									<Label htmlFor="monthly-goal">
										Mục tiêu hàng tháng (giờ)
									</Label>
									<Input
										id="monthly-goal"
										type="number"
										value={goals.monthlyStudyGoal}
										onChange={(e) =>
											updateGoals(
												"monthlyStudyGoal",
												Number.parseInt(e.target.value)
											)
										}
										min="1"
										max="200"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="break-duration">
										Thời gian nghỉ (phút)
									</Label>
									<Input
										id="break-duration"
										type="number"
										value={goals.breakDuration}
										onChange={(e) =>
											updateGoals(
												"breakDuration",
												Number.parseInt(e.target.value)
											)
										}
										min="5"
										max="30"
									/>
								</div>
								<div>
									<Label htmlFor="session-reminder">
										Nhắc nhở phiên học (phút)
									</Label>
									<Input
										id="session-reminder"
										type="number"
										value={goals.sessionReminder}
										onChange={(e) =>
											updateGoals(
												"sessionReminder",
												Number.parseInt(e.target.value)
											)
										}
										min="15"
										max="120"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Preferences */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Settings className="h-5 w-5" />
								Tùy chỉnh giao diện
							</CardTitle>
							<CardDescription>
								Cài đặt giao diện và ngôn ngữ
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="theme">Giao diện</Label>
									<Select
										value={preferences.theme}
										onValueChange={(value) =>
											updatePreferences("theme", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">
												Sáng
											</SelectItem>
											<SelectItem value="dark">
												Tối
											</SelectItem>
											<SelectItem value="system">
												Theo hệ thống
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="language">Ngôn ngữ</Label>
									<Select
										value={preferences.language}
										onValueChange={(value) =>
											updatePreferences("language", value)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="vi">
												Tiếng Việt
											</SelectItem>
											<SelectItem value="en">
												English
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="date-format">
										Định dạng ngày
									</Label>
									<Select
										value={preferences.dateFormat}
										onValueChange={(value) =>
											updatePreferences(
												"dateFormat",
												value
											)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="dd/mm/yyyy">
												DD/MM/YYYY
											</SelectItem>
											<SelectItem value="mm/dd/yyyy">
												MM/DD/YYYY
											</SelectItem>
											<SelectItem value="yyyy-mm-dd">
												YYYY-MM-DD
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="time-format">
										Định dạng giờ
									</Label>
									<Select
										value={preferences.timeFormat}
										onValueChange={(value) =>
											updatePreferences(
												"timeFormat",
												value
											)
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="24h">
												24 giờ
											</SelectItem>
											<SelectItem value="12h">
												12 giờ
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label htmlFor="break-reminder">
										Nhắc nhở nghỉ giải lao
									</Label>
									<Switch
										id="break-reminder"
										checked={preferences.breakReminder}
										onCheckedChange={(checked) =>
											updatePreferences(
												"breakReminder",
												checked
											)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label htmlFor="auto-save">
										Tự động lưu
									</Label>
									<Switch
										id="auto-save"
										checked={preferences.autoSave}
										onCheckedChange={(checked) =>
											updatePreferences(
												"autoSave",
												checked
											)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label htmlFor="sound-effects">
										Hiệu ứng âm thanh
									</Label>
									<Switch
										id="sound-effects"
										checked={preferences.soundEffects}
										onCheckedChange={(checked) =>
											updatePreferences(
												"soundEffects",
												checked
											)
										}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Side Panel */}
				<div className="space-y-6">
					{/* Privacy Settings */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Shield className="h-5 w-5" />
								Quyền riêng tư
							</CardTitle>
							<CardDescription>
								Kiểm soát dữ liệu cá nhân
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<Label htmlFor="profile-visibility">
									Hiển thị hồ sơ
								</Label>
								<Select
									value={privacy.profileVisibility}
									onValueChange={(value) =>
										updatePrivacy(
											"profileVisibility",
											value
										)
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="public">
											Công khai
										</SelectItem>
										<SelectItem value="friends">
											Bạn bè
										</SelectItem>
										<SelectItem value="private">
											Riêng tư
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<Label
										htmlFor="share-progress"
										className="text-sm"
									>
										Chia sẻ tiến độ
									</Label>
									<Switch
										id="share-progress"
										checked={privacy.shareProgress}
										onCheckedChange={(checked) =>
											updatePrivacy(
												"shareProgress",
												checked
											)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label
										htmlFor="data-collection"
										className="text-sm"
									>
										Thu thập dữ liệu
									</Label>
									<Switch
										id="data-collection"
										checked={privacy.dataCollection}
										onCheckedChange={(checked) =>
											updatePrivacy(
												"dataCollection",
												checked
											)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Label
										htmlFor="email-marketing"
										className="text-sm"
									>
										Email marketing
									</Label>
									<Switch
										id="email-marketing"
										checked={privacy.emailMarketing}
										onCheckedChange={(checked) =>
											updatePrivacy(
												"emailMarketing",
												checked
											)
										}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Data Management */}
					<Card>
						<CardHeader>
							<CardTitle>Quản lý dữ liệu</CardTitle>
							<CardDescription>
								Sao lưu và khôi phục dữ liệu
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								variant="outline"
								className="w-full bg-transparent"
								onClick={exportData}
							>
								<Download className="h-4 w-4 mr-2" />
								Xuất dữ liệu
							</Button>
							<Button
								variant="outline"
								className="w-full bg-transparent"
								onClick={importData}
							>
								<Upload className="h-4 w-4 mr-2" />
								Nhập dữ liệu
							</Button>
							<Separator />
							<Button
								variant="destructive"
								className="w-full"
								onClick={deleteAccount}
							>
								<Trash2 className="h-4 w-4 mr-2" />
								Xóa tài khoản
							</Button>
						</CardContent>
					</Card>

					{/* Account Status */}
					<Card>
						<CardHeader>
							<CardTitle>Trạng thái tài khoản</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm">Loại tài khoản</span>
								<Badge variant="secondary">Miễn phí</Badge>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm">Ngày tham gia</span>
								<span className="text-sm text-gray-500">
									15/01/2024
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm">
									Dung lượng đã sử dụng
								</span>
								<span className="text-sm text-gray-500">
									2.3 MB / 100 MB
								</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Save Button */}
			<div className="flex justify-end">
				<Button
					onClick={saveSettings}
					className="bg-indigo-600 hover:bg-indigo-700"
				>
					<Save className="h-4 w-4 mr-2" />
					Lưu cài đặt
				</Button>
			</div>
		</div>
	);
}
