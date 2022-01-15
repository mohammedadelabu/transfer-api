import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();
import balanceController from '../controller/balanceController'

const { getBalanceForParticularAccNumber, getBalanceForUser, getAllAccountsAndBalance} = balanceController

router.route('/:pageno').get(getAllAccountsAndBalance)
router.route('/:accountNumber').get(getBalanceForParticularAccNumber)
router.route('/user/:userId').get(getBalanceForUser)

export default router;
