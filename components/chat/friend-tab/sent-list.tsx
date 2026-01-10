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
import { Button } from "@/components/ui/button";

const SentList = () => {
	const { onWithdrawRequest, sentRequests } = useFriend();
	const [isSentRequestOpen, setIsSentRequestOpen] = useState(false);

	return (
		<Collapsible
			open={isSentRequestOpen}
			onOpenChange={setIsSentRequestOpen}
		>
			<CollapsibleTrigger className="flex items-center w-full text-left bg-black/60">
				{isSentRequestOpen ? (
					<ChevronDown className="w-5 h-5" />
				) : (
					<ChevronRight className="w-5 h-5" />
				)}
				Sent Requests ({sentRequests.length})
			</CollapsibleTrigger>
			<CollapsibleContent className="bg-black/30 p-2 space-y-2 rounded-b-md mb-2">
				{sentRequests.map((req) => (
					<Card
						key={req.id}
						className="grid grid-cols-1 w-full px-3 py-2 rounded-lg items-center gap-2 bg-black/60 border-0"
					>
						<div className="flex items-center gap-2">
							<Avatar className="h-12 w-12">
								<AvatarImage
									src={req.user.image_url || undefined}
								/>
								<AvatarFallback>{req.user.name}</AvatarFallback>
							</Avatar>
							<div className="grid grid-cols-1 gap-2 w-full overflow-hidden">
								<div className="w-full">
									<CardHeader className="font-semibold text-white p-0 gap-0">
										{req.user.name}
									</CardHeader>
									{req.user.name && (
										<CardDescription className="text-xs text-white/70 truncate">
											{req.user.email}
										</CardDescription>
									)}
								</div>
							</div>
						</div>
						<div className="flex gap-2 justify-end">
							<Button
								size="sm"
								variant="ghost"
								className="px-1 flex-1 bg-white/50 hover:bg-white/70"
								onClick={() => onWithdrawRequest(req.id)}
							>
								Hủy yêu cầu
							</Button>
						</div>
					</Card>
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};

export default SentList;
