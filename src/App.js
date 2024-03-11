import React, { useState, useEffect } from 'react';
import './App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Update totalAmount whenever products change
    calculateTotalAmount();
  }, [products]);

  const calculateTotalAmount = () => {
    const total = products.reduce((acc, product) => acc + parseFloat(product.sellingPrice), 0);
    setTotalAmount(total.toFixed(2));
  };

  const handleAddProduct = () => {
    if (productId && productName && sellingPrice) {
      const newProduct = {
        id: productId,
        name: productName,
        sellingPrice: parseFloat(sellingPrice).toFixed(2),
      };

      setProducts([...products, newProduct]);

      // Clear input fields after adding a product
      setProductId('');
      setProductName('');
      setSellingPrice('');
    }
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div >
      <h1>Product List</h1>
      <div>
        <label>Product ID:</label>
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </div>
      <div>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>
      <div>
        <label>Selling Price:</label>
        <input type="text" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Rs {product.sellingPrice}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className='total'>Total Value Worth of Products: Rs {totalAmount}</div>
    </div>
  );
};

export default ProductList;