import express from 'express';
import blogPostsController from './blog-posts.controller.js';

const router = express.Router();

router.route('/ping').get(blogPostsController.apiPing);
router.route('/posts').get(blogPostsController.apiBlogPosts);

export default router;
