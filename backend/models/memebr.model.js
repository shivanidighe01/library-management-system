import mongoose from "mongoose";
import e from "express";

const memberSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        phone:{
            type:Number,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        }
    },
    {
        timestamps:true
    });

const Member=mongoose.model("Member",memberSchema);

export default Member;