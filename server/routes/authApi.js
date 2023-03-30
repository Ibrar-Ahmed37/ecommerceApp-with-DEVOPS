import express from "express";
import authorization from "../middleware/authorization.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import expressValidator from "express-validator";
import { keys } from "../config/keys.js";
import jwt from "jsonwebtoken";
const router = express.Router();
const {check, validationResult} = expressValidator;

router.get( "/", authorization, async(req,res) =>{
    try{
    const user =  await User.findById(req.user.id).select("-password")
    res.status(200).json(user)
    }
    catch(error){
        res.status(401).json({msg:"Error"})
    }
 })

const sanitizeInput = () =>{
    return [
        check("email","Invalid Email").isEmail(),
        check("password","Password Required").notEmpty()
    ];
} 

 router.post( "/", sanitizeInput() , async(req,res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors})
    }
    try
    {
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({msg:"Invalid credentials"})
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(401).json({msg: "Invalid credentials"})
        }
        const payload = {
            user:{
                id: user.id
            }
        }
        const token = await jwt.sign(payload, keys.secretKey,{expiresIn: '24h'})
        res.json({token})
    }
    catch(error){
        res.status(401).json(error)
    }
    
})

 export default router;