import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddCommentModal({ onClose, onAdd, productId }) {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    productId,
    description: "",
    date: "", //formatDate(),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function formatDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleSubmit = () => {
    const currentDate = formatDate();
    setFormData((prevState) => ({
      ...prevState,
      date: currentDate,
    }));
    console.log(formData);
    if (formData.description) {
      onAdd(formData);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          X
        </button>
        <h2>Add Comment</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label> Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="container-bottom">
            <button type="submit">Add Comment</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddCommentModal;
