import express from "express";
import logger from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import itemRouter from "./routers/itemRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/brydgeable' })
}));
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/item", itemRouter);

export default app;
