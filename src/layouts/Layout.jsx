import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children, selectedCategory, onCategorySelect }) => {
  return (
    <>
      <Header 
      selectedCategory={selectedCategory} 
      onCategorySelect={onCategorySelect} 
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
