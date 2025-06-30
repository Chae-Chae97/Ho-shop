// features/product/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // 필요 시 스타일 지정

const ProductCard = ({ product, onAddToCart, onViewDetails, isGrid }) => {
  return (
    <div className={`product-card ${isGrid ? 'grid' : 'list'}`}>
      <img
        src={product.image}
        alt={product.name}
        onClick={() => onViewDetails(product.id)}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString()} 엔</p>
        <button 
        className={isGrid ? 'cart-button grid' : 'cart-button list'}
        onClick={() => onAddToCart(product)}>장바구니 담기</button>
      </div>
    </div>
  );
};

export default ProductCard;
