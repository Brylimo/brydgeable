import express from "express";
import { handleHome } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);

export default globalRouter;