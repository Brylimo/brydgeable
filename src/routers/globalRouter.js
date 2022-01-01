import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { handleHome } from "../controllers/globalController";
import { getSearch } from "../controllers/itemController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search", getSearch);

export default globalRouter;