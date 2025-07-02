// features/product/ProductList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import './ProductGridOrList.css'; // 필요 시 스타일

const ProductGridOrList = ({ products, onAddToCart, onViewDetails, isGrid }) => {
  return (
    <div className={isGrid ? 'product-grid' : 'product-list'}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isGrid={isGrid}
        />
      ))}
    </div>
  );
};

export default ProductGridOrList;
