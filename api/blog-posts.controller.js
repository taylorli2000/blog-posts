import got from "got";
import NodeCache from "node-cache";

const api = "https://api.hatchways.io/assessment/blog/posts";
const validDirection = ["desc", "asc"];
const myCache = new NodeCache({ stdTTL: 3600 });
const validSortBy = ["id", "reads", "likes", "popularity"];

export default class blogPostsController {
  static apiGetPing(req, res, next) {
    res.status(200).json({ success: true });
  }

  static async apiGetBlogPosts(req, res, next) {
    try {
      const sortBy = req.query.sortBy || "id";
      const direction = req.query.direction || "asc";
      if (!req.query.tags) throw new Error("Tags parameter is required");
      if (!validSortBy.includes(sortBy))
        throw new Error("sortBy parameter is invalid");
      if (!validDirection.includes(direction))
        throw new Error("direction parameter is invalid");
      const posts = (
        await Promise.all(
          req.query.tags.split(",").map(async (tag) => {
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
      const seen = new Set();
      const sortedPosts = posts
        .filter((post) => {
          const duplicate = seen.has(post.id);
          seen.add(post.id);
          return !duplicate;
        })
        .sort((a, b) => a[sortBy] - b[sortBy]);
      if (direction === "desc") sortedPosts.reverse();
      res.status(200).json({ posts: sortedPosts });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
