const authRouter = (router) => {
	router.get("/auth", (req, res) => {
		res.json({ message: "Auth route" });
	});
};

export default authRouter;
