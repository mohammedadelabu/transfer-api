import mongoose from 'mongoose';
import Joi from 'joi';
// import { balance } from '../utils/interface'
import User from './userModel'
const Schema = mongoose.Schema
const balanceShema = new mongoose.Schema({
    accountNumber: {
        type: String,
        unique: true,
        length: 10,
        required: true,

    },
    balance : {
        type : Number,
        default: 5000,
        required: true,
        trim: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Registered ID required to create an account number',]
    }

},
    {
        timestamps: true
    }
)
const Balance = mongoose.model('balanceModel', balanceShema)
// const validateBalance = (balance:balance) => {
//     const schema = Joi.object({
//         accountNumber: Joi.number().required(),
//         balance: Joi.number().required(),
//         userId : Joi.number().required()
//     })
//     return schema.validate(balance)
// }
export default Balance;