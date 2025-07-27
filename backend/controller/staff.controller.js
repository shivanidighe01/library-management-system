import express from 'express';
import Staff from '../models/staff.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Transaction from '../models/transactions.model.js';


export const register = async (req,res)=>{
    try {
        const {name,email,phone,role,password}=req.body;
        // console.log(name,email,phone,role,password);
        
        if(!name || !email || !phone || !role || !password)
        {
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const hashPass= await bcrypt.hash(password,5);

        const existing = await Staff.findOne({email});

        if(existing)
        {
            return res.status(400).json({
                message:"User already exist"
            })
        }
        else{
        const staff = new Staff({
            name,
            email,
            phone,
            role,
            password:hashPass
        });

        await staff.save();
    
        res.status(200).json({
            message:"registered",
            staff
        })
    }
    } catch (error) {
        console.log(`error at registration ${error}`);
    }
}

export const login = async (req,res) => {
    try {
        const {email,password}=req.body;
        // console.log(email,password);

        if(!email || !password)
        {
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const exist=await Staff.findOne({email});
        // console.log(exist);

        if(!exist)
        {
            return res.status(400).json({
                message:"User Not found"
            })
        }

       const passMatch= await bcrypt.compare(password,exist.password);

       if(!passMatch)
       {
            return res.status(400).json({
            message:"Invalid credentials"
        })
       }

       const token=jwt.sign(
        {
            Id:exist._id,
            email:exist.email,
            role: exist.role
        },
        process.env.JWT_SECRETE);
    //    console.log(token);

       res.status(200).json({
        message:"login successfull",
        token,
        user:{
            Id:exist._id,
            email:exist.email,
            role:exist.role

        }
       })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"login failed",
            error
        })
    }
}

export const getBorrowBook=async(req,res)=>{
    try {
        const {memberId}=req.body;

        let book=await Transaction.find({memberId,status:'Issued'}).populate([
            {path:'bookId', select:'ISBN title author status'},
            {path:'memberId',select:'name '}
        ]);

        // Calculate running fine for overdue books
        const currentDate = new Date();
        const totalFine = book.reduce((acc, t) => {
            if (t.DueDate && currentDate > t.DueDate) {
                const fineDays = Math.ceil((currentDate - t.DueDate) / (1000 * 60 * 60 * 24));
                return acc + (fineDays * 10); // ₹10 per day
            }
            return acc;
        }, 0);
        res.status(200).json({
            message:`Books borrowed by ${book[0]?.memberId?.name || 'Unknown'}`,
            total:book.length,
            Fine:totalFine,
            book
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Internal server error"
        })
    }
}

export const getReturnedBook=async(req,res)=>{
    try {
        const {memberId}=req.body;

        let book=await Transaction.find({memberId,status:'Returned'}).populate([
            {path:'bookId', select:'ISBN title author status'},
            {path:'memberId',select:'name '}
        ]);

        // Calculate running fine for overdue books
        const currentDate = new Date();
        const totalFine = book.reduce((acc, t) => {
            if (t.DueDate && currentDate > t.DueDate) {
                const fineDays = Math.ceil((currentDate - t.DueDate) / (1000 * 60 * 60 * 24));
                return acc + (fineDays * 10); // ₹10 per day
            }
            return acc;
        }, 0);
        res.status(200).json({
            message:`Books Returned by ${book[0]?.memberId?.name || 'Unknown'}`,
            total:book.length,
            Fine:totalFine,
            book
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Internal server error"
        })
    }
}