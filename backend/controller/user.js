import {User} from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const jwt_secret='mysecretekeyof32bitlong'

export const register= async(req,res)=>{
        
    try {
        // console.log(req.body);
        const{username,password}=req.body;

        const existUser=await User.findOne({username});
        if(existUser)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"user already exist"

                }
            )
        }

        if(!username || !password)
        {
            return res.status(404).json({
                success:false,
                message:"Please Enter all fields"
            })
        }
        
        const hashPass=await bcrypt.hash(password,4);
        const newUser=await new User({
            username,
            password:hashPass
        });

        newUser.save();

        return res.status(200).json({
            success:true,
            newUser,
            message:"user registered successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            error,
            message:"user not registered"
        });
    }
};

export const login=async(req,res)=>{

    try {
        // console.log(req.body);
        const {username,password}=req.body;

        const user=await User.findOne({username});
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        const validPass=await bcrypt.compare(password,user.password);
        // console.log(validPass);

        if(!validPass)
        {
            return res.status(400).json({
                success:false,
                message:"invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, // Include role in token payload
            jwt_secret,
            { expiresIn: "1h" }
          );
        
        //   console.log(token);
          return res.status(200).json({
            success: true,
            token,
            message: "Login successful",
          });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"login unsuccessfull"
        })
    }
};