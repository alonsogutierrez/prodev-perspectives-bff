import { PostData } from '../entities/post';

export interface PostsRepositoryInterface {
  getAllPosts(): Promise<Array<PostData> | null>;

  savePost(post: PostData): Promise<any>;

  getPostById(postId: string): Promise<PostData | null>;

  updatePostById(postId: string, post: PostData): Promise<string>;

  deletePostById(postId: string): Promise<string>;
}
