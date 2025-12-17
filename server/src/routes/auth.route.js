import Router from "express";
const authRouter = Router();
import { register, verifyOtp } from "../controllers/auth.controller.js";

authRouter.route("/register").post(register);
authRouter.route("/otp/verify").post(verifyOtp);

export default authRouter;
