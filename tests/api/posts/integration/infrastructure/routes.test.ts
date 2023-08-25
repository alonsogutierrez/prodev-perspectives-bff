import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from './../../../../../src/app';

import postMock from './mocks/post-mock.json';

import { User } from '../../../../../src/api/users/insfrastructure/mongo-db/models/userSchema';
import { MongoDbPostRepository } from '../../../../../src/api/posts/insfrastructure/mongo-db/mongoDbPostRepository';

// Mock mongo db connection
jest.mock('../../../../../src/api/shared/insfrastructure/mongoDbClient');

// Mock the User
jest.mock(
  '../../../../../src/api/users/insfrastructure/mongo-db/models/userSchema'
);

// Mock MongoDbPostRepository
jest.mock(
  '../../../../../src/api/posts/insfrastructure/mongo-db/mongoDbPostRepository'
);

describe('Integration test to create post', () => {
  test('should return status code 200 when login is ok and post has all attrubytes in payload', async () => {
    // Mock the jwt.verify method to return the user ID
    const mockJwtVerify = jest.spyOn(jwt, 'verify').mockReturnValue({
      _id: 'test-user-id',
      iat: 1689996800,
      exp: 1690083200,
    } as any);

    (User.findOne as jest.Mock).mockResolvedValue({
      _id: 'test-user-id',
      name: 'testuser',
      email: 'test@example.com',
    });

    const mockSavePost = jest.fn();
    MongoDbPostRepository.prototype.savePost = mockSavePost;

    const res = await request(app)
      .post('/posts')
      .set('Authorization', 'Bearer valid_token')
      .send(postMock);

    expect(res.status).toBe(200);
    expect(mockJwtVerify).toHaveBeenCalledWith('valid_token', 'secret-key');
    expect(mockSavePost).toBeCalledTimes(1);
  });
});

describe('Integration test to get post', () => {
  test('should return status code 200 when db response ok', async () => {
    const mockGetAllPosts = jest.fn();
    MongoDbPostRepository.prototype.getAllPosts = mockGetAllPosts;
    const res = await request(app).get('/posts');

    expect(res.status).toBe(200);
    expect(mockGetAllPosts).toBeCalledTimes(1);
  });
});

describe('Integration test to get post by slug', () => {
  test('should return status code 200 when db response ok', async () => {
    const mockGetPostBySlug = jest.fn();
    MongoDbPostRepository.prototype.getPostBySlug = mockGetPostBySlug;
    const res = await request(app).get('/posts/mock-slug-post-title');

    expect(res.status).toBe(200);
    expect(mockGetPostBySlug).toBeCalledTimes(1);
  });
});

describe('Integration test to put post by slug', () => {
  test('should return status code 201 when db response ok', async () => {
    const mockPutPostBySlug = jest.fn();
    MongoDbPostRepository.prototype.updatePostById = mockPutPostBySlug;
    const res = await request(app).put('/posts/mock-slug-post-title');

    expect(res.status).toBe(201);
    expect(mockPutPostBySlug).toBeCalledTimes(1);
  });
});

describe('Integration test to delete post by slug', () => {
  test('should return status code 201 when db response ok', async () => {
    const mockDelPostBySlug = jest.fn();
    MongoDbPostRepository.prototype.deletePostById = mockDelPostBySlug;
    const res = await request(app).del('/posts/mock-slug-post-title');

    expect(res.status).toBe(201);
    expect(mockDelPostBySlug).toBeCalledTimes(1);
  });
});
