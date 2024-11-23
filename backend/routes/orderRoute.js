import express from 'express'
import { authOrderMiddleware } from '../middleware/auth.js'
import { placeOrder, userOrders, listOrders, updateStatus, removeOrder, verifyOrderCode } from '../controllers/orderController.js'
import { verifyOrderUrl, userOrdersUrl } from '../variables.js'

const orderRoute = express.Router();

orderRoute.post('/place',authOrderMiddleware,placeOrder) //authMiddleware
orderRoute.post(verifyOrderUrl+'/:_id',verifyOrderCode)
orderRoute.post(userOrdersUrl,authOrderMiddleware,userOrders) //authMiddleware
orderRoute.get('/list',listOrders)
orderRoute.post('/status',updateStatus)
orderRoute.post('/remove',removeOrder)

export default orderRoute