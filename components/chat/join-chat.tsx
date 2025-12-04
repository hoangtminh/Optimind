import { useCurrentUser } from "@/supabase/hooks/useCurrentUser";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const JoinChat = ({
	chatId,
	classname,
}: {
	chatId: string;
	classname: string;
}) => {
	const { user } = useCurrentUser();
	const router = useRouter();

	const joinChat = async () => {
		if (!user) return { error: true, message: "User not logged in" };

		const supabase = createClient();

		const { error } = await supabase.from("chat_room_member").insert({
			chat_room_id: chatId,
			member_id: user.id,
		});
		if (error) {
			return {
				error: true,
				message: error.message || "Failed to join chat",
			};
		}

		router.refresh();
		router.push(`/chat/${chatId}`);
	};

	return (
		<Button className={classname} onClick={async () => await joinChat()}>
			Join Chat Now
		</Button>
	);
};

export default JoinChat;
