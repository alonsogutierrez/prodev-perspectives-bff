import mongoose from 'mongoose';

import { Post } from '../../domain/entities/post';
import { PostsRepositoryInterface } from '../../domain/interfaces/postsRepositoryInterface';

const logger = console;

const MONGO_DB_USER: string = process.env.MONGO_DB_URI!;
const MONGO_DB_PASSWORD: string = process.env.MONGO_DB_PASSWORD!;
const MONGO_DB_PATH: string = process.env.MONGO_DB_PATH!;

class MongoDbPostRepository implements PostsRepositoryInterface {
  async connectDB() {
    try {
      await mongoose.connect(
        `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}${MONGO_DB_PATH}`
      );
      logger.info('Well connected with MongoDB');
    } catch (error) {
      const message: string = 'Error connecting with MongoDB';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  getAllPosts(): Promise<Post[] | null> {
    return new Promise((resolve, reject) => resolve(null));
  }

  savePost(post: Post): Promise<null> {
    return new Promise((resolve, reject) => resolve(null));
  }

  getPostsById(postId: string): Promise<Post | null> {
    return new Promise((resolve, reject) => resolve(null));
  }

  updatePostById(postId: string, post: Post): Promise<Post | null> {
    return new Promise((resolve, reject) => resolve(null));
  }
}

export default MongoDbPostRepository;
