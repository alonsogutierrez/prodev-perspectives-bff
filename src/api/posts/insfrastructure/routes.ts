import express, { Request, Response } from 'express';
import { Post } from '../domain/entities/post';
import PostsUseCases from '../domain/use-cases/postUseCases';
import MongoDbPostRepository from './mongo-db/mongoDbPostRepository';

const postsRouter = express.Router();

// GET Posts route
postsRouter.get('/posts', async (req: Request, res: Response) => {
  const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
  const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);

  // call to use case with post repository
  const posts: Post[] | null = await postsUseCases.getAllPosts();

  res.send(posts);
});

export default postsRouter;
