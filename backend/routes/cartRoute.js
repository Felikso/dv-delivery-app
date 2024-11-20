import express from 'express'
import { addToCart, removeFromCart, getCart, updateCart } from '../controllers/cartController.js'
import { authMiddleware } from '../middleware/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'

const cartRoute = express.Router();

cartRoute.post('/add',authMiddleware,addToCart)
cartRoute.post('/remove',authMiddleware,removeFromCart)
cartRoute.post('/get',authMiddleware,getCart)
cartRoute.post('/update',authMiddleware,updateCart)

export default cartRoute;
