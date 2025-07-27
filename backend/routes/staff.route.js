import e from "express";
import Staff from '../models/staff.model.js';
import { getBorrowBook, getReturnedBook, login, register } from "../controller/staff.controller.js";
import { auth } from "../middleware/auth.js";
import { getAllMember, getAllStaff, getTotalFineForAllMembers } from "../controller/admin.controller.js";
// import { router } from "express";


const router=e.Router()
router.post('/register',register);
router.get('/login',login);
// router.get('/auth',auth,login);
router.get('/borrowed',getBorrowBook);
router.get('/returned',getReturnedBook);

//admin

router.get('/getStaff',getAllStaff);
router.get('/getMember',getAllMember);
router.get('/getAllFine',getTotalFineForAllMembers);
export default router;
