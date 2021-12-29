import express from "express";
import { handleUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", handleUser);

export default userRouter;