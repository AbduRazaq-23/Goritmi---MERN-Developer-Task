import Router from "express";
const authRouter = Router();
import {
  logIn,
  logOut,
  register,
  resendEmailOtp,
  verifyOtp,
} from "../controllers/auth.controller.js";
import resendOtpLimiter from "../middlewares/rateLimit.middleware.js";

authRouter.route("/register").post(register);
authRouter.route("/otp/verify").post(verifyOtp);
authRouter.route("/otp/resend").post(resendOtpLimiter, resendEmailOtp);
authRouter.route("/login").post(resendOtpLimiter, logIn);
authRouter.route("/logout").post(logOut);

export default authRouter;
