import React, { useState, useEffect } from 'react'; // ✅ useEffect 추가
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CreditProvider } from './contexts/CreditContext';
import Layout from './layouts/Layout';
import AppRouter from './routes/AppRouter';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // ✅ 새로고침 시 localStorage에서 users 복원
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(savedUsers);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <CreditProvider>
         <Router>
          <ScrollToTop />
            <Layout
             selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            >
            <AppRouter
               users={users}
               setUsers={setUsers}
               selectedCategory={selectedCategory}
            />
          </Layout>
         </Router>
        </CreditProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
