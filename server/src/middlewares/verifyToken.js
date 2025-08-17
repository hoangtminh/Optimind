import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	try {
		const access_token = req.cookies.access_token;

		if (!access_token) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: "No token found" });
		}

		const verified = jwt.verify(
			access_token,
			process.env.ACCESS_TOKEN_SECRET
		);
		if (!verified) {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: "Invalid token" });
		}

		req.user = verified;
		next();
	} catch (err) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "Verify token failed" });
	}
};
