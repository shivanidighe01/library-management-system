import e from "express";
import connect from "./DB/dbConnect.js";
import 'dotenv/config';

//routes
import bookRoute from './routes/book.route.js';
import categoryRoute from './routes/category.route.js';
import fineRoute from './routes/fine.route.js';
// import memberRoute from './routes/member.route.js';
import staffRoute from './routes/staff.route.js';
import transRoute from './routes/transaction.route.js';

const app = e();


const port = process.env.PORT | 3000;

//to parse json data
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

//routes
app.use('/api/v1/book',bookRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/fine',fineRoute);
// app.use('/api/v1/member',memberRoute);
app.use('/api/v1/staff',staffRoute);
app.use('/api/v1/trans',transRoute);

//db connection
connect();

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});
