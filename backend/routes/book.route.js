import e from "express";
// import Book from '../models/book.model.js';
import { addBook, addCategory, deleteBook, getAllIssueBook, getByAuthor, getByISBN, getByTitle, issueBook, returnBook, showAllBook, updateBook } from "../controller/book.controller.js";
import { auth, authByRole } from "../middleware/auth.js";
// import { router } from "express";


const router=e.Router()
// router.post('/add',addCategory);
router.post('/add',auth,authByRole('Librarian'),addBook);
router.put('/update',auth,authByRole('Librarian'),updateBook);
router.delete('/delete',auth,authByRole('Librarian'),deleteBook);
router.get('/allBooks',showAllBook);
router.get('/getOne',auth,authByRole('Member'),getByISBN);
router.get('/getByAuthor',auth,authByRole('Member'),getByAuthor);
router.get('/getByTitle',auth,authByRole('Member'),getByTitle);
router.post('/issue',issueBook);
router.get('/getIssue',getAllIssueBook);
router.put('/returnBook',returnBook);


export default router;
