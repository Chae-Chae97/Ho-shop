// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../features/product/ProductData'; // 상품 배열 import
import './ProductDetail.css'; // 스타일 파일 생성해도 되고 생략 가능
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 :id 추출
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>商品が見つかりません。</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} がショッピングカートに追加されました。`);
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>← 戻る</button>

      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>カテゴリー: {product.category}</p>
          <p>価格: {product.price.toLocaleString()} 円</p>
          <p> {product.description}</p>
          <button onClick={handleAddToCart}>カートに入れる</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
