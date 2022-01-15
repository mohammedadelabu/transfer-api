// import express, { Request, Response, NextFunction } from 'express'
// // import {CustomAPIError} from '../errors'
// import {StatusCodes} from 'http-status-codes'
// const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
//     // if (err instanceof CustomAPIError){
//     //     return res.status(err.statusCode).json({msg: err.message})
//     // }
//     if(err.name === 'CastError') {
//         customError.msg = `No item with the the id: ${err.value}`
//         customError.statusCode = 404
//     }
//     if((err.code && err.code) === 11000) {
//         customError.msg = `Duplicate values entered for ${Object.keys(err.keyValue)} field, please enter another`
//         customError.statusCode = 400;
//     };
//     return res.status(StatusCodes.INTERNAL_SEVER_ERROR).send('something is wrong')
// }
// export default errorHandler;