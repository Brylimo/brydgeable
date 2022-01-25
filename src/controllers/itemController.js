import Item from "../models/Item";
import User from "../models/User";

export const watch = async (req, res) => {
	const { id } = req.params;
	const item = await Item.findById(id).populate("owner");
	if (!item) {
		return res.status(404).render("error", {title: "Video not found."});
	}
	return res.render("item", {title : item.title, item });
};

export const getUpload = (req, res) => res.render("upload", {title: "upload"});
export const postUpload = async (req, res) => {
	const {
		user : { _id }
	} = req.session;
	const { video, thumb } = req.files;
	const { title, description, hashtags } = req.body;
	const item = new Item({
		title,
		description,
		fileUrl: video[0].path,
		thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
		owner: _id,
		hashtags: Item.procHashtag(hashtags)
	});
	const newItem = await item.save();
	const user = await User.findById(_id);
	user.items.push(newItem._id);
	user.save();
	res.redirect(`${newItem._id}`);
};

export const getUpdate = async (req, res) => {
	const { id } = req.params;
	try {
		const item = await Item.findById(id);
		if (!item) {
			return res.status(404).render("error", {title: "Video not found."});
		}
		if (String(item.owner) !== String(req.session.user._id)) {
			return res.status(403).redirect("/");
		}
		return res.render("update", {title: "update", item}); 
	} catch(error) {
		return res.status(404).render("error", {title: "error"});
	}
};

export const postUpdate = async (req, res) => {
	const { id } = req.params;
	const { title, description, hashtags } = req.body;
	const item = await Item.findById({ _id: id });
	if (!item) {
		return res.status(404).render("error", {title: "Video not found."});
	}
	if (String(item.owner) !== String(req.session.user._id)) {
		return res.status(403).redirect("/");
	}
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
	const item = await Item.findById({ _id: id });
	console.log(item);
	if (!item) {
		return res.status(404).render("error", {title: "Video not found."});
	}
	if (String(item.owner) !== String(req.session.user._id)) {
		return res.status(403).redirect("/");
	}
	try {
		await Item.findByIdAndDelete(id);
		res.redirect("/");
	} catch(error) {
		return res.render("error", {title: "error"});
	}
}

export const getSearch = async (req, res) => {
	const { keyword } = req.query;
	let items = [];
	if (keyword) {
		try {
			items = await Item.find({ 
				title: {
					$regex: new RegExp(keyword, "i"),
				}
			}).populate("owner");
		} catch(error) {
			console.log(error);
		}
	}
	return res.render("search", {title: "search", items});
};

export const registerView = async (req, res) => {
	const {id} = req.params;
	const video = await Item.findById(id);
	if (!video) {
		return res.sendStatus(404);
	}
	video.views = video.views + 1;
	await video.save();
	return res.sendStatus(200);
}