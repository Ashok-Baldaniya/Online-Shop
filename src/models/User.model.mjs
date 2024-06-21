import mongoose from "mongoose";

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

const User = mongoose.model('User', userSchema);

userSchema.pre('save', () => {

})

export default User;