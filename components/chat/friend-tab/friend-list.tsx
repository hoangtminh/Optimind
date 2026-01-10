import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useFriend } from "@/hooks/useFriend";
import { useState } from "react";

const FriendList = () => {
	const { friends, onDeleteFriend } = useFriend();
	const [isFriendsOpen, setIsFriendsOpen] = useState(false);

	return (
		<Collapsible open={isFriendsOpen} onOpenChange={setIsFriendsOpen}>
			<CollapsibleTrigger className="flex items-center w-full text-left bg-black/60">
				{isFriendsOpen ? (
					<ChevronDown className="w-5 h-5" />
				) : (
					<ChevronRight className="w-5 h-5" />
				)}
				Friends list ({friends.length})
			</CollapsibleTrigger>
			<CollapsibleContent className="bg-black/30 py-2 space-y-2 rounded-b-md px-2">
				{friends.map((friend) => (
					<Card
						key={friend.id}
						className="w-full px-3 py-2 rounded-lg flex flex-row items-center gap-3 bg-black/60 border-0"
					>
						<Avatar className="h-10 w-10">
							<AvatarImage src={friend.image_url || undefined} />
							<AvatarFallback className="text-lg font-bold">
								{friend.name.slice(0, 1).toLocaleUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="grid grid-cols-1 gap-2 w-full overflow-hidden">
							<div className="w-full">
								<CardHeader className="text-sm font-semibold text-white p-0 gap-0 wrap-break-word">
									{friend.name}
								</CardHeader>
								{friend.name != friend.email && (
									<CardDescription className="text-xs text-white/70 truncate">
										{friend.email}
									</CardDescription>
								)}
							</div>
						</div>
					</Card>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default FriendList;
