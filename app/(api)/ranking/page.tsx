// Tên file: app/leaderboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Leaderboard from "@/components/ranking/leader-board";
import UserScore from "../../../components/ranking/user-score";
import { Profile } from "@/lib/type/profile-type";
import {
	getFriendProfile,
	getLeaderBoard,
	getUserProfile,
} from "@/supabase/lib/getRanking";

export default function LeaderboardPage() {
	const [view, setView] = useState<"global" | "friends">("global");
	const [ranking, setRanking] = useState<Profile[]>([]);
	const [friendRanking, setFriendRanking] = useState<Profile[]>([]);
	const [profile, setProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			const userProfile = await getUserProfile();
			const leaderboard = await getLeaderBoard();
			const friendRank = await getFriendProfile();
			setProfile(userProfile);
			setRanking(leaderboard ? leaderboard : []);
			setFriendRanking(friendRank ? friendRank : []);
			return setIsLoading(false);
		};

		fetchProfile();
	}, []);

	return (
		<main className="h-screen w-screen text-white transition-all duration-500 overflow-hidden">
			<div className="relative w-full h-full">
				<div
					className={
						"flex gap-6 w-[80%] absolute top-20 bottom-4 left-1/2 -translate-x-1/2"
					}
				>
					{/* CỘT BÊN TRÁI: Thông tin cá nhân */}
					<UserScore
						profile={profile}
						view={view}
						setView={setView}
						isLoading={isLoading}
					/>
					<Leaderboard
						profile={profile}
						ranking={view === "global" ? ranking : friendRanking}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</main>
	);
}
