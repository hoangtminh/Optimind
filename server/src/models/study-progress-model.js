import mongoose from "mongoose";

const studyProgressSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			require: true,
		},
		title: {
			type: String,
			require: true,
			min: 3,
			max: 20,
		},
		description: {
			type: String,
			max: 60,
		},
		subject: {
			type: [String],
			require: false,
			default: null,
		},
		frequencyType: {
			type: String,
			enum: ["repeat", "one-time"],
			require: true,
		},
		frequency: {
			type: [String],
			require: false,
		},
		deadline: {
			type: Date,
			require: true,
		},
		target: {
			type: Number,
			require: true,
		},
		progress: {
			type: Number,
			default: 0,
		},
		complete: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const StudyProgress = mongoose.model("Study-Progress", studyProgressSchema);

export default StudyProgress;
