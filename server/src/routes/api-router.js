import authRouter from "./auth-router";

const apiRouter = (router) => {
	authRouter(router);
};

export default apiRouter;
