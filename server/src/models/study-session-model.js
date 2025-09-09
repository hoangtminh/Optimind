import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
			max: 300,
		},
		method: {
			type: String,
			enum: ["countdown", "pomodoro", "free"],
		},
		studyTime: {
			type: Number,
			min: 1,
		},
		breakTime: {
			type: Number,
			default: 0,
			min: 0,
		},
		cycles: {
			type: Number,
			min: 1,
			default: 1,
		},
		subjects: {
			type: [String],
			default: [],
		},
		tags: {
			type: [String],
			default: [],
		},
		tasks: {
			type: [
				{
					title: String,
					description: String,
					subject: [String],
					target: String,
					deadline: Date,
					complete: Boolean,
				},
			],
			default: [],
		},
		studyProgress: {
			type: [
				{
					title: String,
					description: String,
					subject: [String],
					progress: Number,
					target: Number,
					deadline: Date,
					complete: Boolean,
					activeTime: Number,
				},
			],
			default: [],
		},
		currentCycle: {
			type: Number,
			default: 1,
		},
		totalTime: {
			type: Number,
			required: true,
		},
		finished: {
			type: Boolean,
			default: false,
		},
		focusLevel: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const StudySession = mongoose.model("StudySession", studySessionSchema);

export default StudySession;
