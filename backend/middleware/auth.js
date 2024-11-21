import jwt from 'jsonwebtoken'
import { badLoginAgain, errorMessage } from '../variables.js'
import userModel from '../models/userModel.js';

const authMiddleware = async (req,res,next) => {
    
    const token = req.cookies.token;


    if(!token){
        console.log('bad login')
        return res.json({success:false,message:badLoginAgain})
    }
    try{
        console.log('its okay');
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        req.body.userId = token_decode.userId;  //token_decode.id
        
        next();
    } catch (error){
        console.log(error);
        res.json({success:false,message:errorMessage})

    }
}

const authOrderMiddleware = async (req,res,next) => {

    const token = req.cookies.token;

    try{
        if(token){
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        req.body.userId = token_decode.userId;  //token_decode.id
        } else{
            req.body.userId = ''  
        }
        
        next();
    } catch (error){
        console.log(error);
        res.json({success:false,message:errorMessage})

    }
}

const adminMiddleware = async (req,res,next) => {
    
	const token = req.cookies.token;
    
    if(!token){
        return res.json({success:false,message:badLoginAgain})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        req.body.userId = token_decode.userId;  //token_decode.id
        const user = await userModel.findOne({
			_id: req.body.userId,
            isAdmin: true
		});

        if(!user){
            return res.json({success:false,message:badLoginAgain})
        }
        next();
    } catch (error){
        console.log(error);
        res.json({success:false,message:errorMessage})

    }
}


export  {authMiddleware, adminMiddleware,authOrderMiddleware}