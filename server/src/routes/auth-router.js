import authController from "../controllers/auth-controller.js";
import authValidator from "../validators/auth-validator.js";

const authRouter = (router) => {
	router
		.route("/auth/login")
		.post(authValidator.loginValidate, authController.loginUser);
	router
		.route("/auth/register")
		.post(authValidator.registerValidate, authController.registerUser);

	router.route("/auth/logout").post(authController.logoutUser);

	router.get("/auth/getSession", authController.getSession);
	router.post("/auth/refreshSession", authController.refreshSession);
};

export default authRouter;
