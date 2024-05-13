import "./style.css";
import { useState } from "react";
import CommentItem from "../CommentItem";
import AddCommentModal from "../AddCommentModal";
const ProductView = ({
  product,
  onDelete,
  showModal,
  setProduct,
  comments,
  setComments,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };
  const handleDeleteProduct = () => {
    onDelete(product.id);
  };
  const handleEdit = () => {
    setProduct(product);
    showModal(true);
  };
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="product">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Fredmeyer_edit_1.jpg" />
      {/* <img src={product.imageUrl} alt="" /> */}

      <h2>{product.name}</h2>
      <p>Count: {product.count}</p>
      <p>Weight: {product.weight}</p>
      <h3>Comments</h3>
      <div>
        {comments.map((comment) => (
          <CommentItem
            comment={comment}
            onDelete={handleDeleteComment}
            key={comment.id}
          />
        ))}
      </div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDeleteProduct}>Delete</button>
        <button onClick={openAddModal}>Add Comment</button>
      </div>
      {showAddModal && (
        <div className="modal-content">
          <div className="modal-overlay">
            <AddCommentModal
              onClose={closeAddModal}
              onAdd={handleAddComment}
              productId={product.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductView;
