import express from 'express'
import { addItems,itemsList,removeItem, updateItem, itemsCat } from '../controllers/itemsController.js'
import { adminMiddleware } from '../middleware/auth.js';
import multer from 'multer'


const itemsRoute = express.Router();

//image storage engine


//

const storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{ 
        return cb(null,`${Date.now()}${file.originalname}`)
        //return cb(null, file.originalname)
    }
})
const upload = multer({storage:storage});

/* const upload = multer({storage:storage,limits: { fieldSize: 10 * 1024 * 1024 } }); */

itemsRoute.post('/add',adminMiddleware,upload.single('image'),addItems)
itemsRoute.get('/list',itemsList)
itemsRoute.get('/categories',itemsCat)
itemsRoute.post('/remove',adminMiddleware,removeItem)
itemsRoute.post('/update',adminMiddleware,upload.single('image'),updateItem)





export default itemsRoute;