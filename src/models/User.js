import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	avatarUrl: {type: String },
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true},
	password: {type: String },
	social: {type: Boolean, default: false},
	items: [{type:mongoose.Schema.Types.ObjectId, required: true, ref: "Item"}]
});

userSchema.pre('save', async function() {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
});

const User = mongoose.model("User", userSchema);
export default User;