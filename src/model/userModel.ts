import mongoose from 'mongoose'
import Joi from 'joi'
import {user} from  '../utils/interface'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {NextFunction} from 'express'

// export interface IUser extends mongoose.Document {
//   firstName: string;
//   lastName: string;
//   DOB: Date;
//   email: string;
//   password: string;
// //   comparePasswords(
// //     candidatePassword: string,
// //     next: (err: Error | null, same: boolean | null) => void
// //   ): void;
//   phoneNumber: number;
// }
const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required:[true, 'Please provide your first name']
    },
    lastName: {
        type: String,
        required:[true, 'Please provide your last name']
    },
    DOB: {
        type: Date,
        required:[true, 'Please provide your Date of Birth']
    },
    email: {
        type: String,
        // unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
        required:[true, 'please provide a unique email']
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        match: [
        /((^090)([23589]))|((^070)([1-9]))|((^080)([2-9]))|((^081)([0-9]))(\d{7})/,
        'Please enter 11 digits valid Nigeria mobile number',
        ],
        required:[true, 'please provide your phone number'],
    }

},
    {
        timestamps: true
    }
)
const User = mongoose.model('userModel', userSchema)
export const validateUser = (user:user) => {
    const schema = Joi.object({
        firstName : Joi.string().max(30).required(),
        lastName: Joi.string().min(4).max(30).required(),
        DOB: Joi.date().iso().required(),
        email: Joi.string().email().required(),
        phoneNumber : Joi.string().min(11).max(11).required(),
        password: Joi.string().min(6).max(200).required()
    })
    return schema.validate(user)
}
// //hash password
// userSchema.pre("save", async function (next:NextFunction) {
//     const salt: any = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })
// //bcrypt compare password
userSchema.methods.comparePassword = async function (candidatePassword:string){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      fullname: this.fullname,
      role: this.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// export function validateSignUp(user: UserType) {
//   const schema = joi.object({
//     firstName: joi.string().min(3).max(20).required(),
//     lastName: joi.string().min(3).max(20).required(),
//     dateOfBirth: joi.string().required(),
//     email: joi.string().email().required(),
//     phoneNumber: joi.string().min(11).max(11).required(),
//     password: joi.string().min(5).max(200).required(),
//   })
//   return schema.validate(user)
// }
export function validateUserLogin(user: user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(70).required(),
  })
  return schema.validate(user)
}
export function validateCreateAccount(user: user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  })
  return schema.validate(user)
}



export default User;
