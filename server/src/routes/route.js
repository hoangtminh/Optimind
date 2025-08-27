import { Router } from "express";
import authRouter from "./auth-router.js";

const router = Router();

const apiRouter = () => {
	authRouter(router);

	return router;
};

export default apiRouter;
