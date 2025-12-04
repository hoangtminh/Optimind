import z from "zod";

export const createChatSchema = z.object({
	name: z.string().min(1).trim(),
	isPublic: z.boolean(),
});

export type Message = {
	id: string;
	text: string;
	created_at: string;
	author_id: string;
	author: {
		name: string;
		image_url: string | null;
	};
};
