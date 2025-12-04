import { useState } from "react";
import { Message } from "../schemas/chat-schema";
import { createClient } from "@/utils/supabase/client";

const LIMIT = 25;

export const useInfiniteScrollChat = ({
	startingMessages,
	chatId,
}: {
	startingMessages: Message[];
	chatId: string;
}) => {
	const [messages, setMessages] = useState<Message[]>(startingMessages);
	const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">(
		startingMessages.length === 0 ? "done" : "idle"
	);

	const loadMoreMessage = async () => {
		if (status === "done" || status === "loading") return;
		const supabase = createClient();

		setStatus("loading");
		const { data, error } = await supabase
			.from("messages")
			.select(
				"id, text, created_at, author_id, author:user_profile (name, image_url)"
			)
			.eq("chat_room_id", chatId)
			.lt("created_at", messages[0].created_at)
			.order("created_at", { ascending: false })
			.limit(LIMIT);

		if (error) {
			setStatus("error");
			return;
		}

		setMessages((prev) => [...data.toReversed(), ...prev]);
		setStatus(data.length < LIMIT ? "done" : "idle");
	};

	const triggerQueryRef = (node: HTMLDivElement | null) => {
		if (node == null) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target === node) {
						observer.unobserve(node);
						loadMoreMessage();
					}
				});
			},
			{
				rootMargin: "50px",
			}
		);

		observer.observe(node);

		return () => {
			observer.disconnect();
		};
	};

	return { loadMoreMessage, messages, status, triggerQueryRef };
};
