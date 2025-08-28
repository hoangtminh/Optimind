import tagController from "../controllers/tag-controller.js";
import authenticated from "../middlewares/authenticated.js";
import tagValidator from "../validators/tag-validator.js";

const tagRouter = (router) => {
	router.use("/api/tag", authenticated);
	router
		.route("/api/tag")
		.get(tagController.getUserTag)
		.post(tagValidator.createTagValidate, tagController.createTag)
		.put(tagController.updateTag)
		.delete(tagController.deleteTag);
};

export default tagRouter;
