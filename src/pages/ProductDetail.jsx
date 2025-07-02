// src/pages/ProductDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../features/product/ProductData'; // 상품 배열 import
import './ProductDetail.css'; // 스타일 파일 생성해도 되고 생략 가능

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 :id 추출
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleAddToCart = () => {
    // 이 부분은 전역 상태나 context로 연결할 수 있음
    alert(`${product.name} 장바구니에 추가되었습니다.`);
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>

      <div className="product-detail-card">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>카테고리: {product.category}</p>
          <p>가격: {product.price.toLocaleString()} 엔</p>
          <p> {product.description}</p>
          <button onClick={handleAddToCart}>장바구니 담기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
