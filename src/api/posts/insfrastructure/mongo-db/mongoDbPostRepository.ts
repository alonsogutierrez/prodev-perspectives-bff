import { PostData, PostI } from '../../domain/entities/post';
import { PostsRepositoryInterface } from '../../domain/interfaces/postsRepositoryInterface';
import { Post } from './models/postSchema';

const logger = console;

class MongoDbPostRepository implements PostsRepositoryInterface {
  async getAllPosts(
    page: number = 0,
    limit: number = 10
  ): Promise<PostData[] | null> {
    const startTime = Date.now();
    const posts: Array<PostData> = await Post.find(
      {},
      // Projection fields
      [
        '_id',
        'postFormat',
        'title',
        'featureImg',
        'date',
        'category',
        'categoryName',
        'categoryImg',
        'postViews',
        'readTime',
        'authorName',
        'authorImg',
        'authorDesignation',
        'authorBio',
        'authorSocial',
        'tags',
        'content',
        'uuid',
        'slug',
      ],
      {}
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page);
    const duration = Date.now() - startTime;
    logger.info('ALL POSTS WELL OBTAINED FROM DB: ', duration);
    return new Promise((resolve, reject) => resolve(posts));
  }

  async savePost(postData: PostData): Promise<any> {
    const post = new Post(postData);
    await post.save();
    logger.info('POST DOCUMENT WELL SAVED INTO DB');
  }

  async getPostById(postId: string): Promise<PostData | null> {
    const startTime = Date.now();
    const posts: Array<any> = await Post.find({
      _id: postId,
    }).sort({ createdAt: -1 });
    const duration = Date.now() - startTime;
    logger.info('POST WELL OBTAINED FROM DB: ', duration);
    return new Promise((resolve, reject) => resolve(posts[0]));
  }

  async getPostByUUID(postUUID: string): Promise<PostData | null> {
    const startTime = Date.now();
    const posts: Array<any> = await Post.find({
      uuid: postUUID,
    }).sort({ createdAt: -1 });
    const duration = Date.now() - startTime;
    logger.info('POST WELL OBTAINED FROM DB: ', duration);
    return new Promise((resolve, reject) => resolve(posts[0]));
  }

  async updatePostById(postId: string, post: PostData): Promise<string> {
    await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    logger.info('PUT DOCUMENT WELL UPDATED INTO DB');
    return postId;
  }

  async deletePostById(postId: string): Promise<string> {
    await Post.findByIdAndDelete(postId);
    logger.info('DELETE DOCUMENT WELL DELETED INTO DB');
    return postId;
  }
}

export default MongoDbPostRepository;
