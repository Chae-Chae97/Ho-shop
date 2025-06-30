import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 장바구니에 상품 추가 (중복 시 수량 증가)
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);

          if (existingIndex !== -1) {
      return prev.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // 상품 개별 삭제
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // 장바구니 비우기
  const clearCart = () => {
    setCartItems([]);
  };

  // 수량 1 증가
  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 수량 1 감소, 수량이 1일 경우 항목 제거
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            // 수량 1이면 삭제
            return acc;
          } else {
            // 수량 감소
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          }
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      increaseQuantity,
      decreaseQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
