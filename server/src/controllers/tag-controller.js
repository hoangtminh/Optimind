import { StatusCodes } from "http-status-codes";
import tagService from "../services/tag-service.js";
import { handleApiError } from "../utils/api-error.js";

const getUserTag = async (req, res, next) => {
	try {
		const response = await tagService.getUserTagService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

const createTag = async (req, res, next) => {
	try {
		const response = await tagService.createTagService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

const updateTag = async (req, res, next) => {
	try {
		const response = await tagService.updateTagService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

const deleteTag = async (req, res, next) => {
	try {
		const response = await tagService.deleteTagService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: null,
		});
	} catch (error) {
		handleApiError(error, res);
	}
};

export default {
	getUserTag,
	createTag,
	updateTag,
	deleteTag,
};
