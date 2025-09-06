import z from "zod";
import { handleApiError } from "../utils/api-error.js";
import { validate } from "../utils/validators.js";

const createTaskValidate = (req, res, next) => {
	try {
		const schema = z.object({
			title: z.string().min(3).max(60).nonempty(),
			description: z.string().max(100),
			subject: z.string().array(),
			frequencyType: z.string().nonempty(),
			frequency: z.string().array(),
			deadline: z.string(),
			target: z.string().nonempty(),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};
const updateTaskValidate = (req, res, next) => {
	try {
		const schema = z.object({
			title: z.string().min(3).max(60).nonempty(),
			description: z.string().max(100),
			subject: z.string().array(),
			frequencyType: z.string().nonempty(),
			frequency: z.string().array(),
			deadline: z.string(),
			target: z.string().nonempty(),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	createTaskValidate,
	updateTaskValidate,
};
