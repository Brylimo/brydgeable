import User from "../models/User";

export const handleUser = (req, res) => res.send("user");
export const getJoin = (req, res) => res.render("join", {title: "join"});
export const postJoin = async (req, res) => {
	try {
		const { name, email, username, password, password2 } = req.body;
		await User.create({
			name,
			email,
			username,
			password,
			password2
		});
		res.redirect("/login");
	} catch(error) {
		console.log(error);
	}
};
export const getLogin = (req, res) => res.render("login", {title : "login"});
export const postLogin = async (req, res) => {
	const { username, password } = req.body;
	let errorMessage = "";
	const exist = await User.exists({ $and: [{username}, {password}] });
	if (!exist) {
		errorMessage = "username/password unmatch";
		return res.status(400).render("login", {title : "login", errorMessage });
	}
	return res.render("login", {title : "login", errorMessage });
}