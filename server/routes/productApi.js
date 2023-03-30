import express from "express";
import expressValidator from "express-validator";
import authorization from "../middleware/authorization.js";
import Product from "../models/Product.js";

const router = express.Router();
const {check, validationResult} = expressValidator;

//router to get all the products
router.get('/', async(req,res)=>{
    console.log('h')
    try{
        const products = await Product.find();
        if(!products){
            return res.send({msg: "No products are there at the Moment"})
        }
        return res.status(200).send(products);
    }
    catch(error){
        res.status(500).send({msg: "Server Failure"})
    }
})

//router to get only the product with id from the params
router.get('/:id',async (req, res)=>{
    console.log('in id route of get product' , )
    try
    {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(400).json({msg: "Product was not Found"})
        }
        res.json(product) 
 
    } 
    catch(error)
    {

    }
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