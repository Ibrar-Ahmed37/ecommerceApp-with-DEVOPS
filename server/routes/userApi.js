import express from "express";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('from the user api')
})

export default router;