import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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

export const startGithubLogin = (req, res) => {
	const baseUrl = "https://github.com/login/oauth/authorize";
	const config = {
		client_id : process.env.GH_CLIENT,
		allow_signup: false,
		scope : "read:user user:email"
	}
	const params = new URLSearchParams(config).toString();
	const url = `${baseUrl}?${params}`;
	return res.redirect(url);
};

export const finishGithubLogin = async (req, res) => {
	const baseUrl = "https://github.com/login/oauth/access_token";
	const config = {
		client_id : process.env.GH_CLIENT,
		client_secret: process.env.GH_SECRET,
		code: req.query.code,
	};
	const params = new URLSearchParams(config).toString();
	const url = `${baseUrl}?${params}`;
	const tokenRequest = await (await fetch(url, {
		method:"POST",
		headers:{
			Accept:"application/json",
		},
	})).json(); 
	if ("access_token" in tokenRequest) {
		const { access_token } = tokenRequest;
		const userRequest = await (
			await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `token ${access_token}`
			}
		})).json();
		console.log(userRequest);
	} else {
		res.redirect("/login");
	}
};