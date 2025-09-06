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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Trophy,
	Star,
	Award,
	Coins,
	Gift,
	Zap,
	Target,
	Crown,
	Sparkles,
	ShoppingCart,
	Lock,
	CheckCircle,
	TrendingUp,
	Gamepad2,
	Medal,
	Flame,
} from "lucide-react";

export default function GamificationPage() {
	const [userPoints, setUserPoints] = useState(2450);
	const [userLevel, setUserLevel] = useState(12);
	const [currentStreak, setCurrentStreak] = useState(7);

	// Mock data for achievements
	const achievements = [
		{
			id: 1,
			name: "Người mới bắt đầu",
			description: "Hoàn thành phiên học đầu tiên",
			icon: Star,
			unlocked: true,
			points: 50,
			rarity: "common",
		},
		{
			id: 2,
			name: "Kiên trì 7 ngày",
			description: "Học liên tục 7 ngày",
			icon: Flame,
			unlocked: true,
			points: 200,
			rarity: "rare",
		},
		{
			id: 3,
			name: "Bậc thầy tập trung",
			description: "Đạt 95% độ tập trung trong 1 phiên",
			icon: Target,
			unlocked: true,
			points: 300,
			rarity: "epic",
		},
		{
			id: 4,
			name: "Vua thời gian",
			description: "Học 100 giờ tích lũy",
			icon: Crown,
			unlocked: false,
			points: 500,
			rarity: "legendary",
			progress: 67,
		},
		{
			id: 5,
			name: "Siêu nhân học tập",
			description: "Học 8 giờ trong 1 ngày",
			icon: Zap,
			unlocked: false,
			points: 400,
			rarity: "epic",
			progress: 25,
		},
		{
			id: 6,
			name: "Nhà vô địch",
			description: "Đứng top 1 bảng xếp hạng tuần",
			icon: Medal,
			unlocked: false,
			points: 1000,
			rarity: "legendary",
			progress: 0,
		},
	];

	// Mock data for shop items
	const shopItems = [
		{
			id: 1,
			name: "Theme Dark Mode Premium",
			description: "Giao diện tối cao cấp cho mắt",
			price: 500,
			icon: Sparkles,
			category: "theme",
			owned: false,
		},
		{
			id: 2,
			name: "Nhạc nền tập trung",
			description: "Bộ sưu tập nhạc giúp tập trung",
			price: 300,
			icon: Gamepad2,
			category: "audio",
			owned: true,
		},
		{
			id: 3,
			name: "Avatar khung vàng",
			description: "Khung avatar đặc biệt",
			price: 800,
			icon: Crown,
			category: "cosmetic",
			owned: false,
		},
		{
			id: 4,
			name: "Boost XP x2",
			description: "Nhân đôi điểm kinh nghiệm trong 24h",
			price: 1000,
			icon: Zap,
			category: "boost",
			owned: false,
		},
		{
			id: 5,
			name: "Thông báo tùy chỉnh",
			description: "Âm thanh thông báo cá nhân hóa",
			price: 200,
			icon: Gift,
			category: "audio",
			owned: false,
		},
		{
			id: 6,
			name: "Báo cáo chi tiết Pro",
			description: "Phân tích học tập nâng cao",
			price: 1500,
			icon: TrendingUp,
			category: "feature",
			owned: false,
		},
	];

	const getRarityColor = (rarity) => {
		switch (rarity) {
			case "common":
				return "bg-gray-100 text-gray-800 border-gray-200";
			case "rare":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "epic":
				return "bg-purple-100 text-purple-800 border-purple-200";
			case "legendary":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getCategoryColor = (category) => {
		switch (category) {
			case "theme":
				return "bg-indigo-100 text-indigo-800";
			case "audio":
				return "bg-green-100 text-green-800";
			case "cosmetic":
				return "bg-pink-100 text-pink-800";
			case "boost":
				return "bg-orange-100 text-orange-800";
			case "feature":
				return "bg-cyan-100 text-cyan-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const handlePurchase = (item) => {
		if (userPoints >= item.price && !item.owned) {
			setUserPoints(userPoints - item.price);
			// Update item as owned (in real app, this would be an API call)
			console.log(`Purchased ${item.name}`);
		}
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
						Trò chơi & Phần thưởng
					</h1>
					<p className="text-muted-foreground mt-1">
						Kiếm điểm, mở khóa thành tựu và đổi phần thưởng
					</p>
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium text-primary">
								Điểm hiện tại
							</CardTitle>
							<Coins className="h-5 w-5 text-primary" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">
							{userPoints.toLocaleString()}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							+150 điểm hôm nay
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium text-secondary">
								Cấp độ
							</CardTitle>
							<Trophy className="h-5 w-5 text-secondary" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-secondary">
							Cấp {userLevel}
						</div>
						<Progress value={75} className="mt-2 h-2" />
						<p className="text-xs text-muted-foreground mt-1">
							750/1000 XP đến cấp tiếp theo
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium text-accent">
								Streak hiện tại
							</CardTitle>
							<Flame className="h-5 w-5 text-accent" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-accent">
							{currentStreak} ngày
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Kỷ lục cá nhân: 15 ngày
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
					<CardHeader className="pb-3">
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium text-green-800">
								Thành tựu
							</CardTitle>
							<Award className="h-5 w-5 text-green-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-800">
							{achievements.filter((a) => a.unlocked).length}/
							{achievements.length}
						</div>
						<p className="text-xs text-green-600 mt-1">
							Đã mở khóa
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Main Content */}
			<Tabs defaultValue="achievements" className="space-y-6">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="achievements"
						className="flex items-center gap-2"
					>
						<Award className="h-4 w-4" />
						Thành tựu
					</TabsTrigger>
					<TabsTrigger
						value="shop"
						className="flex items-center gap-2"
					>
						<ShoppingCart className="h-4 w-4" />
						Cửa hàng
					</TabsTrigger>
				</TabsList>

				<TabsContent value="achievements" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{achievements.map((achievement) => (
							<Card
								key={achievement.id}
								className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
									achievement.unlocked
										? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
										: "bg-card border-border"
								}`}
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-3">
											<div
												className={`p-2 rounded-lg ${
													achievement.unlocked
														? "bg-green-100 text-green-600"
														: "bg-muted text-muted-foreground"
												}`}
											>
												{achievement.unlocked ? (
													<achievement.icon className="h-6 w-6" />
												) : (
													<Lock className="h-6 w-6" />
												)}
											</div>
											<div>
												<CardTitle className="text-base">
													{achievement.name}
												</CardTitle>
												<Badge
													className={`text-xs mt-1 ${getRarityColor(
														achievement.rarity
													)}`}
												>
													{achievement.rarity}
												</Badge>
											</div>
										</div>
										{achievement.unlocked && (
											<CheckCircle className="h-5 w-5 text-green-500" />
										)}
									</div>
								</CardHeader>
								<CardContent>
									<CardDescription className="mb-3">
										{achievement.description}
									</CardDescription>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1 text-sm font-medium text-primary">
											<Coins className="h-4 w-4" />
											{achievement.points} điểm
										</div>
										{!achievement.unlocked &&
											achievement.progress !==
												undefined && (
												<div className="text-xs text-muted-foreground">
													{achievement.progress}%
												</div>
											)}
									</div>
									{!achievement.unlocked &&
										achievement.progress !== undefined && (
											<Progress
												value={achievement.progress}
												className="mt-2 h-2"
											/>
										)}
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="shop" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{shopItems.map((item) => (
							<Card
								key={item.id}
								className="relative overflow-hidden transition-all duration-300 hover:shadow-lg"
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg text-white">
												<item.icon className="h-6 w-6" />
											</div>
											<div>
												<CardTitle className="text-base">
													{item.name}
												</CardTitle>
												<Badge
													className={`text-xs mt-1 ${getCategoryColor(
														item.category
													)}`}
												>
													{item.category}
												</Badge>
											</div>
										</div>
										{item.owned && (
											<CheckCircle className="h-5 w-5 text-green-500" />
										)}
									</div>
								</CardHeader>
								<CardContent>
									<CardDescription className="mb-4">
										{item.description}
									</CardDescription>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-1 text-lg font-bold text-primary">
											<Coins className="h-5 w-5" />
											{item.price.toLocaleString()}
										</div>
										<Button
											onClick={() => handlePurchase(item)}
											disabled={
												item.owned ||
												userPoints < item.price
											}
											size="sm"
											className={
												item.owned
													? "bg-green-100 text-green-800 hover:bg-green-100"
													: userPoints < item.price
													? "bg-muted text-muted-foreground"
													: "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
											}
										>
											{item.owned ? (
												<>
													<CheckCircle className="h-4 w-4 mr-1" />
													Đã sở hữu
												</>
											) : userPoints < item.price ? (
												<>
													<Lock className="h-4 w-4 mr-1" />
													Không đủ điểm
												</>
											) : (
												<>
													<ShoppingCart className="h-4 w-4 mr-1" />
													Mua ngay
												</>
											)}
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
