import React, { useEffect } from "react";
import { useZustand } from "../store";
import { useParams, Link } from "react-router-dom";
import { getMyPosts } from "../api";
import Post from "./Post";

const UserPosts = () => {
  const { id } = useParams();
  const { user, posts, setPosts } = useZustand((state) => ({
    user: state.user,
    setUser: state.setUser,
    posts: state.posts,
    setPosts: state.setPosts,
  }));

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getMyPosts(id);
      setPosts(data);
    };
    fetchPosts();
  }, [id, setPosts]);

  return (
    <div>
      <h2>{user && `${user.firstName}'s Posts`}</h2>
      <Link to="/">Back to Home</Link>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
