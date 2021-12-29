export const handleItem = (req, res) => {
	const id = req.params.id;
	return res.render("item", {title : "item"})
};