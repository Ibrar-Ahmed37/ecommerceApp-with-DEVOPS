import mongoose from "mongoose";
const Schema =  mongoose.Schema;
const productSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, //id is the unique thing that mongodb defines while saving
        required: true
    },
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    quantity:
    {
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    brand: String,
    created:{
        type: Date,
        default: Date.now()
    },
    updated:{
        type: Date,
        default: Date.now()
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product;