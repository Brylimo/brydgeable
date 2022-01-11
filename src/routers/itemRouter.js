import express from "express";
import { watch, getUpload, postUpload, getUpdate, postUpdate, handleDelete } from "../controllers/itemController";
import { protectorMiddleware, videoUpload } from "../middlewares";

const itemRouter = express.Router();

itemRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);
itemRouter.get("/:id([0-9a-f]{24})", watch);
itemRouter.route("/:id/update").all(protectorMiddleware).get(getUpdate).post(postUpdate);
itemRouter.get("/:id/delete", protectorMiddleware, handleDelete);

export default itemRouter;