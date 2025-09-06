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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Trophy,
	Crown,
	Medal,
	Users,
	Globe,
	UserPlus,
	Settings,
	EyeOff,
	Clock,
	Target,
	Zap,
	Star,
	Shield,
	Search,
} from "lucide-react";

export default function RankingPage() {
	const [privacySettings, setPrivacySettings] = useState({
		shareStudyHours: true,
		sharePoints: true,
		shareStreak: false,
		shareAchievements: true,
	});
	const [selectedGroup, setSelectedGroup] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [rankingType, setRankingType] = useState("study_hours");

	// Mock data for rankings
	const globalRankings = [
		{
			id: 1,
			rank: 1,
			name: "Nguyễn Minh Anh",
			avatar: "MA",
			studyHours: 156.5,
			points: 15650,
			streak: 28,
			level: 15,
			achievements: 42,
			isCurrentUser: false,
		},
		{
			id: 2,
			rank: 2,
			name: "Trần Thanh Hương",
			avatar: "TH",
			studyHours: 142.3,
			points: 14230,
			streak: 21,
			level: 14,
			achievements: 38,
			isCurrentUser: false,
		},
		{
			id: 3,
			rank: 3,
			name: "Lê Đức Minh",
			avatar: "DM",
			studyHours: 138.7,
			points: 13870,
			streak: 19,
			level: 13,
			achievements: 35,
			isCurrentUser: false,
		},
		{
			id: 4,
			rank: 4,
			name: "Bạn",
			avatar: "B",
			studyHours: 125.2,
			points: 12520,
			streak: 15,
			level: 12,
			achievements: 31,
			isCurrentUser: true,
		},
		{
			id: 5,
			rank: 5,
			name: "Phạm Thị Lan",
			avatar: "PL",
			studyHours: 118.9,
			points: 11890,
			streak: 12,
			level: 11,
			achievements: 28,
			isCurrentUser: false,
		},
	];

	const groups = [
		{
			id: "all",
			name: "Toàn server",
			members: 15420,
			icon: Globe,
			description: "Bảng xếp hạng toàn server",
		},
		{
			id: "university",
			name: "Đại học Bách Khoa",
			members: 1250,
			icon: Users,
			description: "Sinh viên Đại học Bách Khoa",
			joined: true,
		},
		{
			id: "friends",
			name: "Bạn bè",
			members: 23,
			icon: UserPlus,
			description: "Danh sách bạn bè của bạn",
			joined: true,
		},
		{
			id: "study_group",
			name: "Nhóm học AI",
			members: 45,
			icon: Target,
			description: "Nhóm học tập AI & Machine Learning",
			joined: false,
		},
	];

	const getRankIcon = (rank) => {
		switch (rank) {
			case 1:
				return <Crown className="h-6 w-6 text-yellow-500" />;
			case 2:
				return <Medal className="h-6 w-6 text-gray-400" />;
			case 3:
				return <Medal className="h-6 w-6 text-amber-600" />;
			default:
				return (
					<span className="text-lg font-bold text-muted-foreground">
						#{rank}
					</span>
				);
		}
	};

	const getRankBadgeColor = (rank) => {
		switch (rank) {
			case 1:
				return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white";
			case 2:
				return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
			case 3:
				return "bg-gradient-to-r from-amber-400 to-yellow-500 text-white";
			default:
				return "bg-muted text-muted-foreground";
		}
	};

	const getCurrentValue = (user, type) => {
		switch (type) {
			case "study_hours":
				return `${user.studyHours}h`;
			case "points":
				return user.points.toLocaleString();
			case "streak":
				return `${user.streak} ngày`;
			case "achievements":
				return user.achievements;
			default:
				return user.studyHours;
		}
	};

	const getTypeLabel = (type) => {
		switch (type) {
			case "study_hours":
				return "Giờ học";
			case "points":
				return "Điểm";
			case "streak":
				return "Streak";
			case "achievements":
				return "Thành tựu";
			default:
				return "Giờ học";
		}
	};

	const getTypeIcon = (type) => {
		switch (type) {
			case "study_hours":
				return <Clock className="h-4 w-4" />;
			case "points":
				return <Star className="h-4 w-4" />;
			case "streak":
				return <Zap className="h-4 w-4" />;
			case "achievements":
				return <Trophy className="h-4 w-4" />;
			default:
				return <Clock className="h-4 w-4" />;
		}
	};

	const handleJoinGroup = (groupId) => {
		console.log(`Joining group: ${groupId}`);
		// In real app, this would be an API call
	};

	const handlePrivacyChange = (setting, value) => {
		setPrivacySettings((prev) => ({
			...prev,
			[setting]: value,
		}));
	};

	const filteredRankings = globalRankings.filter((user) =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
						Bảng xếp hạng
					</h1>
					<p className="text-muted-foreground mt-1">
						Thi đua lành mạnh với cộng đồng học tập
					</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="flex items-center gap-2 bg-transparent"
						>
							<Settings className="h-4 w-4" />
							Cài đặt riêng tư
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Cài đặt quyền riêng tư</DialogTitle>
							<DialogDescription>
								Chọn thông tin nào bạn muốn chia sẻ với cộng
								đồng. Bạn cần chia sẻ ít nhất giờ học để tham
								gia bảng xếp hạng.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">
										Chia sẻ giờ học
									</Label>
									<p className="text-sm text-muted-foreground">
										Hiển thị tổng giờ học của bạn
									</p>
								</div>
								<Switch
									checked={privacySettings.shareStudyHours}
									onCheckedChange={(value) =>
										handlePrivacyChange(
											"shareStudyHours",
											value
										)
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">
										Chia sẻ điểm
									</Label>
									<p className="text-sm text-muted-foreground">
										Hiển thị tổng điểm gamification
									</p>
								</div>
								<Switch
									checked={privacySettings.sharePoints}
									onCheckedChange={(value) =>
										handlePrivacyChange(
											"sharePoints",
											value
										)
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">
										Chia sẻ streak
									</Label>
									<p className="text-sm text-muted-foreground">
										Hiển thị chuỗi ngày học liên tục
									</p>
								</div>
								<Switch
									checked={privacySettings.shareStreak}
									onCheckedChange={(value) =>
										handlePrivacyChange(
											"shareStreak",
											value
										)
									}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label className="text-base">
										Chia sẻ thành tựu
									</Label>
									<p className="text-sm text-muted-foreground">
										Hiển thị số lượng thành tựu đã mở khóa
									</p>
								</div>
								<Switch
									checked={privacySettings.shareAchievements}
									onCheckedChange={(value) =>
										handlePrivacyChange(
											"shareAchievements",
											value
										)
									}
								/>
							</div>
							<div className="pt-4 border-t">
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Shield className="h-4 w-4" />
									<span>
										Dữ liệu của bạn được bảo mật và chỉ hiển
										thị theo cài đặt này
									</span>
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Groups Selection */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{groups.map((group) => (
					<Card
						key={group.id}
						className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
							selectedGroup === group.id
								? "ring-2 ring-primary bg-primary/5"
								: "hover:bg-muted/50"
						}`}
						onClick={() => setSelectedGroup(group.id)}
					>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<group.icon className="h-5 w-5 text-primary" />
									<CardTitle className="text-sm">
										{group.name}
									</CardTitle>
								</div>
								{group.joined === false && (
									<Button
										size="sm"
										variant="outline"
										onClick={(e) => {
											e.stopPropagation();
											handleJoinGroup(group.id);
										}}
										className="h-6 px-2 text-xs"
									>
										Tham gia
									</Button>
								)}
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-xs text-muted-foreground mb-2">
								{group.description}
							</p>
							<div className="flex items-center gap-1 text-xs text-muted-foreground">
								<Users className="h-3 w-3" />
								{group.members.toLocaleString()} thành viên
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Filters and Search */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Tìm kiếm người dùng..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Select value={rankingType} onValueChange={setRankingType}>
					<SelectTrigger className="w-full sm:w-48">
						<SelectValue placeholder="Xếp hạng theo" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="study_hours">
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4" />
								Giờ học
							</div>
						</SelectItem>
						<SelectItem value="points">
							<div className="flex items-center gap-2">
								<Star className="h-4 w-4" />
								Điểm
							</div>
						</SelectItem>
						<SelectItem value="streak">
							<div className="flex items-center gap-2">
								<Zap className="h-4 w-4" />
								Streak
							</div>
						</SelectItem>
						<SelectItem value="achievements">
							<div className="flex items-center gap-2">
								<Trophy className="h-4 w-4" />
								Thành tựu
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Rankings */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<CardTitle>
								{
									groups.find((g) => g.id === selectedGroup)
										?.name
								}{" "}
								- {getTypeLabel(rankingType)}
							</CardTitle>
							{getTypeIcon(rankingType)}
						</div>
						<Badge variant="outline">
							{filteredRankings.length} người tham gia
						</Badge>
					</div>
					<CardDescription>
						Cập nhật mỗi giờ • Dữ liệu từ 30 ngày gần nhất
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredRankings.map((user) => (
							<div
								key={user.id}
								className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
									user.isCurrentUser
										? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
										: "bg-muted/30 hover:bg-muted/50"
								}`}
							>
								<div className="flex items-center justify-center w-12">
									{getRankIcon(user.rank)}
								</div>

								<Avatar className="h-12 w-12">
									<AvatarImage
										src={`/generic-placeholder-icon.png?height=48&width=48`}
									/>
									<AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
										{user.avatar}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<p className="font-semibold truncate">
											{user.name}
										</p>
										{user.isCurrentUser && (
											<Badge className="bg-primary text-primary-foreground">
												Bạn
											</Badge>
										)}
										<Badge
											className={`text-xs ${getRankBadgeColor(
												user.rank
											)}`}
										>
											Cấp {user.level}
										</Badge>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
										<div className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											{user.studyHours}h
										</div>
										<div className="flex items-center gap-1">
											<Star className="h-3 w-3" />
											{user.points.toLocaleString()}
										</div>
										<div className="flex items-center gap-1">
											<Zap className="h-3 w-3" />
											{user.streak} ngày
										</div>
									</div>
								</div>

								<div className="text-right">
									<div className="text-2xl font-bold text-primary">
										{getCurrentValue(user, rankingType)}
									</div>
									<div className="text-xs text-muted-foreground">
										{getTypeLabel(rankingType)}
									</div>
								</div>
							</div>
						))}
					</div>

					{filteredRankings.length === 0 && (
						<div className="text-center py-12">
							<Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
							<p className="text-muted-foreground">
								Không tìm thấy người dùng nào
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Privacy Notice */}
			{!privacySettings.shareStudyHours && (
				<Card className="border-orange-200 bg-orange-50">
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<EyeOff className="h-5 w-5 text-orange-600" />
							<div>
								<p className="font-medium text-orange-800">
									Bạn chưa tham gia bảng xếp hạng
								</p>
								<p className="text-sm text-orange-600">
									Bật chia sẻ giờ học trong cài đặt riêng tư
									để tham gia thi đua với cộng đồng
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
