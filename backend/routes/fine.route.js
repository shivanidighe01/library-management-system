import e from "express";
import Fine from '../models/fine.model.js';
// import { router } from "express";


const router=e.Router()
router.post('/add',(req,res)=>{
    res.send("new book");
});


export default router;
