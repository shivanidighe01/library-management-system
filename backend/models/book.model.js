import mongoose from "mongoose";
import e from "express";

const bookSchema=new mongoose.Schema(
    {
        ISBN:{
            type:String,
            unique:true,
            required:true
        },
        title:{
            type:String,
            required:true,
            unique:true
        },
        author:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        category:{
            type:mongoose.Schema.ObjectId,
            ref:'Category'
        },
        status:{
            type:String,
            enum:['Available','Not-Available']
        }

    },
    {
        timestamps:true
    });

const Book=mongoose.model("Book",bookSchema);

export default Book;