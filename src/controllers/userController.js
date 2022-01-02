import User from "../models/User";

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
	return res.render("login", {title : "login"});
}