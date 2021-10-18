import express from "express";
import blogPosts from "./api/blog-posts.route.js";

const app = express();

app.use(express.json());

app.use("/api", blogPosts);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
