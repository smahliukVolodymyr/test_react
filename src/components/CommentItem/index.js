import React from "react";
import "./style.css";
function CommentItem({ comment, onDelete }) {
  return (
    <div className="comment-container">
      <div>
        <p>{comment.description}</p>
        <p>{comment.date}</p>
      </div>
      <button onClick={() => onDelete(comment.id)}>X</button>
    </div>
  );
}

export default CommentItem;
