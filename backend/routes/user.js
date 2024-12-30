import express from "express";
import { register,login } from "../controller/user.js";
import { authMiddleware } from "../middleware/auth.js";

const app=express.Router();

app.post('/register',register);

app.post('/login',login);

// Protected Routes
app.get('/protected', authMiddleware, (req, res) => {
    return res.status(200).json({
      success: true,
      message: "You are authorized",
    });
  });

export default app;