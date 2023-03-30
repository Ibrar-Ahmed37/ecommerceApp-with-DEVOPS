import express from "express";
import expressValidator from "express-validator";
import authorization from "../middleware/authorization.js";
import Product from "../models/Product.js";

const router = express.Router();
const {check, validationResult} = expressValidator;
router.get('/',(req,res)=>{
    res.send('hey from the product api')
})
const sanitizeInput = () => {
    return [
        check("name","Name is required").notEmpty(),
        check("description","Description is required").notEmpty(),
        check("category","Category is required").notEmpty(),
        check("price","Price is required").notEmpty()
    ]
}

router.post('/', [ authorization, sanitizeInput()] , async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(401).json({msg: errors})
    }
    try{
        const product = new Product({...req.body, userId : req.user.id})
        const savedProduct = await product.save();
        res.status(201).json({savedProduct})
    }
    catch(error){
        return res.status(500).json(error) //server error
    }
})

export default router;