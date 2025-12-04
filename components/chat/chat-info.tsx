// Tên file: app/components/chat/ChatInfoPanel.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { X, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import InviteUserModal from "./invite-user-modal";
import LeaveChat from "./leave-chat";
import ChatMember from "./chat-member";

interface ChatInfoPanelProps {
	chat: { id: string; name: string };
	onClose: () => void;
	members: {
		member_id: string;
		name: string;
		image_url: string | null;
	}[];
}

// --- Component Info Panel ---
const ChatInfoPanel = ({ chat, onClose, members }: ChatInfoPanelProps) => {
	return (
		// THAY ĐỔI: Áp dụng className, xóa logic flex
		<div
			className={cn(
				"flex flex-col w-73 h-full border-l",
				"animate-in slide-in-from-right-30 duration-700" // Giữ hiệu ứng
			)}
		>
			{/* Header */}
			<div className="w-full px-4 py-2 flex justify-between items-center border-b border-muted/60">
				<h3 className="text-xl font-bold">Thông tin</h3>
				<Button
					variant="ghost"
					size="icon"
					className="text-white/70 hover:text-white hover:bg-white/20"
					onClick={onClose}
				>
					<X size={20} />
				</Button>
			</div>

			{/* Bọc nội dung trong ScrollArea */}
			<div className="flex flex-col px-2 overflow-hidden">
				{/* Thông tin cơ bản */}
				<div className="flex flex-col items-center text-center py-4">
					{/* <Avatar className="h-24 w-24 mb-4">
							<AvatarImage src={chat.avatar} />
							<AvatarFallback className="text-4xl">
								{chat.name[0]}
							</AvatarFallback>
						</Avatar> */}

					<div>
						<div className="text-2xl font-bold">{chat.name}</div>
						<p className="text-muted/80 text-sm">
							{/* TODO: get member */}
							{members.length}{" "}
							{members.length == 1 ? "member" : "members"}
						</p>
					</div>
				</div>

				{/* Cài đặt thông báo */}

				{/* Đổi tên */}

				<Separator className="bg-white/20 my-2" />

				{/* Danh sách thành viên */}
				<div className="flex flex-col gap-2 mt-2">
					<div className="flex justify-between items-center">
						<h4 className="font-semibold">Thành viên</h4>
						{/* Thêm Dialog cho nút Thêm Thành viên */}
						<InviteUserModal chatId={chat.id} />
					</div>

					{/* ScrollArea cho Thành viên */}
					<div className="h-40 w-full overflow-hidden space-y-3">
						{members.map((member) => (
							<ChatMember member={member} chatId={chat.id} />
						))}
					</div>
				</div>
			</div>

			{/* Nút rời nhóm / Hủy bạn (Ngoài ScrollArea) */}
			<div className="p-2 mt-auto border-t border-white/20">
				<LeaveChat
					chatId={chat.id}
					classname={
						"w-full text-center py-1.5 bg-red-700 rounded-md text-white font-medium"
					}
				/>
			</div>
		</div>
	);
};

export default ChatInfoPanel;
