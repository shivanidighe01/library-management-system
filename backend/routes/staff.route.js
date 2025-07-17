import e from "express";
import Staff from '../models/staff.model.js';
// import { router } from "express";


const router=e.Router()
router.post('/add',(req,res)=>{
    res.send("new book");
});


export default router;
