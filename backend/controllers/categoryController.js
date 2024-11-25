import categoryModel from '../models/categoryModel.js';
import fs from 'fs';
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
		res.json({ success: true, message: customInfo.catSavedSuccess });
	} catch (error) {
        console.log(error);
        
		res.json({ success: false, message: customErrors.catDosentSaved });
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
	console.log(req.body);
	try {
		const item = await categoryModel.findById(req.body.id);
		if (item.image !== 'default.png') {
			fs.unlink(`uploads/${item.image}`,()=>{})
		}



		const cat = await categoryModel.findByIdAndDelete(req.body.id);
		console.log(cat);
		
		res.json({ success: true, message: customInfo.categoryRemoved });
	} catch {
		res.json({ success: false, message: errorMessage });
	}
};

const updateCategory = async (req, res) => {
	try {
		await categoryModel.findByIdAndUpdate(req.body.id, {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
		});
		if (req.file) {
			await categoryModel.findByIdAndUpdate(req.body.id, {
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
