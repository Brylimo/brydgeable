import express from "express";
import { handleItem } from "../controllers/itemController";

const itemRouter = express.Router();

itemRouter.get("/:id", handleItem);

export default itemRouter;