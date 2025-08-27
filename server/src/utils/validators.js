import { ApiError } from "./api-error.js";
import { StatusCodes } from "http-status-codes";

export const validate = (req, schema, next) => {
	const parsed = schema.safeParse(req.body);
	if (!parsed.success) {
		const errorMessage = parsed.error.issues
			.map((issue) => issue.message)
			.join("; ");
		throw new ApiError(StatusCodes.BAD_REQUEST, errorMessage);
	}
	next();
};
