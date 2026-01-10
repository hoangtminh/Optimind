"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import LeaveChat from "../leave-chat";
import { useRouter } from "next/navigation";

const ChatCard = ({
	id,
	name,
	memberCount,
}: {
	id: string;
	name: string;
	memberCount: number;
}) => {
	const router = useRouter();
	return (
		<Card
			className="w-full mb-2 py-2 cursor-pointer hover:bg-gray-100"
			onClick={() => router.push(`/chat/${id}`)}
		>
			<CardHeader className="pl-4 pr-8 gap-0">
				<CardTitle className="h-5 mb-0 overflow-hidden text-ellipsis">
					{name}
				</CardTitle>
				<CardDescription>
					{memberCount} {memberCount === 1 ? "member" : "members"}
				</CardDescription>
			</CardHeader>
		</Card>
	);
};

export default ChatCard;
