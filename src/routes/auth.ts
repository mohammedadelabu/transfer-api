import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();
import authControl from '../controller/authController'
const { register, login, logout } = authControl;
router.route('/register').post(register)
router.route('/login').post(login);
router.route('/logout').get(logout);

export default router;
