import express from "express";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('hey from the product api')
})

export default router;