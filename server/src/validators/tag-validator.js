import z from "zod";
import { handleApiError } from "../utils/api-error.js";
import { validate } from "../utils/validators.js";

const createTagValidate = (req, res, next) => {
	try {
		const schema = z.object({
			name: z.string().min(2).max(20),
			color: z.string().min(2).max(20),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};
const updateTagValidate = (req, res, next) => {
	try {
		const schema = z.object({
			name: z.string().min(2).max(20),
			color: z.string().min(2).max(20),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	createTagValidate,
	updateTagValidate,
};
