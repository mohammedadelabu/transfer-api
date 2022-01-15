import { Request, Response, NextFunction } from 'express'
import Balance from '../model/balanceModel'
import _ from 'lodash'
import Transactions from '../model/transactionModel'
require('dotenv').config()
// import findAll from '../interface/pagination'
import { validateTransaction } from '../model/transactionModel'
const makeTransferToAnotherAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validateTransaction(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const { senderAccount, receiverAccount, amount, transferDescription } = req.body
    let transactionDetails = await Transactions.create({ senderAccount, amount, receiverAccount, transferDescription}) 

    if (senderAccount === receiverAccount) return res.status(401).send('User cannot send money from an account into the same account')
    try {
      let senderInfo = await Balance.findOne({ accountNumber: senderAccount }).select('balance accountNumber')
      let receiverInfo = await Balance.findOne({ accountNumber: receiverAccount }).select('balance accountNumber')
       
      if (!senderInfo) return res.status(400).send('Sender Account does nor exists')
      if (!receiverInfo) return res.status(400).send('Receiver account does not exist')
      if (senderInfo.balance < amount) return res.status(400).send('Insufficient fund')
      senderInfo.balance = senderInfo.balance - (Number(amount))
      receiverInfo.balance = receiverInfo.balance + (Number(amount))
      let newSenderBalance = await senderInfo.save()
      let newReceiverBalance = await receiverInfo.save()

      
      res.status(200).json({sender:{'Account No.': senderAccount, 'Debit': amount, 'Balance': senderInfo.balance}, receiver:{'Account No.': receiverAccount, 'Credit': receiverInfo.balance, 'Balance': receiverAccount.balance}, transactionDetails})
    } catch (err) {
      return res.status(500).json(err)
    }
}
const getAllTransactionOfAUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const userAccount = await Balance.findOne({ accountNumber: req.params.accountNumber })
    if (!userAccount) return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one' })
    const filteredResult = _.pick(userAccount, ['userId', 'accountNumber', 'balance'])
    res.status(200).json({ status: 'success', data: filteredResult })
     res.status(200).json(userAccount)
   } catch (err) {
     return res.status(500).json(err)
    }
}

const getAllCreditTransactionOfAUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {
      let userTransact = await Transactions.find({ receiverAccount: req.params.accountNumber }).select('senderAccount amount')
      if (userTransact.length === 0) return res.status(400).send({ status: 'failed', message: 'Invalid Account Number. Enter a correct one'})
      res.status(200).json({ status: 'success', credit: userTransact })
      res.status(200).json(Transactions)
    } catch (err) {
      return res.status(500).json(err)
    }
}
const getAllDebitTransactionOfAUser = async (req: Request, res: Response, next: NextFunction) =>{
    try {
      let userTransact = await Transactions.find({senderAccount: req.params.accountNumber}).select('receiverAccount amount')
      console.log(userTransact)
      if (userTransact.length === 0) return res.status(400).send({status: 'failed', message: 'Invalid Account Number. Enter a correct one'})
      res.status(200).json({ status: 'success', debit: userTransact })
    } catch (err) {
      return res.status(500).json(err)
    }
  }


export default { makeTransferToAnotherAccount, getAllTransactionOfAUser, getAllCreditTransactionOfAUser, getAllDebitTransactionOfAUser}
