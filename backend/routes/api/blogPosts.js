const express = require("express");
const router = express.Router();
const blogPostsController = require("../../controllers/api/blogPostsController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const checkToken = require("../../config/checkToken");

// Route to get all blog posts
router.get("/", blogPostsController.getAll);

// Route to get one blog post by ID
router.get("/:id", blogPostsController.getOne);

// Route to create a new blog post
router.post("/", checkToken, ensureLoggedIn, async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user._id; // get the id of the logged in user
    const blogPost = await blogPostsController.create({
      title,
      content,
      author,
    });
    res.status(201).json(blogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update an existing blog post by ID
router.put("/:id", checkToken, ensureLoggedIn, blogPostsController.update);

// Route to delete a blog post by ID
router.delete("/:id", checkToken, ensureLoggedIn, blogPostsController.delete);

module.exports = router;
