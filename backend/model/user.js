import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            unique:true
        },
        role:{
            type:String,
            enum:['Admin','Common'],
            default:'Common'
        }
    },
    {
        timestamps:true
    }
);

export const User=mongoose.model("User",userSchema);

