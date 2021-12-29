import express from "express";
import { handleUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", handleUser);

export default userRouter;