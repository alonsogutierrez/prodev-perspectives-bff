import express, { Request, Response } from 'express';
import { PostData } from '../domain/entities/post';
import PostsUseCases from '../domain/use-cases/postUseCases';
import MongoDbPostRepository from './mongo-db/mongoDbPostRepository';

const postsRouter = express.Router();

// GET Posts
postsRouter.get('/posts', async (req: Request, res: Response) => {
  try {
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const posts: PostData[] | null = await postsUseCases.getAllPosts();

    res.send(posts);
  } catch (error) {
    res.status(500).send({
      error: 'Cant get all posts, internal error',
    });
  }
});

// POST Posts
postsRouter.post('/posts', async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const post: PostData | null = await postsUseCases.savePost(postData);

    res.send(post);
  } catch (error: any) {
    res.status(500).send({
      error: 'Cant save all posts, internal error',
    });
  }
});

export default postsRouter;
