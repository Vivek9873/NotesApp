import express from "express"
import { getOtpLogin, getOtpSignUp, logoutUser, verifyOTPLogin, verifyOTPSignUp } from "../controllers/auth-controller.js";
const authRouter = express.Router();

authRouter.post("/getotpsignup", getOtpSignUp);
authRouter.post("/verifyotpsignup", verifyOTPSignUp);
authRouter.post("/getotplogin", getOtpLogin);
authRouter.post("/verifyotplogin", verifyOTPLogin);
authRouter.get("/logout", logoutUser);

export default authRouter;