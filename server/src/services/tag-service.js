import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-error.js";
import { Tag } from "../models/tag-model.js";

const getUserTagService = async (req) => {
	try {
		const userId = req.userId;
		const tags = await Tag.find({ userId: userId });

		return {
			success: true,
			data: tags,
		};
	} catch (error) {
		throw new ApiError(StatusCodes.BAD_GATEWAY, "Cannot get user tag");
	}
};
const createTagService = async (req) => {
	try {
		const userId = req.userId;
		const { name, color } = req.body;
		const existTag = await Tag.find({
			userId: userId,
			name: name.trim(),
		});
		if (existTag.length != 0) {
			throw new ApiError(StatusCodes.CONFLICT, "Tag name existed");
		}

		const newTag = new Tag({
			userId: userId,
			name: name.trim(),
			color: color.toLowerCase().trim(),
		});
		await newTag.save();
		return {
			success: true,
			data: newTag,
		};
	} catch (error) {
		throw error;
	}
};

const updateTagService = async (req) => {
	try {
		const { _id, name, color } = req.body;

		const tag = await Tag.updateOne(
			{ _id: _id, userId: req.userId },
			{ name: name, color: color.toLowerCase().trim() }
		);

		return {
			success: true,
			data: tag,
		};
	} catch (error) {
		throw error;
	}
};
const deleteTagService = async (req) => {
	try {
		const { _id } = req.body;
		await Tag.deleteOne({ _id: _id, userId: req.userId });

		return {
			success: true,
			data: null,
		};
	} catch (error) {
		throw error;
	}
};

export default {
	getUserTagService,
	createTagService,
	updateTagService,
	deleteTagService,
};
