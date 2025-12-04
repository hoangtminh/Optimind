import { FormEvent, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupTextarea,
} from "../ui/input-group";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { sendMessage } from "@/supabase/actions/chat";
import { Button } from "../ui/button";
import { Message } from "@/supabase/schemas/chat-schema";

type Props = {
	chatId: string;
	onSend: (message: { id: string; text: string }) => void;
	onSuccessfulSend: (message: Message) => void;
	onErrorSend: (id: string) => void;
};

const ChatInput = ({
	chatId,
	onSend,
	onSuccessfulSend,
	onErrorSend,
}: Props) => {
	const [message, setMessage] = useState<string>("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const text = message.trim();
		if (!text) return;
		setMessage("");

		const id = crypto.randomUUID();
		onSend({ id: id, text: message });

		const result = await sendMessage({ id, text, chatId });
		if (result.error) {
			toast.error(result.message as string);
			onErrorSend(id);
		} else {
			onSuccessfulSend(result.message as Message);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
			<div className="flex gap-2 overflow-hidden">
				<InputGroup className="rounded-xl wrap-break-word">
					<InputGroupTextarea
						className={cn("field-sizing-content px-3 min-h-auto")}
						placeholder="Nhập tin nhắn..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSubmit(e);
							}
						}}
					/>
					<InputGroupAddon align={"inline-end"}>
						<Button
							type="submit"
							aria-label="Send"
							title="Send"
							className="h-8 w-8 p-0 rounded-full bg-blue-600 hover:bg-blue-700"
						>
							<Send className="w-10 h-10 text-white" />
						</Button>
					</InputGroupAddon>
				</InputGroup>
			</div>
		</form>
	);
};

export default ChatInput;
