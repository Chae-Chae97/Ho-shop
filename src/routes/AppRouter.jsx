// AppRouter.jsx
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import UserRegister from '../pages/Register';
import Layout from '../layouts/Layout';
import ProductDetail from '../pages/ProductDetail';
import CartPage from '../pages/CartPage';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const AppRouter = ({ users, setUsers, selectedCategory}) => {

   return (
    <Routes>
      <Route path="/" element={<ProductList selectedCategory={selectedCategory} />} />
      <Route path="/register" element={<UserRegister users={users} setUsers={setUsers} />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<Login/>} />
      <Route path='profile' element={<Profile/>} />
      {/* 다른 페이지들을 추가할 수 있습니다. */}
    </Routes>
  );
};


export default AppRouter;
