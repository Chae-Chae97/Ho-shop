import React from 'react';
import { useCredit } from '../contexts/CreditContext';

const PurchaseHistory = () => {
  const { purchaseHistory } = useCredit();

  if (purchaseHistory.length === 0) {
    return <p>注文履歴がありません。</p>;
  }

  return (
    <div className="purchase-history">
      <h3>注文履歴</h3>
      <ul>
        {purchaseHistory.map((record) => (
          <li key={record.id} style={{ marginBottom: '1rem' }}>
            <strong>{record.date}</strong><br />
            合計 {record.totalAmount.toLocaleString()}円<br />
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
