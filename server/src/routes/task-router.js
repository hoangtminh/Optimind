import taskController from "../controllers/task-controller.js";
import authenticated from "../middlewares/authenticated.js";
import taskValidator from "../validators/task-validator.js";

const taskRouter = (router) => {
	router.use("/api/task", authenticated);

	router
		.route("/api/task")
		.get(taskController.getUserTask)
		.post(taskValidator.createTaskValidate, taskController.createTask)
		.put(taskValidator.updateTaskValidate, taskController.updateTask)
		.delete(taskController.deleteTask);
};

export default taskRouter;
