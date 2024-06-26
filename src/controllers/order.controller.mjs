import Order from '../models/Order.model.mjs';
import Cart from '../models/Cart.model.mjs';
import Product from '../models/Product.model.mjs';

export const addOrder = async (req, res) => {
    try {
        const data = req.body;
        const cartDetail = await Cart.findById(data.cartDetails).populate('items.product');
        if (!cartDetail) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = cartDetail.items;
        const priceTotal = items.reduce((total, item) => {
            return total + item.product.price * item.quantity
        }, 0);

        data.totalAmount = priceTotal;

        const order = await Order.create(data);
        res.status(201).json({ data: order, message: 'Order created successfully' });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json(error.message);
    }
}

export const updateOrder = async (req, res) => {
    try {
        const params = req.params;
        const data = req.body;
        const cartDetail = await Cart.findById(data.cartDetails).populate('items.product');
        if (!cartDetail) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = cartDetail.items;
        const priceTotal = items.reduce((total, item) => {
            return total + item.product.price * item.quantity
        }, 0);

        data.totalAmount = priceTotal;
        const order = await Order.findByIdAndUpdate({ _id: params.orderId }, data);
        res.status(200).json({ data: order, message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteOrder = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getOrders = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json(error.message);
    }
}
