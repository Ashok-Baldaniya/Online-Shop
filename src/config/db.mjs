import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting mongodb');
    });
}
