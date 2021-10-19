import { describe } from 'jest-circus';
import request from 'supertest';
import app from '../index.js';

describe('Test posts path with no query parameters', () => {
  test('status code should be 400 with error message', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual(
      expect.stringContaining('Tags parameter is required')
    );
  });
});

describe('Test posts path with valid tags parameter', () => {
  test('status code should be 200 with posts returned', async () => {
    const response = await request(app).get('/api/posts?tags=history,tech');
    expect(response.statusCode).toBe(200);
    expect(response.body.posts[0].id).toEqual(1);
    expect(response.body.posts[response.body.posts.length - 1].id).toEqual(100);
  });
});

describe('Test posts path with invalid tags parameter', () => {
  test('status code should be 200 with no posts returned', async () => {
    const response = await request(app).get('/api/posts?tags=abc');
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toEqual(0);
  });
});

describe('Test posts path with valid tags parameter and valid sortBy', () => {
  test('status code should be 200 with posts sorted by likes', async () => {
    const response = await request(app).get(
      '/api/posts?tags=history,tech&sortBy=likes'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.posts[0].likes).toEqual(25);
    expect(response.body.posts[response.body.posts.length - 1].likes).toEqual(
      985
    );
  });
});

describe('Test posts path with valid tags parameter and invalid sortBy', () => {
  test('status code should be 400 with error message', async () => {
    const response = await request(app).get(
      '/api/posts?tags=history,tech&sortBy=desca'
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual(
      expect.stringContaining('sortBy parameter is invalid')
    );
  });
});

describe('Test posts path with valid tags parameter, valid sortBy and valid direction', () => {
  test('status code should be 200 with posts sorted by likes in desc order', async () => {
    const response = await request(app).get(
      '/api/posts?tags=history,tech&sortBy=likes&direction=desc'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.posts[0].likes).toEqual(985);
    expect(response.body.posts[response.body.posts.length - 1].likes).toEqual(
      25
    );
  });
});

describe('Test posts path with valid tags parameter, valid sortBy and invalid direction', () => {
  test('status code should be 200 with posts sorted by likes in desc order', async () => {
    const response = await request(app).get(
      '/api/posts?tags=history,tech&sortBy=likes&direction=desca'
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toEqual(
      expect.stringContaining('direction parameter is invalid')
    );
  });
});
