import mongoose from "mongoose";
import e from "express";

const authorSchema=new mongoose.Schema(
    {
        
    },
    {

    });

const Author=mongoose.model("Author",authorSchema);

export default Author;