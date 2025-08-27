import { z } from "zod";
import { validate } from "../utils/validators.js";
import { handleApiError } from "../utils/api-error.js";

const registerValidate = (req, res, next) => {
	try {
		const schema = z.object({
			email: z.email(),
			password: z.string().min(6).max(20),
			username: z.string().min(3).max(30),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};

const loginValidate = (req, res, next) => {
	try {
		const schema = z.object({
			email: z.email(),
			password: z.string().min(6).max(20),
			remember: z.boolean(),
		});

		validate(req, schema, next);
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	registerValidate,
	loginValidate,
};
