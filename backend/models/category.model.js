import mongoose from "mongoose";
import e from "express";

const categorySchema=new mongoose.Schema(
    {
        category_name:{
            type:String,
            required:true
        }
    },
    {

    });

const Category=mongoose.model("Category",categorySchema);

export default Category;