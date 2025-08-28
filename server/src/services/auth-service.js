import { sanitizeUser } from "../utils/sanitize-user.js";
import { ApiError } from "../utils/api-error.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const registerService = async (req) => {
	try {
		const { email, password, username } = req.body;

		const existUser = await User.findOne({
			email: email.toLowerCase().trim(),
		});
		if (existUser) {
			throw new ApiError(StatusCodes.CONFLICT, "Email already existed");
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = User({
			email: email,
			password: hashPassword,
			username: username,
		});

		const newUser = await user.save();
		return {
			success: true,
			data: { user: newUser },
		};
	} catch (err) {
		throw err;
	}
};

const loginService = async (req) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			throw new ApiError(StatusCodes.NOT_FOUND, "Email doesn't exist");
		}
		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) {
			throw new ApiError(StatusCodes.BAD_REQUEST, "Wrong password");
		}

		const access_token = jwt.sign(
			{ _id: user._id, email: user.email },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: 15 * 60 }
		);

		const refresh_token = jwt.sign(
			{
				_id: user._id,
				email: user.email,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: 60 * 60 * 24,
			}
		);

		return {
			success: true,
			data: {
				user: sanitizeUser(user),
				access_token: access_token,
				refresh_token: refresh_token,
			},
		};
	} catch (err) {
		throw err;
	}
};

const logoutService = async (req) => {
	try {
		const access_token = req.cookies?.access_token;
		if (!access_token) {
			throw new ApiError(StatusCodes.UNAUTHORIZED, "Not login yet");
		}
		return {
			success: true,
			data: null,
		};
	} catch (err) {
		throw err;
	}
};

const getSession = async (req) => {
	try {
		const access_token = req.cookies?.access_token;
		if (!access_token) {
			throw new ApiError(StatusCodes.UNAUTHORIZED, "Not login yet");
		}

		const verified = jwt.verify(
			access_token,
			process.env.ACCESS_TOKEN_SECRET
		);
		if (!verified) {
			throw new ApiError(
				StatusCodes.BAD_REQUEST,
				"Access token not verified"
			);
		}
		const user = await User.findOne({ email: verified.email });
		return {
			success: true,
			data: sanitizeUser(user),
		};
	} catch (err) {
		throw err;
	}
};

const refreshSession = async (req) => {
	try {
		const refresh_token = req.cookies?.refresh_token;
		if (!refresh_token) {
			throw new ApiError(StatusCodes.UNAUTHORIZED, "Login to continue");
		}

		const verified = jwt.verify(
			refresh_token,
			process.env.REFRESH_TOKEN_SECRET
		);
		if (!verified) {
			throw new ApiError(
				StatusCodes.BAD_GATEWAY,
				"Refresh token not verified"
			);
		}
		const { _id, email } = verified;
		const access_token = jwt.sign(
			{ _id: _id, email: email },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: 15 * 60,
			}
		);
		return {
			success: true,
			data: {
				access_token: access_token,
			},
		};
	} catch (err) {
		throw err;
	}
};

export default {
	loginService,
	registerService,
	logoutService,
	getSession,
	refreshSession,
};
