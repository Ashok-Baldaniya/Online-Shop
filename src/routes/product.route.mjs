import { Router } from 'express';
import { addProduct, updateProduct, deleteProduct, getProducts } from '../controllers/product.controller.mjs';
import { uploadMiddleware } from '../middleware/uploadMiddleware.mjs';
import { verifyToken } from '../middleware/auth.mjs';

const router = Router();

router.route('/add-product').post(uploadMiddleware, addProduct);
router.route('/update-product/:productId').put(verifyToken, updateProduct);
router.route('/delete-product/:productId').delete(verifyToken, deleteProduct);
router.route('/get-products').get(getProducts);

export default router;