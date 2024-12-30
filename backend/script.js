import express from 'express';
import connectDb from './db/connectDB.js';
import bodyParser from 'body-parser';

const app=express();

connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data

//routes
import userRoute from './routes/user.js'
import bookRoute from './routes/book.js'
app.use('/api/user',userRoute);
app.use('/api/book',bookRoute);



const PORT=3000;



app.listen(PORT,()=>{
    console.log(`PORT listen on ${PORT}`);
})