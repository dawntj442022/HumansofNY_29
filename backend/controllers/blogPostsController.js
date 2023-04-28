const { ObjectID } = require("mongodb");
const BlogPost = require("../../models/blogPost");

module.exports = {
  async create(req, res) {
    try {
      const newPost = new BlogPost({
        ...req.body,
        author: ObjectID(req.user._id),
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: "Error creating blog post." });
    }
  },
  async getAll(req, res) {
    try {
      const blogPosts = await BlogPost.find().populate("author", "name");
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving blog posts." });
    }
  },

  async getOne(req, res) {
    try {
      const blogPost = await BlogPost.findById(req.params.id).populate(
        "author",
        "name"
      );
      if (!blogPost) {
        res.status(404).json({ message: "Blog post not found." });
      } else {
        res.json(blogPost);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error retrieving blog post." });
    }
  },

  async update(req, res) {
    try {
      const updatedPost = await BlogPost.findOneAndUpdate(
        { _id: req.params.id, author: ObjectID(req.user._id) },
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedPost) {
        res
          .status(404)
          .json({ message: "Blog post not found or not authorized." });
      } else {
        res.json(updatedPost);
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating blog post." });
    }
  },

  async delete(req, res) {
    try {
      const deletedPost = await BlogPost.findOneAndDelete({
        _id: req.params.id,
        author: ObjectID(req.user._id),
      });
      if (!deletedPost) {
        res
          .status(404)
          .json({ message: "Blog post not found or not authorized." });
      } else {
        res.json({ message: "Blog post deleted.", _id: deletedPost._id });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting blog post." });
    }
  },

  async like(req, res) {
    try {
      const blogPost = await BlogPost.findById(req.params.id);
      if (!blogPost) {
        res.status(404).json({ message: "Blog post not found." });
      } else {
        const { isLiked } = blogPost.likes.find(
          (like) => like.user.toString() === req.user._id.toString()
        ) || { isLiked: false };
        blogPost.likes = blogPost.likes.filter(
          (like) => like.user.toString() !== req.user._id.toString()
        );
        if (!isLiked) {
          blogPost.likes.push({ user: ObjectID(req.user._id), isLiked: true });
        }
        const savedPost = await blogPost.save();
        res.json(savedPost);
      }
    } catch (error) {
      res.status(500).json({ message: "Error liking blog post." });
    }
  },
};
