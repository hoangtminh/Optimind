import StudyProgress from "../models/study-progress-model.js";

const getUserStudyProgressService = async (req) => {
	try {
		const userId = req.userId;
		const StudyProgresses = await StudyProgress.find({ userId: userId });
		return {
			success: true,
			data: StudyProgresses,
		};
	} catch (err) {
		throw err;
	}
};
const createStudyProgressService = async (req) => {
	try {
		const userId = req.userId;
		const newStudyProgress = new StudyProgress({
			...req.body,
			userId,
		});
		await newStudyProgress.save();
		return {
			success: true,
			data: newStudyProgress,
		};
	} catch (err) {
		throw err;
	}
};
const updateStudyProgressService = async (req) => {
	try {
		const userId = req.userId;
		const StudyProgressUpdate = await StudyProgress.updateOne(
			{
				userId: userId,
				_id: req.body._id,
			},
			{ ...req.body }
		);
		return {
			success: true,
			data: StudyProgressUpdate,
		};
	} catch (err) {
		throw err;
	}
};
const deleteStudyProgressService = async (req) => {
	try {
		const { _id } = req.body;
		const userId = req.userId;
		const deleteStudyProgress = await StudyProgress.deleteOne({
			_id: _id,
			userId: userId,
		});
		return {
			success: true,
			data: null,
		};
	} catch (err) {
		throw err;
	}
};

export default {
	getUserStudyProgressService,
	createStudyProgressService,
	updateStudyProgressService,
	deleteStudyProgressService,
};
