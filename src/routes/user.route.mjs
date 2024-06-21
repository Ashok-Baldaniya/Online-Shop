import { Router } from 'express';
import { userRegistration, userLogin, userLogout } from '../controllers/user.controller.mjs';
import { verifyToken } from '../middleware/auth.mjs';

const router = Router();

router.route('/register').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);
export default router;