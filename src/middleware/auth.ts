import jwt from 'jsonwebtoken'
// import { UnauthenticatedError from '../errors'
import express, {Request, Response, NextFunction} from 'express'
import User from '../model/userModel'
const authenticationMiddleware = async (req:any, res:Response, next:NextFunction) => {
    const authHeader:any = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        // throw new UnauthenticatedError ('No token provided') 
        res.json('Not Authorized')
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded:any = jwt.verify(token, process.env.JWT_SEC as string)
        const user: any = User.findById(decoded._id).select('-password')
        req.user = user;
        const {id, firstName}:any = decoded;
        req.user = { id, firstName }
        next()
    }
    catch(error){
        // throw new UnauthenticatedError('Not Authorized')
        return res.status(500).json(error)
    }
}
export default authenticationMiddleware;