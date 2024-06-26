import { Router } from 'express';
import { getOrders, addOrder, updateOrder, deleteOrder } from '../controllers/order.controller.mjs';
import { verifyToken } from '../middleware/auth.mjs';

const router = Router();

router.route('/create-order').post(addOrder);
router.route('/update-order').put(updateOrder);
router.route('/delete-order').delete(deleteOrder);
router.route('/get-orders').get(getOrders);

export default router;