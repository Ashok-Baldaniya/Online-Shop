import { Router } from 'express';
import { createCart, updateCart, deleteCart, getCarts } from '../controllers/cart.controller.mjs';
import { verifyToken } from '../middleware/auth.mjs';

const router = Router();

router.route('/create-cart').post(verifyToken, createCart);
router.route('/update-cart/:cartId').put(verifyToken, updateCart);
router.route('/delete-cart/:cartId').delete(deleteCart);
router.route('/get-cart').get(verifyToken, getCarts);

export default router;