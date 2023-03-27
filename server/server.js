import express from "express";
import { createDB } from "./config/db.js";
import productRoute from "./routes/productApi.js";
import userRoute from "./routes/userApi.js";
const app = express();
const PORT = process.env.PORT || 5000;
  
//Connect MONGODB
createDB();

//middleware that parses incoming Json data and exposes it on the req.body property of the requested object
app.use(express.json())

//Define Routes and APIS
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)


app.listen(PORT, ()=> console.log(`server running at PORT ${PORT}`))