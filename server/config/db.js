import mongoose from "mongoose";
import {keys} from "./keys.js";

const db = keys.mongoURI;

export const createDB = async () =>{
    try
    {
        await mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log('connected to database')   
    }
    catch(err){
        console.log(err);
    }
}

