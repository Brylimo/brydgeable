import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleError = (error) => console.log("Error occurred!!", error);
const handleOpen = () => console.log(`✅ DB opened successfully`);

db.on("error", handleError);
db.once("open", handleOpen);