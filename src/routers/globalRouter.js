import express from "express";
import { handleJoin, handleLogin } from "../controllers/userController";
import { handleHome } from "../controllers/globalController";
import { getSearch } from "../controllers/itemController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/join", handleJoin);
globalRouter.get("/login", handleLogin);
globalRouter.get("/search", getSearch);

export default globalRouter;