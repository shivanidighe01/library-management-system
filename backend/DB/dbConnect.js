import e from "express";
import mongoose from "mongoose";


const app=e();

const connect= async()=>{
    await mongoose.connect('mongodb://localhost/LMS')
    .then(()=>{
        console.log("db connected");
    })
    .catch((error)=>{
        console.log("db not connected", error);
    })

}

export default connect;