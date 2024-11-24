import express from 'express';
import {
	addCategory,
	listCategories,
	removeCategory,
    updateCategory
} from '../controllers/categoryController.js';
import multer from 'multer'
import { adminMiddleware } from '../middleware/auth.js';
import { customErrors } from '../utils/variables.js';
import categoryModel from '../models/categoryModel.js';




const storage = multer.diskStorage({
    destination: 'uploads',
    filename: async(req,file,cb)=>{ 



        let imageName = file.originalname

        const imgAlreadyExists = await categoryModel.findOne({ image: file.originalname });

        if (imgAlreadyExists) {

            const slug = Math.floor(
                100 + Math.random() * 900
            ).toString();

            imageName = file.originalname+'_'+slug
        }
        return cb(null,`${imageName}`)
        //return cb(null, file.originalname)
    }
})
const upload = multer({storage:storage});

const categoryRoute = express.Router();
categoryRoute.post('/add',upload.single('image'),addCategory)
categoryRoute.post('/remove', adminMiddleware, removeCategory);
categoryRoute.post('/list', adminMiddleware, listCategories);
categoryRoute.post('/update',upload.single('image'),updateCategory)

export default categoryRoute;
