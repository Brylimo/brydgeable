import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/brydgeable", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleError = (error) => console.log("Error occurred!!", error);
const handleOpen = () => console.log(`✅ DB opened successfully`);

db.on("error", handleError);
db.once("open", handleOpen);