import Task from "../models/task-model.js";

const getUserTaskService = async (req) => {
	try {
		const userId = req.userId;
		const tasks = await Task.find({ userId: userId });
		return {
			success: true,
			data: tasks,
		};
	} catch (err) {
		throw err;
	}
};
const createTaskService = async (req) => {
	try {
		const userId = req.userId;
		const newTask = new Task({
			...req.body,
			userId,
		});
		await newTask.save();
		return {
			success: true,
			data: newTask,
		};
	} catch (err) {
		throw err;
	}
};
const updateTaskService = async (req) => {
	try {
		const userId = req.userId;
		const taskUpdate = await Task.updateOne(
			{
				userId: userId,
				_id: req.body._id,
			},
			{ ...req.body }
		);
		console.log(taskUpdate);
		return {
			success: true,
			data: taskUpdate,
		};
	} catch (err) {
		throw err;
	}
};
const deleteTaskService = async (req) => {
	try {
		const { _id } = req.body;
		const userId = req.userId;
		const deleteTask = await Task.deleteOne({ _id: _id, userId: userId });
		console.log(deleteTask);
		return {
			success: true,
			data: null,
		};
	} catch (err) {
		throw err;
	}
};

export default {
	getUserTaskService,
	createTaskService,
	updateTaskService,
	deleteTaskService,
};
