import express from "express";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controllers/userController";
import { handleHome } from "../controllers/globalController";
import { getSearch } from "../controllers/itemController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
globalRouter.get("/logout", protectorMiddleware, logout);
globalRouter.get("/search", getSearch);

export default globalRouter;