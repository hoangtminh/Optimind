import { cn } from "@/lib/utils";
import { Message } from "@/supabase/schemas/chat-schema";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import React, { Ref } from "react";

const ChatMessage = ({
	text,
	author_id,
	author,
	created_at,
	status,
	ref,
	prev,
	next,
}: Message & {
	status?: "pending" | "error" | "success";
	ref: Ref<HTMLDivElement>;
	prev?: Message;
	next?: Message;
}) => {
	const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	});

	const showAuthor =
		author_id !== prev?.author_id ||
		prev == null ||
		author_id !== next?.author_id;
	const dateDiffPrev = prev
		? new Date(prev?.created_at).getTime() -
				new Date(created_at).getTime() >
		  1000 * 60 * 5
		: true;
	const dateDiffNext = next
		? new Date(created_at).getTime() -
				new Date(next?.created_at).getTime() >
		  1000 * 60 * 5
		: true;
	return (
		<div
			ref={ref}
			className={cn(
				"flex gap-4 px-4 py-2 hover:bg-accent/50 text-white",
				status === "pending" && "opacity-70",
				status === "error" && "bg-destructive/20 text-destructive"
			)}
		>
			<div className="grid grid-cols-[auto_auto] gap-3 overflow-hidden">
				{showAuthor || dateDiffPrev ? (
					<div className="flex items-end">
						{author.image_url != null ? (
							<Image
								src={author.image_url}
								alt={author.name}
								width={40}
								height={40}
								className="rounded-full"
							/>
						) : (
							<div className="w-10 h-10 rounded-full flex items-center justify-center border bg-muted text-muted-foreground overflow-hidden">
								<User2Icon className="size-6 mt-2" />
							</div>
						)}
					</div>
				) : (
					<div className="w-10 h-10"></div>
				)}
				<div className="flex flex-col justify-center overflow-hidden wrap-break-word">
					<div className="flex items-baseline gap-2">
						{
							// showAuthor ||
							dateDiffNext && (
								<>
									<span className="text-sm font-semibold">
										{author.name}
									</span>
									<span className="text-xs text-muted/60">
										{DATE_FORMATTER.format(
											new Date(created_at)
										)}
									</span>
								</>
							)
						}
					</div>
					<div className="h-fit max-w-full w-fit text-sm leading-relaxed whitespace-pre-wrap wrap-break-word bg-black/30 px-3 py-1 rounded-md">
						{text.toString()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
