import express from 'express';
import { verifyRabat, setRabat, deleteRabat } from '../controllers/rabatController.js';
import { adminMiddleware, authMiddleware } from '../middleware/auth.js';

const rabatRoute = express.Router();

rabatRoute.post('/set', adminMiddleware, setRabat);
rabatRoute.post('/verify', verifyRabat);
rabatRoute.post('/delete',authMiddleware, deleteRabat);


export default rabatRoute;
