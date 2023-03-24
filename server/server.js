import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req,res,next)=>
{
    console.log('hey i am in the middleware')
    next();
})

app.get("/",(req,res)=>{
    res.send("hello from my ecommerce app");
})

app.listen(PORT, ()=> console.log(`server running at PORT ${PORT}`))