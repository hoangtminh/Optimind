import z from "zod";
import { handleApiError } from "../utils/api-error.js";
import { validate } from "../utils/validators.js";

const createStudyProgressValidate = (req, res, next) => {
	try {
		const schema = z.object({
			title: z.string().min(3).max(60).nonempty(),
			description: z.string().max(100),
			frequencyType: z.string().nonempty(),
			frequency: z.string().array(),
			deadline: z.string(),
			target: z.number(),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};
const updateStudyProgressValidate = (req, res, next) => {
	try {
		const schema = z.object({
			title: z.string().min(3).max(60).nonempty(),
			description: z.string().max(100),
			frequencyType: z.string().nonempty(),
			frequency: z.string().array(),
			deadline: z.string(),
			target: z.number(),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	createStudyProgressValidate,
	updateStudyProgressValidate,
};
