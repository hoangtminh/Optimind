import { StatusCodes } from "http-status-codes";
import authService from "../services/auth-service.js";
import { handleApiError } from "../utils/api-error.js";

const loginUser = async (req, res, next) => {
	try {
		const response = await authService.loginService(req);
		res.cookie("access_token", response.data.access_token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
			maxAge: 15 * 60 * 1000,
		});

		if (req.body.remember) {
			res.cookie("refresh_token", response.data.refresh_token, {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				maxAge: 1000 * 60 * 60 * 24 * 7,
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data.user,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

const registerUser = async (req, res, next) => {
	try {
		const response = await authService.registerService(req);
		return res.status(StatusCodes.CREATED).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

const logoutUser = async (req, res) => {
	try {
		const response = await authService.logoutService(req);
		res.clearCookie("access_token");
		res.clearCookie("refresh_token");

		return res.status(StatusCodes.OK).json({
			success: true,
			data: null,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

const getSession = async (req, res) => {
	try {
		const response = await authService.getSession(req);
		if (response.success) {
			return res.status(StatusCodes.OK).json({
				success: true,
				data: response.data,
			});
		}
	} catch (err) {
		handleApiError(err, res);
	}
};

const refreshSession = async (req, res) => {
	try {
		const response = await authService.refreshSession(req);
		if (response.success)
			res.cookie("access_token", response.data.access_token, {
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				maxAge: 1000 * 60 * 60 * 24 * 7,
			});
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	loginUser,
	registerUser,
	logoutUser,
	getSession,
	refreshSession,
};
