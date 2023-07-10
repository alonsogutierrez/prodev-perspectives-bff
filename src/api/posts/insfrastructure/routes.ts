import express, { Request, Response } from 'express';

const postsRouter = express.Router();

// GET Posts route
postsRouter.get('/posts', (req: Request, res: Response) => {
  res.send('Getting all posts!');
});

export default postsRouter;
