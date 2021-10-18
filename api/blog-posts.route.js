import express from "express";
import blogPostsController from "./blog-posts.controller.js";

const router = express.Router();

router.route("/ping").get(blogPostsController.apiGetPing);
router.route("/posts").get(blogPostsController.apiGetBlogPosts);

export default router;
