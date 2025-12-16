import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

// create app with express
const app = express();

// middleware
app.use(express.json()); // to allow json
app.use(cors({ origin: [], credentials: true })); // allow frontend url
app.use(cookieParser()); // allow cookies

app.use("/api/auth", authRouter);

export default app;
