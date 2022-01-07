import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	username: {type: String, required: true, unique: true},
	password: {type: String, unique: true},
	social: {type: Boolean, default: false}
});

userSchema.pre('save', async function() {
	this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);
export default User;