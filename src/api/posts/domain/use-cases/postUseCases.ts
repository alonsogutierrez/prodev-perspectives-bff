import { v4 as uuidv4 } from 'uuid';
import { PostsRepositoryInterface } from '../interfaces/postsRepositoryInterface';
import { PostData } from '../entities/post';

const logger = console;

class PostsUseCases {
  constructor(private postRepository: PostsRepositoryInterface) {
    this.postRepository = postRepository;
  }

  async getAllPosts(): Promise<PostData[] | null> {
    try {
      const posts: PostData[] | null = await this.postRepository.getAllPosts();
      logger.info('Posts well obtained, total posts: ', posts?.length);
      return posts;
    } catch (error) {
      const message: string = 'Error trying to get posts';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  async getPostById(postId: string): Promise<PostData | null> {
    try {
      const post: PostData | null = await this.postRepository.getPostById(
        postId
      );
      logger.info('Post well obtained: ', post);
      return post;
    } catch (error) {
      const message: string = 'Error trying to get post by id';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  async getPostByUUID(postUUID: string): Promise<PostData | null> {
    try {
      const post: PostData | null = await this.postRepository.getPostByUUID(
        postUUID
      );
      logger.info('Post well obtained: ', post);
      return post;
    } catch (error) {
      const message: string = 'Error trying to get post by uuid';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  async savePost(postData: PostData): Promise<PostData | null> {
    try {
      const uuid = uuidv4();
      postData.uuid = uuid;
      const post: PostData = await this.postRepository.savePost(postData);
      return post;
    } catch (error) {
      const message: string = 'Error trying to save post';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  async updatePost(id: string, postData: PostData): Promise<string | null> {
    try {
      await this.postRepository.updatePostById(id, postData);
      return id;
    } catch (error) {
      const message: string = 'Error trying to update post';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }

  async deletePostById(id: string): Promise<string | null> {
    try {
      await this.postRepository.deletePostById(id);
      return id;
    } catch (error) {
      const message: string = 'Error trying to delete post';
      let errorMessage: string = '';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      logger.error(`${message}:`, errorMessage);
      throw new Error(`${message}: ${errorMessage}`);
    }
  }
}

export default PostsUseCases;
