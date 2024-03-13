
import React from 'react';

const ProductItem = ({ product, onDelete }) => {
  return (
    <li>
      {product.name} - Rs {product.sellingPrice}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default ProductItem;
