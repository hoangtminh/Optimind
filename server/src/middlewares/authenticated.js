import { StatusCodes } from "http-status-codes";
import { ApiError, handleApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";

const authenticated = (req, res, next) => {
	try {
		const access_token = req.cookies?.access_token;
		if (!access_token) {
			throw new ApiError(StatusCodes.UNAUTHORIZED, "Please log in");
		}

		const payload = jwt.verify(
			access_token,
			process.env.ACCESS_TOKEN_SECRET
		);
		req.userId = payload._id;
		next();
	} catch (err) {
		handleApiError(err, res);
	}
};

export default authenticated;
