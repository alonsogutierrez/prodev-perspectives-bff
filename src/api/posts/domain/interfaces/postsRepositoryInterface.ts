import { PostData } from '../entities/post';

export interface PostsRepositoryInterface {
  getAllPosts(): Promise<Array<PostData> | null>;

  savePost(post: PostData): Promise<null>;

  getPostsById(postId: string): Promise<PostData | null>;

  updatePostById(postId: string, post: PostData): Promise<PostData | null>;
}
