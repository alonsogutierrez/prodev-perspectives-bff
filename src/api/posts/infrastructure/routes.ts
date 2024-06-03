import express, { Request, Response } from "express";
import { PostData } from "../domain/entities/post";
import PostsUseCases from "../domain/use-cases/postUseCases";
import { MongoDbPostRepository } from "./mongo-db/mongoDbPostRepository";
import { auth } from "./../../shared/auth_middleware";

const logger = console;

const postsRouter = express.Router();

// GET Posts
postsRouter.get("/posts", async (req: Request, res: Response) => {
  try {
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const posts: PostData[] | null = await postsUseCases.getAllPosts();

    res.send(posts);
  } catch (error) {
    res.status(500).send({
      error: "Cant get all posts, internal error",
    });
  }
});

// GET Post by id
postsRouter.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const postId: string = req.params.id;
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const post: PostData | null = await postsUseCases.getPostById(postId);
    if (!post) {
      res.status(404).send({
        error: "Post not found",
      });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({
      error: "Cant get post by id",
    });
  }
});

// GET Post by slug
postsRouter.get("/posts/slug/:slug", async (req: Request, res: Response) => {
  try {
    const postSlug: string = req.params.slug;
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const post: PostData | null = await postsUseCases.getPostBySlug(postSlug);

    res.send(post);
  } catch (error) {
    res.status(500).send({
      error: "Cant get post by slug",
    });
  }
});

// POST Post: Create post
postsRouter.post("/posts", auth, async (req: any, res: Response) => {
  try {
    const postData = req.body;
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const post: PostData | null = await postsUseCases.savePost(postData);

    res.status(201).send(post);
  } catch (error: any) {
    logger.error("Cant save all posts, internal error: ", error.message);
    res.status(500).send({
      error: "Cant save all posts, internal error",
    });
  }
});

// PUT Post: Update post
postsRouter.put("/posts/:id", auth, async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const postData = req.body;
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const postId: string | null = await postsUseCases.updatePost(id, postData);

    res.status(201).send(`Document well updated by id: ${postId}`);
  } catch (error: any) {
    res.status(500).send({
      error: `Cant update post, internal error: ${error.message}`,
    });
  }
});

// DELETE Post
postsRouter.delete("/posts/:id", auth, async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const postRepository: MongoDbPostRepository = new MongoDbPostRepository();
    const postsUseCases: PostsUseCases = new PostsUseCases(postRepository);
    const postId: string | null = await postsUseCases.deletePostById(id);

    res.status(201).send(`Document well deleted by id: ${postId}`);
  } catch (error: any) {
    res.status(500).send({
      error: `Cant delete post, internal error: ${error.message}`,
    });
  }
});

export default postsRouter;
