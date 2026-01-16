import { Profile } from "@/lib/type/profile-type";
import { Dispatch, SetStateAction } from "react";
import { LoadingSwap } from "../ui/loading-swap";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserScore = ({
	profile,
	view,
	setView,
	isLoading,
}: {
	profile: Profile | null;
	view: string;
	setView: Dispatch<SetStateAction<"global" | "friends">>;
	isLoading: boolean;
}) => {
	const glassEffect =
		"bg-black/50 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";

	return (
		<div className="flex-1 w-full space-y-3">
			<div className={cn("p-4", glassEffect)}>
				<div className="flex items-center gap-2 mb-2">
					<span className="text-yellow-500 text-2xl">👑</span>
					<h2 className="text-xl font-bold">Bảng Xếp Hạng</h2>
				</div>
				<p className="text-white text-sm mb-4">
					Thứ hạng và thành tích
				</p>
				{/* Card người dùng hiện tại */}
				<LoadingSwap isLoading={isLoading}>
					{profile ? (
						<div className="bg-linear-to-br from-purple-600/50 to-blue-500/30 rounded-2xl p-6 border border-purple-500/30">
							<div className="flex items-center gap-4 mb-6">
								{profile.image_url ? (
									<Image
										src={profile.image_url || ""}
										alt={profile.name.slice(0, 1)}
										width={40}
										height={40}
										className="rounded-full"
									/>
								) : (
									<div className="w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center text-2xl font-bold">
										{profile.name
											.toLocaleUpperCase()
											.slice(0, 1)}
									</div>
								)}
								<div>
									<h3 className="font-bold">
										{profile.name}
									</h3>
									<p className="text-xs text-gray-300">
										{profile.email}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-2 text-center">
								<div className="bg-white/10 p-2 rounded-xl">
									<p className="text-[10px] text-gray-300 uppercase">
										Level
									</p>
									<p className="text-yellow-400 font-bold">
										{profile.level}
									</p>
								</div>
								<div className="bg-white/10 p-2 rounded-xl">
									<p className="text-[10px] text-gray-300 uppercase">
										EXP
									</p>
									<p className="text-blue-400 font-bold">
										{profile.exp}
									</p>
								</div>
								<div className="bg-white/10 p-2 rounded-xl">
									<p className="text-[10px] text-gray-300 uppercase">
										Coins
									</p>
									<p className="text-green-400 font-bold">
										{profile.coins}
									</p>
								</div>
							</div>
						</div>
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

				{/* Nút chuyển đổi */}
				<div className="flex gap-2 mt-8 bg-black/20 p-1 rounded-xl">
					<button
						onClick={() => setView("global")}
						className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
							view === "global"
								? "bg-white/20 shadow-lg"
								: "hover:bg-white/5"
						}`}
					>
						🌎 Toàn cầu
					</button>
					<button
						onClick={() => setView("friends")}
						className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition ${
							view === "friends"
								? "bg-white/20 shadow-lg"
								: "hover:bg-white/5"
						}`}
					>
						👥 Bạn bè
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserScore;
