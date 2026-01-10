"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RequestList from "./request-list";
import SentList from "./sent-list";
import FriendList from "./friend-list";
import { Suspense, useState } from "react";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { useFriend } from "@/hooks/useFriend";

const FriendSection = () => {
	const { isFriendLoading, onSendRequest } = useFriend();
	const [inputEmail, setInputEmail] = useState("");

	return (
		<div className="grid grid-cols-1">
			<div className="flex gap-2 mb-3">
				<div className="relative">
					<Search className="absolute h-4 w-4 left-2 top-1/2 -translate-y-1/2" />
					<Input
						placeholder="Kết bạn với người khác"
						className="pl-8 placeholder:text-white"
						value={inputEmail}
						onChange={(e) => setInputEmail(e.target.value)}
					/>
				</div>
				<Button
					className="bg-blue-600 hover:bg-blue-700"
					onClick={() => onSendRequest(inputEmail)}
				>
					Add
				</Button>
			</div>
			<div className="grid w-full max-h-105">
				<ScrollArea
					type="auto"
					className="-mr-4 pr-3 space-y-3 overflow-hidden"
				>
					<LoadingSwap isLoading={isFriendLoading}>
						<RequestList />
						<SentList />
						<FriendList />
					</LoadingSwap>
				</ScrollArea>
			</div>
		</div>
	);
};

export default FriendSection;
