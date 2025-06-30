import React from 'react';
import { useCredit } from '../contexts/CreditContext';

const PurchaseHistory = () => {
  const { purchaseHistory } = useCredit();

  if (purchaseHistory.length === 0) {
    return <p>주문 내역이 없습니다.</p>;
  }

  return (
    <div className="purchase-history">
      <h3>주문 내역</h3>
      <ul>
        {purchaseHistory.map((record) => (
          <li key={record.id} style={{ marginBottom: '1rem' }}>
            <strong>{record.date}</strong><br />
            총 {record.totalAmount.toLocaleString()}엔<br />
            - {record.items.map((item) => (
              <span key={item.id}>
                {item.name} x {item.quantity}<br />
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
