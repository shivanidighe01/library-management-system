import mongoose from "mongoose";
import e from "express";

const fineSchema=new mongoose.Schema(
    {
        transactionId:{
            type:mongoose.Schema.ObjectId,
            required:true,

        },
        amount:{
            type:Number,
            required:true
        },
        paid:{
            type:String,
            enum:['Yes','No']
        }
    },
    {
        timestamps:true
    });

const Fine=mongoose.model("Fine",fineSchema);

export default Fine;