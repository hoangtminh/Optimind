import studySessionController from "../controllers/study-session-controller.js";
import authenticated from "../middlewares/authenticated.js";

const studySessionRouter = (router) => {
	router.use("/api/study-session", authenticated);

	router
		.route("/api/study-session")
		.get(studySessionController.getAllStudySessions)
		.post(studySessionController.createStudySession);
};

export default studySessionRouter;
