import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
			min: 6,
			max: 20,
		},
		username: {
			type: String,
			require: true,
			min: 2,
			max: 30,
		},
		timeStudied: {
			type: Number,
			default: 0,
		},
		points: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
