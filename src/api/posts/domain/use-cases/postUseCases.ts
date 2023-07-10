import { PostsRepositoryInterface } from '../interfaces/postsRepositoryInterface';
import { Post } from '../entities/post';

class PostsUseCases {
  constructor(private postRepository: PostsRepositoryInterface) {
    this.postRepository = postRepository;
  }

  async getAllPosts(): Promise<Post[] | null> {
    try {
      return await this.postRepository.getAllPosts();
    } catch (err) {
      throw new Error('error');
    }
  }
}

export default PostsUseCases;
