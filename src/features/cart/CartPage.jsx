import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useCredit } from '../../contexts/CreditContext';
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
    alert('로그인이 필요합니다.');
    navigate('/login'); // 로그인 페이지로 이동
    return;
  }

  if (!canPurchase) return;

  deductCredit(totalAmount);
  addPurchase(cartItems, totalAmount);
  clearCart();
  alert('주문이 완료되었습니다, 감사합니다! 🎉');
};

  return (
    <div className="cart-page">
      <h2>장바구니</h2>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} width="80" />
                <div className="cart-item-info">
                  <strong>{item.name}</strong>
                  <p>{item.price.toLocaleString()}엔</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>총 합계: <strong>{totalAmount.toLocaleString()} 엔</strong></p>
            <p>보유 크레딧: <strong>{credit.toLocaleString()} 엔</strong></p>
            {!canPurchase && (
              <p style={{ color: 'red' }}>
                ❌ 크레딧이 부족하여 결제할 수 없습니다.
              </p>
            )}
          </div>

          <button className="clear-button" onClick={clearCart}>
            장바구니 비우기
          </button>

          <button
            className="checkout-button"
            disabled={!canPurchase}
            onClick={handlePurchase}
          >
            주문하기
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
