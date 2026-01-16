import { Profile } from "@/lib/type/profile-type";
import { LoadingSwap } from "../ui/loading-swap";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

const Leaderboard = ({
	profile,
	ranking,
	isLoading,
}: {
	profile: Profile | null;
	ranking: Profile[];
	isLoading: boolean;
}) => {
	const glassEffect =
		"bg-black/50 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	// Hàm định dạng HHhMMm
	const formatTime = (minutes: number) => {
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		return `${h}h${m.toString().padStart(2, "0")}m`;
	};

	return (
		<div className={cn("flex flex-[1.75] w-full gap-6 p-4", glassEffect)}>
			{/* CỘT BÊN PHẢI: Danh sách xếp hạng */}
			<div className="w-full flex flex-col">
				<div className="flex items-center gap-2 mb-6">
					<span className="text-yellow-500 text-2xl">🏆</span>
					<h2 className="text-xl font-bold">
						Bảng Xếp Hạng Toàn Cầu
					</h2>
				</div>

				{/* Scroll Area */}
				<LoadingSwap isLoading={isLoading}>
					{profile ? (
						<ScrollArea className="p-2 space-y-3 overflow-y-auto max-h-115">
							<div className="space-y-2">
								{ranking.map((user, index) => {
									const isCurrentUser =
										user.id === profile.id;
									return (
										<div
											key={user.id}
											className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer
                                                ${
													isCurrentUser
														? "bg-purple-600/30 border border-purple-500/50"
														: "bg-white/5 border border-white/5 hover:bg-white/10"
												}
                                                `}
										>
											<div className="flex items-center gap-4 flex-1">
												<div className="w-8 text-center text-gray-400 font-bold">
													{index === 0
														? "🏆"
														: index === 1
														? "🥈"
														: index === 2
														? "🥉"
														: `#${index + 1}`}
												</div>
												{user.image_url ? (
													<Image
														src={
															user.image_url || ""
														}
														alt={user.name.slice(
															0,
															1
														)}
														width={40}
														height={40}
														className="rounded-full"
													/>
												) : (
													<div className="w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center text-2xl font-bold">
														{user.name
															.toLocaleUpperCase()
															.slice(0, 1)}
													</div>
												)}
												<div>
													<h4 className="font-bold text-sm">
														{user.name}
													</h4>
													<p className="text-[10px] text-gray-400">
														{user.email}
													</p>
												</div>
											</div>

											<div className="flex gap-6 items-center text-xs">
												<div className="text-center w-12">
													<p className="text-gray-400 text-[10px]">
														Level
													</p>
													<p className="font-bold text-yellow-500">
														{user.level}
													</p>
												</div>
												<div className="text-center w-12">
													<p className="text-gray-400 text-[10px]">
														EXP
													</p>
													<p className="font-bold text-blue-400">
														{user.exp}
													</p>
												</div>
												<div className="text-center w-12">
													<p className="text-gray-400 text-[10px]">
														Coins
													</p>
													<p className="font-bold text-green-400">
														{user.coins}
													</p>
												</div>
												<div className="text-center w-16">
													<p className="text-gray-400 text-[10px]">
														Giờ
													</p>
													<p className="font-bold text-purple-400">
														{formatTime(
															user.study_time
														)}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</ScrollArea>
					) : (
						<div className="bg-linear-to-br from-purple-600/40 to-blue-500/20 rounded-2xl p-6 border border-purple-500/30">
							<div className="flex items-center gap-4 mb-6">
								<div>
									<h3 className="font-bold">
										User not authenticated
									</h3>
								</div>
							</div>
						</div>
					)}
				</LoadingSwap>
			</div>
		</div>
	);
};

export default Leaderboard;
