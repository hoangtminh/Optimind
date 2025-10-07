import { Router } from "express";
import authRouter from "./auth-router.js";
import tagRouter from "./tag-route.js";
import taskRouter from "./task-router.js";
import studyProgressRouter from "./study-progress-router.js";
import studySessionRouter from "./study-session-route.js";

const router = Router();

const apiRouter = () => {
	authRouter(router);
	tagRouter(router);
	taskRouter(router);
	studyProgressRouter(router);
	studySessionRouter(router);

	return router;
};

export default apiRouter;
