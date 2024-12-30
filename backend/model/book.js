import mongoose from "mongoose";

const bookSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        ISBN:{
            type:String,
            required:true,
            unique:true
        },
        status:{
            type:String,
            enum:['Borrowed','Not Borrowed'],
            default:'Not Borrowed',
            // required:true
        }
    },
{
    timestamps:true
});

export const Book=mongoose.model('Book',bookSchema);