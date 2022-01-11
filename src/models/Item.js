import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
	title: {type: String, required: true},
	fileUrl: {type: String, required: true},
	description: {type: String, required: true},
	createdAt: {type: Date, required: true, default: Date.now()},
	hashtags: [{ type: String, required: true}],
	views: {type: Number, required: true, default: 0},
	likes: {type: Number, required: true, default: 0},
	owner: {type:mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
});

itemSchema.static('procHashtag', function(hashtags) {
	return hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`);
});

const Item = mongoose.model("Item", itemSchema);
export default Item;