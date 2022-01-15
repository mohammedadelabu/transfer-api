import express, {Request, Response, NextFunction} from 'express'
const router = express.Router();
import transactionController from '../controller/transactionController'
const  { makeTransferToAnotherAccount, getAllTransactionOfAUser, getAllCreditTransactionOfAUser, getAllDebitTransactionOfAUser} = transactionController;
router.route('/').post(makeTransferToAnotherAccount)
router.route('/:accountNumber').get(getAllTransactionOfAUser)
router.route('/debit/:accountNumber').get(getAllDebitTransactionOfAUser)
router.route('/credit/:accountNumber').get(getAllCreditTransactionOfAUser)
export default router;
