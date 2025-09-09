import StudySession from "../models/study-session-model.js";

const getAllStudySessions = async (req) => {
	try {
		const { userId } = req.userId;
		const studySessions = await StudySession.find({ userId: userId });
		return {
			success: true,
			data: studySessions,
		};
	} catch (err) {
		throw err;
	}
};

const createStudySessionService = async (req) => {
	try {
		const { userId } = req.userId;
		const newStudySession = new StudySession({
			userId: userId,
			name: req.body.name,
			description: req.body.description,
			method: req.body.method,
			studyTime: req.body.studyTime,
			breakTime: req.body.breakTime,
			cycles: req.body.cycles,
			subjects: req.body.subjects,
			tags: req.body.tags,
			tasks: req.body.tasks,
			studyProgress: req.body.studyProgress,
			currentCycle: req.body.currentCycle,
			totalTime: req.body.totalTime,
		});
		await newStudySession.save();
		return {
			success: true,
			data: newStudySession,
		};
	} catch (err) {
		throw err;
	}
};

export default {
	getAllStudySessions,
	createStudySessionService,
};
