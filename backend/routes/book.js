import express from 'express'
import { addBook, browseBook, getSingleBook, updateBook } from '../controller/book.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminOnly } from '../middleware/onlyAdmin.js';
// import { authentication } from '../middleware/auth.js';

const app=express.Router();

app.post('/add',authMiddleware,adminOnly,addBook);
app.get('/all',browseBook);
app.get('/single/:id',getSingleBook);
app.put('/update/:id',authMiddleware,adminOnly,updateBook);

export default app;