import express, { Request, Response } from 'express'
const error404 = (req:Request, res:Response) => res.status(404).send('Not Found')

export default error404;