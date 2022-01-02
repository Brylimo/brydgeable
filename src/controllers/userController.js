import User from "../models/User";
import bcrypt from "bcrypt";

export const handleUser = (req, res) => res.send("user");
export const getJoin = (req, res) => res.render("join", {title: "join"});
export const postJoin = async (req, res) => {
	try {
		const { name, email, username, password, password2 } = req.body;
		const userExist = await User.exists({ $or: [{username}, {password}] });
		if (userExist) {
			return res.status(400).render("join", {title: "join", errorMessage: "username/password already have taken"});
		}
		if (password !== password2) {
			return res.status(400).render("join", {title: "join", errorMessage: "password and password2 are different"});
		}
		await User.create({
			name,
			email,
			username,
			password
		});
		return res.redirect("/login");
	} catch(error) {
		console.log(error);
	}
};
export const getLogin = (req, res) => res.render("login", {title : "login"});
export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	const title = "login";
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).render("login", {
			title,
			errorMessage: "An account with this username does not exists."
		});
	}
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) {
		return res.status(400).render("login", {
			title,
			errorMessage: "Wrong password"
		});
	}
	req.session.loggedIn = true;
	req.session.user = user;
	console.log(req.session);
	return res.redirect("/");
}