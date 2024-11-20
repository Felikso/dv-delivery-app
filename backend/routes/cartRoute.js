import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'
import { authMiddleware } from '../middleware/auth.js'
import { verifyToken } from '../middleware/verifyToken.js'

const cartRoute = express.Router();

cartRoute.post('/add',verifyToken,addToCart)
cartRoute.post('/remove',verifyToken,removeFromCart)
cartRoute.post('/get',verifyToken,getCart)

export default cartRoute;
