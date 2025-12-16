import Router from "express";
const authRouter = Router();
import { register } from "../controllers/auth.controller.js";

authRouter.route("/register").post(register);

export default authRouter;
