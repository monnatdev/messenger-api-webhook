import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);

  const originalSend = res.send;
  res.send = function (...args: any[]) {
    console.log('Response Body:', args[0]);
    return originalSend.apply(this, [args[0]]);
  };

  next();
};

export default logger;