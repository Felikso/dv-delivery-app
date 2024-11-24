import categoryModel from '../models/categoryModel.js';

import {
	customErrors,
	customInfo,
	errorMessage,
} from '../utils/variables.js';



const addCategory = async (req, res) => {

	const { name } = req.body;
    		const catAlreadyExists = await categoryModel.findOne({ name });

		if (catAlreadyExists) {
			return res
				.status(400)
				.json({ success: false, message: customErrors.categoryAlreadyExists });
		}
	let image_filename = req.file ? `${req.file.filename}` : 'default.png';

	const categories = new categoryModel({
		name: name,
		image: image_filename,
	});
	try {
		await categories.save();
		res.json({ success: true, message: succesMessage });
	} catch (error) {
		res.json({ success: false, message: errorMessage });
	}
};

const listCategories = async (req, res) => {
	try {
		const category = await categoryModel.find({});
		res.json({ success: true, data: category });
	} catch (error) {
		res.json({ success: false, message: customErrors.loadListField });
	}
};


const removeCategory = async (req, res) => {
	try {
		const item = await itemsModel.findById(req.body.id);
		if (item.image !== 'default.png') {
			fs.unlink(`uploads/${item.image}`,()=>{})
		}

		await categoryModel.findByIdAndDelete(req.body.id);
		res.json({ success: true, message: removedMessage });
	} catch {
		res.json({ success: false, message: errorMessage });
	}
};

const updateCategory = async (req, res) => {
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
		res.json({ success: true, message: 'category updated' });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'error' });
	}
};

export {
    addCategory,
	listCategories,
	removeCategory,
    updateCategory
};
