import z from "zod";

export const createStudySessionSchema = z.object({
	start_time: z.iso.datetime(),
	end_time: z.iso.datetime(),
	total_time: z.number(),
	focus_time: z.number(),
	break_time: z.number(),
	cycles: z.number(),
	average_focus: z.number(),
	session_type: z.string(),
});
