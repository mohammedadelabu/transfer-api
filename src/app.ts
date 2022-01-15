import {connectDB, connectTestDB} from './database/connect'
import createError from 'http-errors';
import express, { Request, Response, NextFunction } from "express";
import path from 'path'
import cookieParser from 'cookie-parser';
import logger from 'morgan';

//extra security packages
import helmet from 'helmet'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'

import indexRouter from './routes/index';
// import usersRouter from './routes/users';
import balanceRouter from './routes/balance'
import authRouter from './routes/auth'
// import error404 from './errors/error404'
// import errorHandler from './middleware/errorHandler'
import dotenv from 'dotenv'
import authenticationUser from './middleware/auth'
const app = express();

dotenv.config();

//extra security

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())
app.use(helmet())
// app.use(xss())
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100
}))

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');



console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'test'){
  connectTestDB()
}
else{
  connectDB()
}
app.get('/', (req:any,res:any)=>{
  res.send({data:'api working'})
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/balance', authenticationUser, balanceRouter)
app.use('/api/v1/transactions', authenticationUser, indexRouter);
// app.use('api/v1/users', authenticationUser, usersRouter);

//  app.use('*', error404)
// app.use(error404)
// app.use(errorHandler)

// catch 404 and forward to error handler
app.use(function(req:Request, res:Response, next:NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




export default app;
