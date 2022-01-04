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
	secret: process.env.COOKIE_SECRET,
	resave: true,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/item", itemRouter);

export default app;
