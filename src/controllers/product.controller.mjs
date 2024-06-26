import Product from '../models/Product.model.mjs';

export const addProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create(data);
        res.status(201).json({ data: product, message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const updateProduct = async (req, res) => {
    try {
        const params = req.params;
        const requestBody = req.body;

        const updatedProduct = await Product.findByIdAndUpdate({ _id: params.productId }, requestBody);
        res.status(200).json({ data: updatedProduct, message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const params = req.params;

        await Product.findByIdAndDelete({ _id: params.productId });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getProducts = async (req, res) => {
    try {
        const queryParams = req.query;
        if (!queryParams.productId) {
            const products = await Product.find();
            return res.status(200).json({ data: products, message: 'All products fetch successfully' });
        }

        const product = await Product.findById(queryParams.productId);
        res.status(200).json({ data: product, message: 'Product fetch successfully' });
    } catch (error) {
        res.status(500).json(error.message);
    }
}
