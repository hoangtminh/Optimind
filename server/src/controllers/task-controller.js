import taskService from "../services/task-service.js";
import { handleApiError } from "../utils/api-error.js";
import { StatusCodes } from "http-status-codes";

const getUserTask = async (req, res, next) => {
	try {
		const response = await taskService.getUserTaskService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};
const createTask = async (req, res, next) => {
	try {
		const response = await taskService.createTaskService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};
const updateTask = async (req, res, next) => {
	try {
		const response = await taskService.updateTaskService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};
const deleteTask = async (req, res, next) => {
	try {
		const response = await taskService.deleteTaskService(req);
		return res.status(StatusCodes.OK).json({
			success: true,
			data: response.data,
		});
	} catch (err) {
		handleApiError(err, res);
	}
};

export default {
	getUserTask,
	createTask,
	updateTask,
	deleteTask,
};
