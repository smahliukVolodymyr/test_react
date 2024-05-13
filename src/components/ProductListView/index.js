import React, { useState } from "react";
import ProductView from "../ProductView";
import AddProductModal from "../AddProductModal";
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
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState("alphabetical");
  const [showAddModal, setShowAddModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const handleAddProduct = (newProduct) => {
    if (productToEdit) {
      setProducts(
        products.map((p) => (p.id === productToEdit.id ? newProduct : p))
      );
      setProductToEdit(null);
    } else {
      setProducts([...products, newProduct]);
    }
  };
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const sortByAlphabetical = (products) => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortByCount = (products) => {
    return [...products].sort((a, b) => a.count - b.count);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const getSortedProducts = () => {
    if (sortBy === "alphabetical") {
      return sortByAlphabetical(products);
    } else if (sortBy === "count") {
      return sortByCount(products);
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <div className="productList-container">
      <h1>Product List</h1>
      <button onClick={openAddModal}>+</button>
      <div className="sort-container">
        <label>Sort By: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="alphabetical">Alphabetical</option>
          <option value="count">Count</option>
        </select>
      </div>
      <div className="productList-list">
        {getSortedProducts().map((product) => (
          <ProductView
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            showModal={setShowAddModal}
            setProduct={setProductToEdit}
            comments={comments}
            setComments={setComments}
          />
        ))}
      </div>
      {showAddModal && (
        <div className="modal-content">
          <div className="modal-overlay">
            <AddProductModal
              onClose={closeAddModal}
              onAdd={handleAddProduct}
              item={productToEdit || defaultItem}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductList;
