import express from 'express';
import { dbConnection } from './config/db.mjs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

dbConnection();

app.use('/',);

app.listen(process.env.PORT, () => {
    console.log('server running');
})
