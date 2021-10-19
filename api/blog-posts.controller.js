import got from 'got';
import NodeCache from 'node-cache';

const api = 'https://api.hatchways.io/assessment/blog/posts';
const validDirection = ['desc', 'asc'];
const myCache = new NodeCache({ stdTTL: 3600 });
const validSortBy = ['id', 'reads', 'likes', 'popularity'];

export default class blogPostsController {
  static apiPing = (req, res, next) => {
    res.status(200).json({ success: true });
  };

  static apiBlogPosts = async (req, res, next) => {
    try {
      const tags = req.query.tags;
      const sortBy = req.query.sortBy || 'id';
      const direction = req.query.direction || 'asc';
      if (!tags) {
        throw new Error('Tags parameter is required');
      }
      if (!validSortBy.includes(sortBy)) {
        throw new Error('sortBy parameter is invalid');
      }
      if (!validDirection.includes(direction)) {
        throw new Error('direction parameter is invalid');
      }
      const posts = await this.getBlogPosts(tags);
      const sortedPosts = this.sortBlogPosts(
        this.filterBlogPosts(posts),
        sortBy,
        direction
      );
      res.status(200).json({ posts: sortedPosts });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  static getBlogPosts = async (tags) => {
    return (
      await Promise.all(
        tags.split(',').map(async (tag) => {
          const posts = myCache.get(tag);
          if (posts === undefined) {
            const data = await got.get(`${api}?tag=${tag}`).json();
            myCache.set(tag, data.posts);
            return data.posts;
          }
          return posts;
        })
      )
    ).flat();
  };

  static filterBlogPosts = (posts) => {
    const seen = new Set();
    const filteredPosts = posts.filter((post) => {
      const duplicate = seen.has(post.id);
      seen.add(post.id);
      return !duplicate;
    });
    return filteredPosts;
  };

  static sortBlogPosts = (posts, sortBy, direction) => {
    const sortedPosts = posts.sort((a, b) => a[sortBy] - b[sortBy]);
    if (direction === 'desc') {
      return sortedPosts.reverse();
    }
    return sortedPosts;
  };
}
