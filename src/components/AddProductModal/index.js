import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const defaultItem = {
  id: 0,
  imageUrl: "",
  name: "",
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: "",
  comments: [],
};
const AddProductModal = ({ onClose, onAdd, item }) => {
  const [formData, setFormData] = useState(
    item.id ? item : { ...defaultItem, id: uuidv4() }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "width" || name === "height") {
      setFormData({
        ...formData,
        size: {
          ...formData.size,
          [name]: parseInt(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    if (
      formData.imageUrl &&
      formData.name &&
      formData.size.width &&
      formData.size.height &&
      formData.weight
    ) {
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
        <h2>Add Product/Edit Product</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="container-left">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label>Count:</label>
            <input
              type="number"
              name="count"
              value={formData.count}
              onChange={handleChange}
            />
          </div>
          <div className="container-right">
            <label>Width:</label>
            <input
              type="number"
              name="width"
              value={formData.size.width}
              onChange={handleChange}
            />
            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={formData.size.height}
              onChange={handleChange}
            />
            <label>Weight:</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="container-bottom">
            <button type="submit">Add Product</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
