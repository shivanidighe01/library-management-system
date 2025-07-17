import mongoose from "mongoose";
import e from "express";

const staffSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            required:true,
            unique:true
        },
        role:{
            type:String,
            enum:['Member','Librarian','Admin'],
            required:true
        },
        password:{
            type:String,
            unique:true,
            required:true
        }
    },
    {
        timestamps:true
    });

const Staff=mongoose.model("Staff",staffSchema);

export default Staff;