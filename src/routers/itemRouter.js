import express from "express";
import { watch, getUpload, postUpload, getUpdate, postUpdate, handleDelete } from "../controllers/itemController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const itemRouter = express.Router();

itemRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.fields([{name:"video", maxCount:1},{name:"thumb", maxCount:1}]), postUpload);
itemRouter.get("/:id([0-9a-f]{24})", watch);
itemRouter.route("/:id/update").all(protectorMiddleware).get(getUpdate).post(postUpdate);
itemRouter.get("/:id/delete", protectorMiddleware, handleDelete);

export default itemRouter;