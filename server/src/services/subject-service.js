import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-error.js";
import { Subject } from "../models/tag-and-subject-model.js";

const getUserSubjectService = async (req) => {
	try {
		const userId = req.userId;
		const subjects = await Subject.find({ userId: userId });

		return {
			success: true,
			data: subjects,
		};
	} catch (error) {
		throw new ApiError(StatusCodes.BAD_GATEWAY, "Cannot get user subject");
	}
};
const createSubjectService = async (req) => {
	try {
		const userId = req.userId;
		const { name, color } = req.body;
		const existSubject = await Subject.find({
			userId: userId,
			name: name.trim(),
		});
		if (existSubject.length != 0) {
			throw new ApiError(StatusCodes.CONFLICT, "Subject name existed");
		}

		const newSubject = new Subject({
			userId: userId,
			name: name.trim(),
			color: color.toLowerCase().trim(),
		});
		await newSubject.save();
		return {
			success: true,
			data: newSubject,
		};
	} catch (error) {
		throw error;
	}
};

const updateSubjectService = async (req) => {
	try {
		const { _id, name, color } = req.body;

		const subject = await Subject.updateOne(
			{ _id: _id, userId: req.userId },
			{ name: name.trim(), color: color.toLowerCase().trim() }
		);

		return {
			success: true,
			data: subject,
		};
	} catch (error) {
		throw error;
	}
};
const deleteSubjectService = async (req) => {
	try {
		const { _id } = req.body;
		await Subject.deleteOne({ _id: _id, userId: req.userId });

		return {
			success: true,
			data: null,
		};
	} catch (error) {
		throw error;
	}
};

export default {
	getUserSubjectService,
	createSubjectService,
	updateSubjectService,
	deleteSubjectService,
};
