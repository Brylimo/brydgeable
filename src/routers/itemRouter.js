import express from "express";
import { handleItem, getUpload, postUpload, getUpdate, postUpdate, handleDelete } from "../controllers/itemController";

const itemRouter = express.Router();

itemRouter.route("/upload").get(getUpload).post(postUpload);
itemRouter.get("/:id", handleItem);
itemRouter.route("/:id/update").get(getUpdate).post(postUpdate);
itemRouter.get("/:id/delete", handleDelete);

export default itemRouter;