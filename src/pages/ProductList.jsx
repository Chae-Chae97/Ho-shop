import React, { useState, useMemo } from 'react';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import products from '../features/product/ProductData';
import ProductGridOrList from '../features/product/ProductGridOrList';
import { useCart } from '../contexts/CartContext';
import { LayoutGrid, List } from 'lucide-react';

const ProductList = ({ selectedCategory }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();

  const [isGrid, setIsGrid] = useState(true);
  const [sortType, setSortType] = useState('default');

  // 장바구니에 상품 추가
  const handleAddToCart = (product) => {
    /*
    if (!isLoggedIn) {
      alert('장바구니 이용을 위해 로그인해주세요.');
      navigate('/login');
      return;
    }
    */
    addToCart(product);
    alert(`${product.name} 장바구니에 추가되었습니다.`);
  };

  // 상품 상세 페이지 이동
  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  // 선택된 카테고리에 따라 필터링
  const filteredProducts =
    selectedCategory === '전체'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // 정렬 방식에 따른 상품 정렬
  const sortedProducts = useMemo(() => {
    const productsCopy = [...filteredProducts];
    switch (sortType) {
      case 'alphabet':
        return productsCopy.sort((a, b) => {
          const nameA = a.name || a.username || '';
          const nameB = b.name || b.username || '';
          return nameA.localeCompare(nameB, 'ko');
        });
      case 'priceAsc':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [filteredProducts, sortType]);

  return (
    <div className="home-page">
      <div className="view-toggle">
        <div className="buttons">
          <button
            onClick={() => setIsGrid(true)}
            className={isGrid ? 'active' : ''}
            title="그리드 보기"
          >
            <LayoutGrid size={30} />
          </button>
          <button
            onClick={() => setIsGrid(false)}
            className={!isGrid ? 'active' : ''}
            title="리스트 보기"
          >
            <List size={32} />
          </button>
        </div>

        <select
          className="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          aria-label="상품 정렬 방식 선택"
        >
          <option value="default">추천 순</option>
          <option value="alphabet">가나다 순</option>
          <option value="priceAsc">가격 낮은순</option>
          <option value="priceDesc">가격 높은순</option>
        </select>
      </div>

      <ProductGridOrList
        products={sortedProducts}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
        isGrid={isGrid}
      />
    </div>
  );
};

export default ProductList;
