import User from '../models/User.model.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET } = process.env;

export const userRegistration = async (req, res) => {
    try {
        const data = req.body;

        const userExist = await User.findOne({ email: data.email });
        if (userExist) {
            throw new Error('User Already Exist');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const result = await User.create(data);
        res.status(201).json({ data: result, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            throw new Error('User not exist please register first');
        }

        const isPassword = await bcrypt.compare(password, userExist.password);
        if (!isPassword) {
            throw new Error('Invalid Email or Password');
        }

        const token = jwt.sign({ userId: userExist._id }, JWT_SECRET, { expiresIn: '1h', });

        res.cookie('access_token', token, { maxAge: 900000, httpOnly: true, secure: true }).status(200).json({ token });
    } catch (error) {
        res.status(500).json(error.message);
    }
}