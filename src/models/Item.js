import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
	title: String,
	description: String,
	createdAt: Date,
	hashtags: [{ type: String}],
});

const Item = mongoose.model("Item", itemSchema);
export default Item;