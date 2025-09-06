import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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
			type: String,
			require: true,
		},
		target: {
			type: String,
			require: true,
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

const Task = mongoose.model("Task", taskSchema);

export default Task;
