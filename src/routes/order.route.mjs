import { Router } from 'express';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../controllers/order.controller.mjs';
import { verifyToken } from '../middleware/auth.mjs';

const router = Router();

router.route('/create-order').post(verifyToken, addOrder);
router.route('/update-order/:orderId').put(verifyToken, updateOrder);
router.route('/delete-order/:orderId').delete(verifyToken, deleteOrder);
router.route('/get-order').get(verifyToken, getOrders);

export default router;