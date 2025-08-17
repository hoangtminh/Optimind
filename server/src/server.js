import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api-router";

const router = Router();

const app = express();

// Middleware
app.use(
	cors({
		credentials: true,
		origin: `http://${process.env.APP_HOST}:${process.env.APP_PORT}}`,
		cross,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter(router));

app.use("/api", verifyToken, (req, res) => {
	res.json({ message: "You are authorized", user: req.user });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
