import itemsModel from '../models/itemsModel.js';
import fs from 'fs';
import { succesMessage, errorMessage, removedMessage } from '../variables.js';
import { customInfo } from '../utils/variables.js';

const addItems = async (req, res) => {
	let image_filename = req.file ? `${req.file.filename}` : 'default.png';

	const items = new itemsModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image: image_filename,
	});
	try {
		await items.save();
		res.json({ success: true, message: succesMessage });
	} catch (error) {
		res.json({ success: false, message: errorMessage });
	}
};

const itemsList = async (req, res) => {
	try {
		const items = await itemsModel.find({});
		res.json({ success: true, data: items });
	} catch (error) {
		res.json({ success: false, message: errorMessage });
	}
};

const itemsCat = async (req, res) => {
	try {
		const items = await itemsModel.find({});
		let catArr = [];
		Object.entries(items).map(([item, i]) => {
			if (!(i['category'] == 'undefined') && !catArr.includes(i['category'])) {
				catArr.push(i['category']);
			}
		});

		res.json({ success: true, data: catArr });
	} catch (error) {
		res.json({ success: false, message: errorMessage });
	}
};

const removeItem = async (req, res) => {
	try {
		const item = await itemsModel.findById(req.body.id);
		if (item.image !== 'default.png') {
			console.log(item);
			fs.unlink(`uploads/${item.image}`,()=>{})
		}

		await itemsModel.findByIdAndDelete(req.body.id);
		res.json({ success: true, message: customInfo.itemRemoved });
	} catch {
		res.json({ success: false, message: errorMessage });
	}
};

const updateItem = async (req, res) => {
	try {
		await itemsModel.findByIdAndUpdate(req.body.id, {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
		});
		if (req.file) {
			await itemsModel.findByIdAndUpdate(req.body.id, {
				image: req.file.filename,
				img: req.body.img,
			});
		}
		res.json({ success: true, message: 'item updated' });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'error' });
	}
};

export { addItems, itemsList, removeItem, updateItem, itemsCat };
