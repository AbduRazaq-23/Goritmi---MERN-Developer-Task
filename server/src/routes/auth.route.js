import Router from "express";
const authRouter = Router();
import {
  register,
  resendEmailOtp,
  verifyOtp,
} from "../controllers/auth.controller.js";
import resendOtpLimiter from "../middlewares/rateLimit.js";

authRouter.route("/register").post(register);
authRouter.route("/otp/verify").post(verifyOtp);
authRouter.route("/otp/resend").post(resendOtpLimiter, resendEmailOtp);

export default authRouter;
