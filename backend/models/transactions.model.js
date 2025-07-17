import mongoose from "mongoose";
import e from "express";

const transSchema=new mongoose.Schema(
    {
        bookId:{
            type:mongoose.Schema.ObjectId,
            ref:'Book',
            required:true
        },
        memberId:{
            type:mongoose.Schema.ObjectId,
            ref:'Staff',
            required:true
        },
        IssueDate:{
            type:Date,
            required:true,
        },
        ReturnDate:{
            type:Date,

        },
        DueDate:{
            type:Date,
            required:true
        },
        status:{
            type:String,
            enum:['Issued','Returned']
        }
    },
    {
        timestamps:true
    });

const Transaction=mongoose.model("Transaction",transSchema);

export default Transaction;