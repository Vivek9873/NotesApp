
import express from "express"

import authMiddleware from "../middleware/auth-middleware.js";
import { getUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/getuser", authMiddleware, getUser);

export default userRouter;