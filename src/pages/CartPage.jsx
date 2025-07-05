import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCredit } from '../contexts/CreditContext';
import './CartPage.css'; // 스타일은 나중에 추가



const CartPage = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  
  const { credit, deductCredit, addPurchase } = useCredit();//가상 크레딧

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const canPurchase = totalAmount <= credit;
  
const { isLoggedIn } = useAuth();
const navigate = useNavigate();

const handlePurchase = () => {
  if (!isLoggedIn) {
    alert('ログインが必要です。');
    navigate('/login'); // 로그인 페이지로 이동
    return;
  }

  if (!canPurchase) return;

  deductCredit(totalAmount);
  addPurchase(cartItems, totalAmount);
  clearCart();
  alert('ご注文が完了しました、ありがとうございます！ 🎉');
};

  return (
    <div className="cart-page">
      <h2>ショッピングカート</h2>
      {cartItems.length === 0 ? (
        <p>ショッピングカートは空です。</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width="80" />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <p>{item.price.toLocaleString()}円</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>合計: <strong>{totalAmount.toLocaleString()} 円</strong></p>
            <p>保有クレジット: <strong>{credit.toLocaleString()} 円</strong></p>
            {!canPurchase && (
              <p style={{ color: 'red' }}>
                ❌ クレジットが不足しているため、決済できません。
              </p>
            )}
          </div>

          <button className="clear-button" onClick={clearCart}>
            カートを空にする
          </button>

          <button
            className="checkout-button"
            disabled={!canPurchase}
            onClick={handlePurchase}
          >
            注文する
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
