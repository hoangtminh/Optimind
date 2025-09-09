import authenticated from "../middlewares/authenticated.js";
import studyProgressValidator from "../validators/study-progress-validator.js";
import studyProgressController from "../controllers/study-progress-controller.js";

const studyProgressRouter = (router) => {
	router.use("/api/study-progress", authenticated);

	router
		.route("/api/study-progress")
		.get(studyProgressController.getUserStudyProgress)
		.post(
			studyProgressValidator.createStudyProgressValidate,
			studyProgressController.createStudyProgress
		)
		.put(
			studyProgressValidator.updateStudyProgressValidate,
			studyProgressController.updateStudyProgress
		)
		.delete(studyProgressController.deleteStudyProgress);
};

export default studyProgressRouter;
