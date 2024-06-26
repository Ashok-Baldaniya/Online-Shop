import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    cartDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    shippingAddress: {
        city: String,
        state: String,
        country: String
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;