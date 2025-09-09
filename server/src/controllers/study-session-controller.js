import { StatusCodes } from "http-status-codes";
import studySessionService from "../services/study-session-service.js";
import { handleApiError } from "../utils/api-error.js";

const getAllStudySessions = async (req, res, next) => {
	try {
		const response = await studySessionService.getAllStudySessions(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

const createStudySession = async (req, res, next) => {
	try {
		const response = await studySessionService.createStudySessionService(
			req
		);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

export default {
	getAllStudySessions,
	createStudySession,
};
