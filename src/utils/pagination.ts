import express, { Request, Response, NextFunction} from 'express'
import Balance from '../model/balanceModel'
import Transactions from '../model/transactionModel'
const pagesBalance = async (req: Request, res: Response) => {
  try{
    let page = Number(req.params.pageno)
    let size = Number(5)
    if(!page) page = 1
    if(!size) size = 5
      const limit = size
      const skip = ( page - 1 ) * size
      const balance = await Balance.find().limit(limit).skip(skip)
      res.status(200).send(balance) 
  }catch (error){
      res.status(500).send({message: error || 'Error Occured'}) 
  }  
};
export default pagesBalance