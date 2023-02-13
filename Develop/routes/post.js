const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Create a new post
router.post("/", async (req, res) => {
  try {
    const post = new Post({
      user: req.body.user,
      caption: req.body.caption,
      imageURL: req.body.imageURL
    });
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific post by id
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Update a post by id
router.patch("/:id", getPost, async (req, res) => {
  if (req.body.caption != null) {
    res.post.caption = req.body.caption;
  }
  if (req.body.imageURL != null) {
    res.post.imageURL = req.body.imageURL;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post by id
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Deleted post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function for getting a post by id
async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.post = post;
  next();
}

module.exports = router;
