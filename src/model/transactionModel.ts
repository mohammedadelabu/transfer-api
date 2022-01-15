import mongoose from 'mongoose';
import Joi from 'joi';
import { transactions } from '../utils/interface'
import {uuid} from 'uuidv4'

 const transactionSchema = new mongoose.Schema({
    
    reference: {
        type: String,
        // unique: true,
        trim: true,
        default: uuid
    },
    senderAccount: {
        type: String,
        required: true,
        length: 10,
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Please enter amount']
    },
    receiverAccount: {
        type: String,
        required: true,
        length: 10,
        trim: true
    },
     transferDescription: {
        type: String,
        required: [true, 'Narration'],
        maxlength: 30,
    }
},
    { 
        timestamps: true 
    }
)
const Transactions = mongoose.model('transactionModel', transactionSchema)
export const validateTransaction = (transactions:transactions) => {
    const schema = Joi.object({
        // reference: Joi.string().min(4).max(30).required(),
        senderAccount: Joi.string().min(10).max(10).required(),
        amount: Joi.number().required(),
        receiverAccount: Joi.string().min(10).max(10).required(),
        transferDescription: Joi.string().min(4).max(30).required()
    })
    return schema.validate(transactions)
}
export default Transactions

