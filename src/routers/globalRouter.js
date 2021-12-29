import express from "express";
import { handleJoin, handleLogin } from "../controllers/userController";
import { handleHome } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/join", handleJoin);
globalRouter.get("/login", handleLogin);

export default globalRouter;