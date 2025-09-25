import express, { json, Router, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/route.js";
import verifyToken from "./middlewares/verifyToken.js";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_ORIGIN,
	})
);
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use("/", (req, res, next) => {
	console.log(req);
	next();
});
app.use("/", apiRouter());

app.use("/api", verifyToken, (req, res) => {
	res.json({ message: "You are authorized", user: req.user });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.log(err));
