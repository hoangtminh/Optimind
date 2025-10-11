"use client";
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
import {
	Sparkles,
	Lock,
	Star,
	Trophy,
	Clock,
	Zap,
	Crown,
	Heart,
	TrendingUp,
} from "lucide-react";
import { usePet } from "@/hooks/use-pet";

export default function GamificationPage() {
	const { pets, totalStudyHours, addStudyTime, setActivePet, getActivePet } =
		usePet();
	const activePet = getActivePet();

	const getRarityColor = (rarity) => {
		switch (rarity) {
			case "common":
				return "bg-gradient-to-br from-cyan-50 to-cyan-100 border-gray-200";
			case "uncommon":
				return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
			case "rare":
				return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
			case "epic":
				return "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200";
			case "legendary":
				return "bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200";
			case "mythic":
				return "bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200";
			case "cosmic":
				return "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200";
			default:
				return "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200";
		}
	};

	const getRarityTextColor = (rarity) => {
		switch (rarity) {
			case "common":
				return "text-cyan-800";
			case "uncommon":
				return "text-green-800";
			case "rare":
				return "text-blue-800";
			case "epic":
				return "text-purple-800";
			case "legendary":
				return "text-yellow-800";
			case "mythic":
				return "text-pink-800";
			case "cosmic":
				return "text-indigo-800";
			default:
				return "text-gray-800";
		}
	};

	const getStageEmoji = (stage) => {
		switch (stage) {
			case "egg":
				return "🥚";
			case "baby":
				return "🐣";
			case "teen":
				return "🐥";
			case "adult":
				return "🦅";
			case "master":
				return "👑";
			default:
				return "🥚";
		}
	};

	const getStageName = (stage) => {
		switch (stage) {
			case "egg":
				return "Trứng";
			case "baby":
				return "Bé";
			case "teen":
				return "Thiếu niên";
			case "adult":
				return "Trưởng thành";
			case "master":
				return "Bậc thầy";
			default:
				return "Trứng";
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-blue-600">
						Nuôi Pet Học Tập
					</h1>
					<p className="text-muted-foreground mt-1">
						Nuôi pet từ trứng và phát triển chúng bằng cách học tập
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl font-bold text-blue-800">
								Tổng giờ học
							</CardTitle>
							<Clock className="h-5 w-5 text-blue-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-blue-900">
							{totalStudyHours.toFixed(1)}h
						</div>
						<p className="text-sm text-blue-600 mt-1">
							Học tiếp để mở khóa pet mới
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl font-bold text-purple-800">
								Pet đã mở
							</CardTitle>
							<Trophy className="h-5 w-5 text-purple-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-purple-900">
							{pets.filter((p) => p.unlocked).length}/
							{pets.length}
						</div>
						<p className="text-sm text-purple-600 mt-1">
							Sưu tập đầy đủ
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl font-bold text-green-800">
								Pet đang nuôi
							</CardTitle>
							<Heart className="h-5 w-5 text-green-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-green-900">
							{activePet ? activePet.name : "Chưa có"}
						</div>
						<p className="text-sm text-green-600 mt-1">
							{activePet
								? getStageName(activePet.stage)
								: "Chọn pet"}
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-orange-50 to-yellow-100 border-orange-200">
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl font-bold text-orange-800">
								Cấp độ cao nhất
							</CardTitle>
							<Crown className="h-5 w-5 text-orange-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-orange-900">
							{pets.filter((p) => p.stage === "master").length}
						</div>
						<p className="text-sm text-orange-600 mt-1">
							Pet đạt bậc thầy
						</p>
					</CardContent>
				</Card>
			</div>

			{activePet && (
				<Card
					className={`${getRarityColor(activePet.rarity)} border-2`}
				>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle
									className={`text-2xl ${getRarityTextColor(
										activePet.rarity
									)}`}
								>
									{getStageEmoji(activePet.stage)}{" "}
									{activePet.name}
								</CardTitle>
								<CardDescription
									className={getRarityTextColor(
										activePet.rarity
									)}
								>
									{getStageName(activePet.stage)} -{" "}
									{activePet.rarity.toUpperCase()}
								</CardDescription>
							</div>
							<Badge
								className={`text-lg px-4 py-2 bg-gradient-to-r ${activePet.color} text-white border-0`}
							>
								<Star className="h-4 w-4 mr-1" />
								{activePet.rarity}
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="bg-white/60 p-4 rounded-lg">
							<div className="flex justify-between items-center mb-2">
								<span
									className={`text-sm font-medium ${getRarityTextColor(
										activePet.rarity
									)}`}
								>
									Kinh nghiệm đến cấp tiếp theo
								</span>
								<span
									className={`text-sm font-bold ${getRarityTextColor(
										activePet.rarity
									)}`}
								>
									{activePet.experience.toFixed(1)}/
									{activePet.requiredExp}h
								</span>
							</div>
							<Progress
								value={
									(activePet.experience /
										activePet.requiredExp) *
									100
								}
								className="h-3"
								indicatorClassName={`bg-gradient-to-r ${activePet.color}`}
							/>
							<p
								className={`text-xs mt-2 ${getRarityTextColor(
									activePet.rarity
								)}`}
							>
								Học thêm{" "}
								{(
									activePet.requiredExp - activePet.experience
								).toFixed(1)}{" "}
								giờ để lên cấp
							</p>
						</div>

						<div className="grid grid-cols-5 gap-2">
							{["egg", "baby", "teen", "adult", "master"].map(
								(stage, index) => {
									const stages = [
										"egg",
										"baby",
										"teen",
										"adult",
										"master",
									];
									const currentIndex = stages.indexOf(
										activePet.stage
									);
									const isCompleted = index <= currentIndex;
									return (
										<div
											key={stage}
											className={`p-3 rounded-lg text-center transition-all ${
												isCompleted
													? `bg-gradient-to-br ${activePet.color} text-white`
													: "bg-white/40 text-gray-400"
											}`}
										>
											<div className="text-2xl mb-1">
												{getStageEmoji(stage)}
											</div>
											<div className="text-xs font-medium">
												{getStageName(stage)}
											</div>
										</div>
									);
								}
							)}
						</div>
					</CardContent>
				</Card>
			)}

			<div>
				<h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
					Bộ sưu tập Pet
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{pets.map((pet) => (
						<Card
							key={pet.id}
							className={`${getRarityColor(
								pet.rarity
							)} transition-all duration-300 hover:shadow-lg ${
								pet.active
									? "ring-2 ring-offset-2 ring-purple-500"
									: ""
							} ${!pet.unlocked ? "opacity-60" : ""}`}
						>
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<div className="text-3xl">
												{pet.unlocked
													? getStageEmoji(pet.stage)
													: "🔒"}
											</div>
											<div>
												<CardTitle
													className={`text-base ${getRarityTextColor(
														pet.rarity
													)}`}
												>
													{pet.unlocked
														? pet.name
														: "???"}
												</CardTitle>
												<Badge
													className={`text-xs mt-1 bg-gradient-to-r ${pet.color} text-white border-0`}
													variant="outline"
												>
													{pet.rarity}
												</Badge>
											</div>
										</div>
									</div>
									{pet.active && (
										<Badge className="bg-green-500 text-white">
											<Zap className="h-3 w-3 mr-1" />
											Đang nuôi
										</Badge>
									)}
								</div>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="bg-white/60 p-3 rounded-lg space-y-2">
									{pet.unlocked ? (
										<>
											<div className="flex justify-between text-xs">
												<span
													className={getRarityTextColor(
														pet.rarity
													)}
												>
													Giai đoạn:
												</span>
												<span
													className={`font-medium ${getRarityTextColor(
														pet.rarity
													)}`}
												>
													{getStageName(pet.stage)}
												</span>
											</div>
											<div className="flex justify-between text-xs">
												<span
													className={getRarityTextColor(
														pet.rarity
													)}
												>
													Kinh nghiệm:
												</span>
												<span
													className={`font-medium ${getRarityTextColor(
														pet.rarity
													)}`}
												>
													{pet.experience.toFixed(1)}/
													{pet.requiredExp}h
												</span>
											</div>
											<Progress
												value={
													(pet.experience /
														pet.requiredExp) *
													100
												}
												className="h-2"
												indicatorClassName={`bg-gradient-to-r ${pet.color}`}
											/>
										</>
									) : (
										<>
											<div className="flex items-center gap-2 text-xs text-gray-600">
												<Lock className="h-3 w-3" />
												<span>
													Cần {pet.studyHoursRequired}
													h học tập
												</span>
											</div>
											<Progress
												value={
													(totalStudyHours /
														pet.studyHoursRequired) *
													100
												}
												className="h-2"
												indicatorClassName="bg-gray-400"
											/>
											<p className="text-xs text-gray-600">
												Còn{" "}
												{Math.max(
													0,
													pet.studyHoursRequired -
														totalStudyHours
												).toFixed(1)}
												h nữa
											</p>
										</>
									)}
								</div>

								<Button
									onClick={() => setActivePet(pet.id)}
									disabled={!pet.unlocked || pet.active}
									className={`w-full ${
										pet.active
											? "bg-green-500 hover:bg-green-500"
											: `bg-gradient-to-r ${pet.color} hover:opacity-90`
									}`}
								>
									{pet.active ? (
										<>
											<Heart className="h-4 w-4 mr-2" />
											Đang nuôi
										</>
									) : pet.unlocked ? (
										<>
											<Sparkles className="h-4 w-4 mr-2" />
											Chọn nuôi
										</>
									) : (
										<>
											<Lock className="h-4 w-4 mr-2" />
											Chưa mở khóa
										</>
									)}
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			<Card className="bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-indigo-800">
						<TrendingUp className="h-5 w-5" />
						Hướng dẫn nuôi Pet
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="bg-white/60 p-4 rounded-lg">
						<h3 className="font-semibold text-indigo-800 mb-2">
							Cách mở khóa Pet mới:
						</h3>
						<ul className="space-y-1 text-sm text-indigo-700">
							<li>• Học tập để tích lũy giờ học</li>
							<li>
								• Mỗi pet cần số giờ học khác nhau để mở khóa
							</li>
							<li>• Pet hiếm hơn cần nhiều giờ học hơn</li>
						</ul>
					</div>
					<div className="bg-white/60 p-4 rounded-lg">
						<h3 className="font-semibold text-indigo-800 mb-2">
							Cách phát triển Pet:
						</h3>
						<ul className="space-y-1 text-sm text-indigo-700">
							<li>
								• Chọn một pet để nuôi (chỉ nuôi được 1 pet cùng
								lúc)
							</li>
							<li>• Mỗi giờ học sẽ cho pet kinh nghiệm</li>
							<li>
								• Pet sẽ phát triển qua 5 giai đoạn: Trứng → Bé
								→ Thiếu niên → Trưởng thành → Bậc thầy
							</li>
							<li>
								• Pet hiếm hơn cần nhiều kinh nghiệm hơn để lên
								cấp
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
