import { PostData, PostI } from "../../domain/entities/post";
import { PostsRepositoryInterface } from "../../domain/interfaces/postsRepositoryInterface";
import { Post } from "./models/postSchema";

const logger = console;

export class MongoDbPostRepository implements PostsRepositoryInterface {
  async getAllPosts(
    page: number = 0,
    limit: number = 5
  ): Promise<PostData[] | null> {
    const startTime = Date.now();
    const posts: Array<PostData> = await Post.find(
      {},
      // Projection fields
      [
        "_id",
        "postFormat",
        "title",
        "featureImg",
        "date",
        "category",
        "categoryName",
        "categoryImg",
        "postViews",
        "readTime",
        "authorName",
        "authorImg",
        "authorDesignation",
        "authorBio",
        "authorSocial",
        "tags",
        "uuid",
        "slug",
      ],
      {}
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(page);
    const duration = Date.now() - startTime;
    return new Promise((resolve, reject) => resolve(posts));
  }

  async savePost(postData: PostData): Promise<any> {
    const post = new Post(postData);
    await post.save();
  }

  async getPostById(postId: string): Promise<PostData | null> {
    const post: any = await Post.findById(postId);
    return new Promise((resolve, reject) => resolve(post));
  }

  async getPostByUUID(postUUID: string): Promise<PostData | null> {
    const posts: Array<any> = await Post.find({
      uuid: postUUID,
    }).sort({ createdAt: -1 });
    return new Promise((resolve, reject) => resolve(posts[0]));
  }

  async getPostBySlug(postSlug: string): Promise<PostData | null> {
    const startTime = Date.now();
    const posts: Array<any> = await Post.find(
      {
        slug: postSlug,
      },
      [
        "_id",
        "postFormat",
        "title",
        "featureImg",
        "date",
        "category",
        "categoryName",
        "categoryImg",
        "postViews",
        "readTime",
        "authorName",
        "authorImg",
        "authorDesignation",
        "authorBio",
        "authorSocial",
        "tags",
        "uuid",
        "content",
        "slug",
      ],
      {}
    ).sort({ createdAt: -1 });
    const duration = Date.now() - startTime;
    return new Promise((resolve, reject) => resolve(posts[0]));
  }

  async updatePostById(postId: string, post: PostData): Promise<string> {
    await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    return postId;
  }

  async deletePostById(postId: string): Promise<string> {
    await Post.findByIdAndDelete(postId);
    return postId;
  }
}
