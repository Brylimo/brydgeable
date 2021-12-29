export const handleUser = (req, res) => res.send("user");
export const handleJoin = (req, res) => res.render("join", {title: "join"});
export const handleLogin = (req, res) => res.render("login", {title : "login"});