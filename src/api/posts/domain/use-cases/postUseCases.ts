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
}

export default PostsUseCases;
