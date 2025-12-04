import React from "react";
import { Button } from "../ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useCurrentUser } from "@/supabase/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const LeaveChat = ({
	chatId,
	classname,
}: {
	chatId: string;
	classname: string;
}) => {
	const { user } = useCurrentUser();
	const router = useRouter();

	const leaveChat = async () => {
		if (!user) return { error: true, message: "User not logged in" };

		const supabase = createClient();

		const { error } = await supabase
			.from("chat_room_member")
			.delete()
			.eq("chat_room_id", chatId)
			.eq("member_id", user.id);

		if (error) {
			return {
				error: true,
				message: error.message || "Failed to leave chat",
			};
		}

		router.refresh();
		router.push(`/chat`);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger className={classname}>
				Leave Chat
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						You will no longer see any message from this chat.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={async () => await leaveChat()}>
						Leave
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default LeaveChat;
