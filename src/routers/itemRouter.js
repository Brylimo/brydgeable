import express from "express";
import { handleItem, getUpload, postUpload } from "../controllers/itemController";

const itemRouter = express.Router();

itemRouter.route("/upload").get(getUpload).post(postUpload);
itemRouter.get("/:id", handleItem);

export default itemRouter;