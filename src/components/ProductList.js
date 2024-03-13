import React, { useState, useEffect } from 'react';

import ProductInput from './ProductInput';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
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
    <div>
      <h1>Product List</h1>
      <ProductInput label="Product ID:" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <ProductInput label="Product Name:" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <ProductInput label="Selling Price:" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
      
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onDelete={() => handleDeleteProduct(product.id)} />
        ))}
      </ul>

      <div >Total Value Worth of Products: Rs {totalAmount}</div>
    </div>
  );
};

export default ProductList;
