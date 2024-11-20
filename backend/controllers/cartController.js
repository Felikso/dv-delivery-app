import userModel from '../models/userModel.js'
import { addedMessage, errorMessage, removedMessage, updateMessage } from '../variables.js'


//add items to user cart
const addToCart = async (req,res) => {
    try {
       //let userData = await userModel.findById(req.body.userId)
      
      // console.log(req);
  
      console.log(req.body.cartData);
      
       
       let userData = await userModel.findOne({_id:req.body.userId})

       let cartData = await userData?.cartData;

/*        const itemExists = userData.find(
        (cartItem) => cartItem._id === item._id
      ); */
      //console.log(userData);
      //console.log(cartData);
 // console.log(req.body);
  
      
      //console.log(itemExists);
      

       if(!cartData[req.body.itemId]){
           cartData[req.body.itemId] = 1;
       }else{
           cartData[req.body.itemId] += 1;
       }

/*         let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        } */
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true,message:addedMessage})
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:errorMessage})
    }
}

//remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        console.log(req.body.cartData);
  
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:removedMessage})
    } catch (error) {
       console.log(error);
       console.log('removeFromCart');
       res.json({success:false,message:errorMessage}) 
    }
}

//fetchuser cart data
const getCart = async (req,res) => {
    try {
        console.log(req.body.userId);
       // console.log(cartData);
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData?.cartData;

        
        
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:errorMessage})
        
    }
}

//pdate items from user cart
const updateCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if(userData&&req.body.cartItems){
            await userModel.findByIdAndUpdate(req.body.userId,{cartData:req.body.cartItems});
        }
        res.json({success:true,message:removedMessage})
    } catch (error) {
       res.json({success:false,message:errorMessage}) 
    }
}

export {addToCart,removeFromCart,getCart,updateCart}