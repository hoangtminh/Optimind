import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { deleteUserFromChat } from "@/supabase/actions/chat";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ChatMember = ({
	member,
	chatId,
}: {
	member: {
		member_id: string;
		name: string;
		image_url: string | null;
	};
	chatId: string;
}) => {
	const router = useRouter();
	const onRemoveMember = async () => {
		const { error, message } = await deleteUserFromChat({
			chatId: chatId,
			userId: member.member_id,
		});

		if (error) {
			toast.error(message);
		} else {
			toast.success(`Deleted user ${member.name}`);
			router.refresh();
		}
	};

	return (
		<div
			key={member.member_id}
			className="w-full p-2 flex gap-4 items-center justify-between rounded-md hover:bg-muted/20"
		>
			<div className="flex grow items-center gap-2 wrap-break-word overflow-hidden">
				<Avatar className="h-7 w-7">
					<AvatarImage src={member.image_url || ""} />
					<AvatarFallback>{member.name}</AvatarFallback>
				</Avatar>
				<p className="text-sm w-45 wrap-break-word">{member.name}</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="h-6 w-6">
						<MoreVertical size={16} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-black/70 backdrop-blur-md border-white/20 text-white">
					<DropdownMenuItem
						onClick={() => onRemoveMember()}
						className="cursor-pointer text-red-400 focus:text-red-400"
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Xóa khỏi nhóm
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default ChatMember;
