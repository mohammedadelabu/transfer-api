import express, { NextFunction, Response, Request } from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.render('home');
}); 

export default router;
