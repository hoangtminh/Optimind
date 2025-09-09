import { handleApiError } from "../utils/api-error.js";
import { StatusCodes } from "http-status-codes";
import studyProgressService from "../services/study-progress-service.js";

const getUserStudyProgress = async (req, res, next) => {
	try {
		const response = await studyProgressService.getUserStudyProgressService(
			req
		);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};
const createStudyProgress = async (req, res, next) => {
	try {
		console.log("Creating: ", req.body);
		const response = await studyProgressService.createStudyProgressService(
			req
		);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};
const updateStudyProgress = async (req, res, next) => {
	try {
		const response = await studyProgressService.updateStudyProgressService(
			req
		);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};
const deleteStudyProgress = async (req, res, next) => {
	try {
		const response = await studyProgressService.deleteStudyProgressService(
			req
		);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	getUserStudyProgress,
	createStudyProgress,
	updateStudyProgress,
	deleteStudyProgress,
};
