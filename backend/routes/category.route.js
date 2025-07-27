import e from "express";
import Category from '../models/category.model.js';
import { addCategory } from "../controller/book.controller.js";
import { auth, authByRole } from "../middleware/auth.js";
// import { router } from "express";


const router=e.Router()
router.post('/add',auth,authByRole('Admin'),addCategory);


export default router;
