import express from "express";
import { handleItem, getUpload, postUpload, getUpdate, postUpdate, handleDelete } from "../controllers/itemController";
import { protectorMiddleware } from "../middlewares";

const itemRouter = express.Router();

itemRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);
itemRouter.get("/:id", handleItem);
itemRouter.route("/:id/update").all(protectorMiddleware).get(getUpdate).post(postUpdate);
itemRouter.get("/:id/delete", protectorMiddleware, handleDelete);

export default itemRouter;