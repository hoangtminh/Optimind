import { StatusCodes } from "http-status-codes";
import subjectService from "../services/subject-service.js";
import { handleApiError } from "../utils/api-error.js";

const getUserSubject = async (req, res, next) => {
	try {
		const response = await subjectService.getUserSubjectService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

const createSubject = async (req, res, next) => {
	try {
		const response = await subjectService.createSubjectService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

const updateSubject = async (req, res, next) => {
	try {
		const response = await subjectService.updateSubjectService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

const deleteSubject = async (req, res, next) => {
	try {
		const response = await subjectService.deleteSubjectService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: null,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

export default {
	getUserSubject,
	createSubject,
	updateSubject,
	deleteSubject,
};
