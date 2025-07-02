// components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Header.css';
import ProductList from '../pages/ProductList';

const categories = ['전체', '위스키', '전통주', '리큐르'];

const Header = ({ selectedCategory, onCategorySelect }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();

 // const [selectedCategory, setSelectedCategory] = useState('전체');
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLogout = () => {
    const confirmed = window.confirm('정말 로그아웃 하시겠습니까?');
    if (!confirmed) return;
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleCategoryClick = (category) => {
      onCategorySelect(category);
      setMenuOpen(false);
      if(onCategorySelect){
        onCategorySelect(category);
      }
      navigate('/');
  };

  return (
    <header className="header">
      
      <div className="header-left">
        <Link to="/">
          <img src="/images/Hobar2.jpg" alt="로고" className="logo-image" />
        </Link>
      </div><h2>Ho's Liqueur Store </h2> 

      <div className="header-right">
        <Link to="/cart" className="cart-link">
          🛒
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/register" className="register-link">회원가입</Link>
            <Link to="/login" className="login-link">로그인</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="profile-link">
            <img src='/images/profile-icon.png' alt="내정보" className='profile-icon'/>
            </Link>
            <button onClick={handleLogout} className="logout-button">로그아웃</button>
          </>
        )}

        {/* 햄버거 아이콘 */}
        <button className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
          ☰
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="dropdown-menu">
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'category-button active' : 'category-button'}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
