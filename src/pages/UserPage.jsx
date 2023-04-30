import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useUserStore } from "../store";
import Post from "../components/Post";
import PostForm from "../components/PostForm";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const history = useHistory();

  console.log("User ID in user page:", user?._id);

  const fetchUserPosts = useCallback(async () => {
    try {
      console.log("Fetching user posts...");
      const res = await fetch(`/api/users/${id}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
      } else {
        history.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, history]);

  useEffect(() => {
    console.log("User ID:", user?._id);
    if (user) {
      fetchUserPosts();
    }
  }, [user, fetchUserPosts]);

  const handleCreatePost = async (newPost) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newPost),
    });
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, data.post]);
      setIsCreatingPost(false);
    } else {
      alert("Unable to create post. Please try again.");
    }
  };

  const handleEditPost = async (postId, updatedPost) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedPost),
    });
    if (res.ok) {
      const data = await res.json();
      const updatedPosts = posts.map((post) =>
        post._id === data.post._id ? data.post : post
      );
      setPosts(updatedPosts);
    } else {
      alert("Unable to update post. Please try again.");
    }
  };

  const handleDeletePost = async (postId) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.ok) {
      setPosts(posts.filter((post) => post._id !== postId));
    } else {
      alert("Unable to delete post. Please try again.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">{user.username}'s Blog</h1>
      {user._id === id && (
        <button onClick={() => setIsCreatingPost(true)}>Create Post</button>
      )}
      {isCreatingPost && <PostForm onSubmit={handleCreatePost} />}
      <hr />
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6" key={post._id}>
            <Post
              post={post}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
