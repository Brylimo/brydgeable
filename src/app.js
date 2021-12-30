import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import itemRouter from "./routers/itemRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);

export default app;
