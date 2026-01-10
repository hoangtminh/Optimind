"use client";
import { Friend, FriendRequest } from "@/lib/type/friend-type";
import {
	acceptFriendRequest,
	createFriendRequests,
	deleteFriendRequest,
	withdrawFriendRequest,
} from "@/supabase/actions/friend";
import {
	getFriend,
	getFriendRequest,
	getSentRequest,
} from "@/supabase/lib/getFriend";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface FriendContextType {
	friends: Friend[];
	friendRequests: FriendRequest[];
	sentRequests: FriendRequest[];
	onSendRequest: (friendEmail: string) => void;
	onAcceptRequest: (requestId: string) => void;
	onDeclineRequest: (requestId: string) => void;
	onWithdrawRequest: (requestId: string) => void;
	onDeleteFriend: (friendId: string) => void;
	isFriendLoading: boolean;
}

const FriendContext = createContext<FriendContextType | undefined>(undefined);

export const useFriend = () => {
	const context = useContext(FriendContext);
	if (!context) {
		throw new Error("useFriend must be used within a FriendProvider");
	}
	return context;
};

export const FriendProvider = ({ children }: { children: React.ReactNode }) => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
	const [isFriendLoading, setIsFriendLoading] = useState(true);

	const getUserFriend = async () => {
		const userFriends = await getFriend();
		setFriends(userFriends || []);
	};
	const getUserFriendRequest = async () => {
		const userFriendRequests = await getFriendRequest();
		setFriendRequests(userFriendRequests || []);
	};
	const getUserSentRequest = async () => {
		const userSentRequests = await getSentRequest();
		setSentRequests(userSentRequests || []);
	};

	const onSendRequest = async (friendEmail: string) => {
		const { error, message } = await createFriendRequests(friendEmail);
		if (error) {
			toast.error(message as string);
		} else {
			setSentRequests((prev) => [message as FriendRequest, ...prev]);
			toast.success("Sent request!");
		}
	};

	const onAcceptRequest = async (requestId: string) => {
		const { error, message } = await acceptFriendRequest(requestId);

		if (error) {
			toast.error(message as string);
		} else {
			const { error: acceptError, message: acceptErrorMessage } =
				await deleteFriendRequest(requestId);
			if (acceptError) {
				toast.error(acceptErrorMessage);
			} else {
				toast.success("Friend request accepted");
				setFriendRequests((prev) =>
					prev.filter((req) => req.id !== requestId)
				);
				setFriends((prev) => [message as Friend, ...prev]);
			}
		}
	};

	const onDeclineRequest = async (requestId: string) => {
		const { error, message } = await deleteFriendRequest(requestId);

		if (error) {
			toast.error(message as string);
		} else {
			setFriendRequests((prev) =>
				prev.filter((req) => req.id !== requestId)
			);
		}
	};

	const onWithdrawRequest = async (requestId: string) => {
		const { error, message } = await withdrawFriendRequest(requestId);

		if (error) {
			toast.error(message as string);
		} else {
			toast.success("Retrieved friend request");
			setSentRequests((prev) =>
				prev.filter((req) => req.id !== requestId)
			);
		}
	};

	const onDeleteFriend = async (friendId: string) => {};

	useEffect(() => {
		const fetchData = async () => {
			await getUserFriend();
			await getUserFriendRequest();
			await getUserSentRequest();
			setIsFriendLoading(false);
		};

		fetchData();
	}, []);

	const value = {
		friends,
		friendRequests,
		sentRequests,
		onSendRequest,
		onAcceptRequest,
		onDeclineRequest,
		onWithdrawRequest,
		onDeleteFriend,
		isFriendLoading,
	};

	return (
		<FriendContext.Provider value={value}>
			{children}
		</FriendContext.Provider>
	);
};
