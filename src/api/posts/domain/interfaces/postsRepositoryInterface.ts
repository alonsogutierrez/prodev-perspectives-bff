import { Post } from '../entities/post';

export interface PostsRepositoryInterface {
  getAllPosts(): Promise<Array<Post> | null>;

  savePost(post: Post): Promise<null>;

  getPostsById(postId: string): Promise<Post | null>;

  updatePostById(postId: string, post: Post): Promise<Post | null>;
}
