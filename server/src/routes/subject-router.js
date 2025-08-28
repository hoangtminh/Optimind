import subjectController from "../controllers/subject-controller.js";
import authenticated from "../middlewares/authenticated.js";
import subjectValidator from "../validators/subject-validator.js";

const subjectRouter = (router) => {
	router.use("/api/subject", authenticated);
	router
		.route("/api/subject")
		.get(subjectController.getUserSubject)
		.post(
			subjectValidator.createSubjectValidate,
			subjectController.createSubject
		)
		.put(
			subjectValidator.updateSubjectValidate,
			subjectController.updateSubject
		)
		.delete(subjectController.deleteSubject);
};

export default subjectRouter;
