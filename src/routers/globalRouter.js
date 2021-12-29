import express from "express";

const globalRouter = express.Router();
const handleHome = (req, res) => res.render("home");

globalRouter.get("/", handleHome);

export default globalRouter;