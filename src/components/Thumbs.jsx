import React, { useState } from "react";

const Thumbs = ({ postId, likes, dislikes, handleLike, handleDislike }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      handleLike(postId);
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislikeClick = () => {
    if (!disliked) {
      handleDislike(postId);
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick}>
        <span role="img" aria-label="thumbs-up">
          👍
        </span>
      </button>
      <span>{likes}</span>
      <button onClick={handleDislikeClick}>
        <span role="img" aria-label="thumbs-down">
          👎
        </span>
      </button>
      <span>{dislikes}</span>
    </div>
  );
};

export default Thumbs;
