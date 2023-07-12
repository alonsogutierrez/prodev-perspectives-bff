import { PostData } from '../../domain/entities/post';
import { PostsRepositoryInterface } from '../../domain/interfaces/postsRepositoryInterface';
import { Post } from './models/postSchema';

const logger = console;

class MongoDbPostRepository implements PostsRepositoryInterface {
  async getAllPosts(
    page: number = 0,
    limit: number = 10
  ): Promise<PostData[] | null> {
    const startTime = Date.now();
    const posts: Array<any> = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page);
    const duration = Date.now() - startTime;
    logger.info('ALL POSTS WELL OBTAINED FROM DB: ', duration);
    return new Promise((resolve, reject) => resolve(posts));
  }

  // TODO: Implement save post logic
  async savePost(postData: PostData): Promise<any> {
    const post = new Post(postData);
    await post.save();
    logger.info('POST DOCUMENT WELL SAVED INTO DB');
  }

  // TODO: Implement get post by id logic
  getPostsById(postId: string): Promise<PostData | null> {
    return new Promise((resolve, reject) => resolve(null));
  }

  // TODO: Implement update post by id logic
  updatePostById(postId: string, post: PostData): Promise<PostData | null> {
    return new Promise((resolve, reject) => resolve(null));
  }
}

export default MongoDbPostRepository;
