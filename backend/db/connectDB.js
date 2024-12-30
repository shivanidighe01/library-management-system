import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/library-mngt')

        console.log("db connected successfully");
    } catch (error) {
        console.log(`db error ${error}`);
    }
}

export default connectDb;