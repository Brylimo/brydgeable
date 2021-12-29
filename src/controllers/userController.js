export const handleUser = (req, res) => res.send("user");
export const handleHome = (req, res) => res.render("home", {title : "home"});