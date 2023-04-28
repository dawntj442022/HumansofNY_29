require("dotenv").config();
require("./backend/config/db");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cors = require("cors");
const usersRoutes = require("./backend/routes/api/users");
const blogPostsRoutes = require("./backend/routes/api/blogPosts"); // Import the blogPosts routes

const app = express();

var corsOptions = {
  origin: "http://localhost:3002",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

app.use((req, res, next) => {
  res.locals.data = {};
  next();
});

// API routes

app.use("/api/users", usersRoutes);
app.use("/api/blogPosts", blogPostsRoutes); // Add this line to use the blogPosts routes

// "catch all" route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
