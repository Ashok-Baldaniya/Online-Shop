import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        city: String,
        state: String,
        country: String
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashPassword = await bcrypt.hash(this.password, 10);
        this['password'] = hashPassword;
    }
    next();
})

const User = mongoose.model('User', userSchema);
export default User;