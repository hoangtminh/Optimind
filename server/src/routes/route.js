import { Router } from "express";
import authRouter from "./auth-router.js";
import tagRouter from "./tag-route.js";
import subjectRouter from "./subject-router.js";
import taskRouter from "./task-router.js";

const router = Router();

const apiRouter = () => {
	authRouter(router);
	tagRouter(router);
	subjectRouter(router);
	taskRouter(router);

	return router;
};

export default apiRouter;
