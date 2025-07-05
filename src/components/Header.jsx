// components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Header.css';
import ProductList from '../pages/ProductList';

const categories = ['全て', 'ウイスキー', '伝統酒', 'リキュール'];

const Header = ({ selectedCategory, onCategorySelect }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();

 // const [selectedCategory, setSelectedCategory] = useState('전체');
  const [menuOpen, setMenuOpen] = useState(false);

  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleLogout = () => {
    const confirmed = window.confirm('本当にログアウトしますか？');
    if (!confirmed) return;
    logout();
    alert('ログアウトしました。');
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
          <img src="/images/Hobar2.jpg" alt="ロゴ" className="logo-image" />
        </Link>
      </div><h2>Ho's Liqueur Store </h2> 

      <div className="header-right">
        <Link to="/cart" className="cart-link">
          🛒
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/register" className="register-link">会員登録</Link>
            <Link to="/login" className="login-link">ログイン</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/profile" className="profile-link">
            <img src='/images/profile-icon.png' alt="マイページ" className='profile-icon'/>
            </Link>
            <button onClick={handleLogout} className="logout-button">ログアウト</button>
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
