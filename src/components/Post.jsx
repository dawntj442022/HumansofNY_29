import React, { useState } from "react";
import PostForm from "./PostForm";

const Post = ({ post, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    onDelete(post._id);
  };

  const handleEdit = (updatedPost) => {
    onEdit(post._id, updatedPost);
    setIsEditing(false);
  };

  return (
    <div className="post">
      {isEditing ? (
        <PostForm post={post} onSubmit={handleEdit} />
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
