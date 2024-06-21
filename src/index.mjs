import express from 'express';
import { dbConnection } from './config/db.mjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/user.route.mjs';
// import productRouter from './routes/product.route.mjs';
// import orderRouter from './routes/order.route.mjs';
// import reviewRouter from './routes/review.route.mjs';

dbConnection();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/user', userRouter);
// app.use('/product', productRouter);
// app.use('/order', orderRouter);
// app.use('/review', reviewRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`);
})
