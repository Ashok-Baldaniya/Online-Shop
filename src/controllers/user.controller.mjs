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
            throw new Error('User Already Exist please login!!');
        }

        const result = new User(data);
        const response = await result.save();
        res.status(201).json({ data: response, message: 'User registered successfully' });
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

        res.cookie('token', token, { expires: new Date(Date.now() + 86400000), httpOnly: true, secure: true });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const userLogout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
}