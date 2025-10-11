"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Trophy,
	Crown,
	Medal,
	Users,
	Globe,
	UserPlus,
	Clock,
	Star,
	Zap,
	Search,
	ChevronUp,
	ChevronDown,
} from "lucide-react";

export default function RankingPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [rankingMode, setRankingMode] = useState("server");

	// Generate mock data for 100 users
	const generateRankings = (count = 100) => {
		const names = [
			"Nguyễn Minh Anh",
			"Trần Thanh Hương",
			"Lê Đức Minh",
			"Phạm Thị Lan",
			"Hoàng Văn Nam",
			"Vũ Thị Mai",
			"Đặng Quốc Bảo",
			"Bùi Hồng Nhung",
			"Dương Minh Tuấn",
			"Lý Thị Hoa",
		];

		return Array.from({ length: count }, (_, i) => ({
			id: i + 1,
			rank: i + 1,
			name: i === 3 ? "Bạn" : names[i % names.length],
			avatar:
				i === 3
					? "B"
					: names[i % names.length]
							.split(" ")
							.map((n) => n[0])
							.join(""),
			studyHours: Math.max(10, 160 - i * 1.5 + Math.random() * 5),
			points: Math.max(1000, 16000 - i * 150 + Math.random() * 500),
			streak: Math.max(1, 30 - Math.floor(i / 3)),
			level: Math.max(1, 15 - Math.floor(i / 7)),
			achievements: Math.max(5, 45 - Math.floor(i / 2)),
			isCurrentUser: i === 3,
		}));
	};

	const serverRankings = generateRankings(100);
	const groupRankings = generateRankings(50);
	const friendsRankings = generateRankings(23);

	const getCurrentRankings = () => {
		switch (rankingMode) {
			case "server":
				return serverRankings;
			case "group":
				return groupRankings;
			case "friends":
				return friendsRankings;
			default:
				return serverRankings;
		}
	};

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
					<span className="text-sm font-bold text-muted-foreground">
						#{rank}
					</span>
				);
		}
	};

	const getRankCardColor = (rank) => {
		if (rank === 1) return "from-yellow-50 to-orange-50 border-yellow-200";
		if (rank === 2) return "from-gray-50 to-slate-50 border-gray-200";
		if (rank === 3) return "from-amber-50 to-yellow-50 border-amber-200";
		if (rank <= 10) return "from-blue-50 to-cyan-50 border-blue-200";
		if (rank <= 25) return "from-green-50 to-emerald-50 border-green-200";
		if (rank <= 50) return "from-purple-50 to-violet-50 border-purple-200";
		return "from-gray-50 to-slate-50 border-gray-200";
	};

	const filteredRankings = getCurrentRankings().filter((user) =>
		user.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const getModeInfo = () => {
		switch (rankingMode) {
			case "server":
				return {
					title: "Bảng xếp hạng Server",
					description:
						"Top 100 người học tập xuất sắc nhất trên toàn server",
					icon: Globe,
					color: "from-blue-600 to-cyan-600",
					total: serverRankings.length,
				};
			case "group":
				return {
					title: "Bảng xếp hạng Nhóm",
					description:
						"Top 100 thành viên trong nhóm học tập của bạn",
					icon: Users,
					color: "from-purple-600 to-pink-600",
					total: groupRankings.length,
				};
			case "friends":
				return {
					title: "Bảng xếp hạng Bạn bè",
					description: "Xếp hạng giữa bạn và bạn bè của bạn",
					icon: UserPlus,
					color: "from-green-600 to-emerald-600",
					total: friendsRankings.length,
				};
			default:
				return {
					title: "Bảng xếp hạng",
					description: "",
					icon: Trophy,
					color: "from-blue-600 to-purple-600",
					total: 0,
				};
		}
	};

	const modeInfo = getModeInfo();
	const ModeIcon = modeInfo.icon;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="space-y-2">
				<h1 className={`text-3xl font-bold text-blue-600`}>
					Bảng xếp hạng
				</h1>
				<p className="text-muted-foreground">{modeInfo.description}</p>
			</div>

			{/* Mode Selection Tabs */}
			<Tabs
				value={rankingMode}
				onValueChange={setRankingMode}
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-purple-50">
					<TabsTrigger
						value="server"
						className="flex items-center gap-2"
					>
						<Globe className="h-4 w-4" />
						Server
					</TabsTrigger>
					<TabsTrigger
						value="group"
						className="flex items-center gap-2"
					>
						<Users className="h-4 w-4" />
						Nhóm
					</TabsTrigger>
					<TabsTrigger
						value="friends"
						className="flex items-center gap-2"
					>
						<UserPlus className="h-4 w-4" />
						Bạn bè
					</TabsTrigger>
				</TabsList>

				{/* Stats Overview */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
					<Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-blue-800 font-medium">
										Tổng người tham gia
									</p>
									<p className="text-2xl font-bold text-blue-900">
										{modeInfo.total}
									</p>
								</div>
								<ModeIcon className="h-8 w-8 text-blue-600" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-green-800 font-medium">
										Xếp hạng của bạn
									</p>
									<p className="text-2xl font-bold text-green-900">
										#4
									</p>
								</div>
								<Trophy className="h-8 w-8 text-green-600" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-orange-800 font-medium">
										Giờ học của bạn
									</p>
									<p className="text-2xl font-bold text-orange-900">
										125.2h
									</p>
								</div>
								<Clock className="h-8 w-8 text-orange-600" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-purple-800 font-medium">
										Điểm của bạn
									</p>
									<p className="text-2xl font-bold text-purple-900">
										12,520
									</p>
								</div>
								<Star className="h-8 w-8 text-purple-600" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Search */}
				<div className="relative mt-6">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Tìm kiếm người dùng..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10"
					/>
				</div>

				{/* Rankings List */}
				<TabsContent value={rankingMode} className="mt-6">
					<Card className="bg-green-100 border-2 border-green-300">
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="flex items-center gap-2 text-green-700">
									<Trophy className="h-5 w-5 text-green-600" />
									Top {modeInfo.total} - Xếp hạng theo giờ học
								</CardTitle>
								<Badge variant="outline" className="bg-white">
									{filteredRankings.length} người
								</Badge>
							</div>
							<CardDescription>
								Cập nhật mỗi giờ • Dữ liệu từ 30 ngày gần nhất
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-[600px] pr-4">
								<div className="space-y-3">
									{filteredRankings.map((user) => (
										<Card
											key={user.id}
											className={`bg-gradient-to-br ${getRankCardColor(
												user.rank
											)} transition-all duration-300 hover:shadow-md ${
												user.isCurrentUser
													? "ring-2 ring-green-600"
													: ""
											}`}
										>
											<CardContent className="p-4">
												<div className="flex items-center gap-4">
													{/* Rank */}
													<div className="flex items-center justify-center w-12 flex-shrink-0">
														{getRankIcon(user.rank)}
													</div>

													{/* Avatar */}
													<Avatar className="h-12 w-12 flex-shrink-0">
														<AvatarImage src="/generic-placeholder-icon.png" />
														<AvatarFallback className="bg-white border-2 text-slate-800 font-bold">
															{user.avatar}
														</AvatarFallback>
													</Avatar>

													{/* User Info */}
													<div className="flex-1 min-w-0">
														<div className="flex items-center gap-2 mb-1">
															<p className="font-semibold truncate text-gray-900">
																{user.name}
															</p>
															{user.isCurrentUser && (
																<Badge className="bg-primary text-primary-foreground">
																	Bạn
																</Badge>
															)}
															<Badge
																variant="outline"
																className={`text-xs ${
																	user.rank <=
																	3
																		? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0"
																		: "bg-white/60"
																}`}
															>
																Cấp {user.level}
															</Badge>
														</div>
														<div className="flex items-center gap-4 text-sm text-gray-600">
															<div className="flex items-center gap-1">
																<Clock className="h-3 w-3" />
																{user.studyHours.toFixed(
																	1
																)}
																h
															</div>
															<div className="flex items-center gap-1">
																<Star className="h-3 w-3" />
																{user.points.toLocaleString()}
															</div>
															<div className="flex items-center gap-1">
																<Zap className="h-3 w-3" />
																{user.streak}{" "}
																ngày
															</div>
															<div className="flex items-center gap-1">
																<Trophy className="h-3 w-3" />
																{
																	user.achievements
																}
															</div>
														</div>
													</div>

													{/* Main Stat */}
													<div className="text-right flex-shrink-0">
														<div className="text-2xl font-bold text-primary">
															{user.studyHours.toFixed(
																1
															)}
															h
														</div>
														<div className="text-xs text-muted-foreground">
															Giờ học
														</div>
													</div>

													{/* Rank Change Indicator */}
													{user.rank <= 50 && (
														<div className="flex-shrink-0">
															{Math.random() >
															0.5 ? (
																<div className="flex items-center gap-1 text-green-600">
																	<ChevronUp className="h-4 w-4" />
																	<span className="text-xs font-medium">
																		{Math.floor(
																			Math.random() *
																				5
																		) + 1}
																	</span>
																</div>
															) : (
																<div className="flex items-center gap-1 text-red-600">
																	<ChevronDown className="h-4 w-4" />
																	<span className="text-xs font-medium">
																		{Math.floor(
																			Math.random() *
																				3
																		) + 1}
																	</span>
																</div>
															)}
														</div>
													)}
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</ScrollArea>

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
				</TabsContent>
			</Tabs>
		</div>
	);
}
