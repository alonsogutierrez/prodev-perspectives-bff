import express, { Request, Response } from 'express';

const healthRouter = express.Router();

// GET Health route
healthRouter.get('/health', (req: Request, res: Response) => {
  res.send('Health ok!');
});

export default healthRouter;
