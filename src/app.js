import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";

const PORT = 8000;

const app = express();

app.use(logger("dev"));
app.use("/", globalRouter);

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
