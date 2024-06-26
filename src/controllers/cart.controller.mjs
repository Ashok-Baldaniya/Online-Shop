import Cart from '../models/Cart.model.mjs';

export const createCart = async (req, res) => {
    try {
        const data = req.body;
        data.user = req.user;
        const cart = await Cart.create(data);
        res.status(201).json({ data: cart, message: 'Cart created successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const updateCart = async (req, res) => {
    try {
        const user = req.user;
        const params = req.params;
        const requestBody = req.body;
        requestBody.user = user;

        const updatedCart = await Cart.findByIdAndUpdate({ _id: params.cartId }, requestBody);
        res.status(200).json({ data: updatedCart, message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteCart = async (req, res) => {
    try {
        const params = req.params;

        const updatedCart = await Cart.findByIdAndDelete({ _id: params.cartId });
        res.status(200).json({ data: updatedCart, message: 'Cart removed successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getCarts = async (req, res) => {
    try {
        const user = req.user;
        const cart = await Cart.findOne({ user: user });
        res.status(200).json({ data: cart, message: 'Cart fetch successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}
