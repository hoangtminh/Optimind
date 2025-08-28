import mongoose from "mongoose";

const baseSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			require: true,
		},
		name: {
			type: String,
			require: true,
		},
		color: {
			type: String,
			default: "#228B22",
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export const Subject = mongoose.model("Subject", baseSchema);
export const Tag = mongoose.model("Tag", baseSchema);
