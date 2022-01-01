import Item from "../models/Item";

export const handleItem = async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Item.findById(id);
		return res.render("item", {title : item.title, item});
	} catch(error) {
		return res.render("error", {title: "error"});
	}
};

export const getUpload = (req, res) => res.render("upload", {title: "upload"});
export const postUpload = async (req, res) => {
	const { title, description, hashtags } = req.body;
	const item = new Item({
		title,
		description,
		hashtags: Item.procHashtag(hashtags)
	});
	console.log(item);
	const newItem = await item.save();
	res.redirect(`${newItem._id}`);
};

export const getUpdate = async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Item.findById(id);
		return res.render("update", {title: "update", item}); 
	} catch(error) {
		return res.render("error", {title: "error"});
	}
};

export const postUpdate = async (req, res) => {
	const { id } = req.params;
	const { title, description, hashtags } = req.body;
	try {
		await Item.findByIdAndUpdate(id, {
			title,
			description,
			hashtags: Item.procHashtag(hashtags)
		});
		res.redirect("/");
	} catch(error) {
		return res.render("error", {title: "error"});
	}
};

export const handleDelete = async (req, res) => {
	const { id } = req.params;
	try {
		await Item.findByIdAndDelete(id);
		res.redirect("/");
	} catch(error) {
		return res.render("error", {title: "error"});
	}
}