import React, { createContext, useContext, useState } from 'react';

const CreditContext = createContext();

export const CreditProvider = ({ children }) => {
  const [credit, setCredit] = useState(50000); // 보유 크레딧
  const [purchaseHistory, setPurchaseHistory] = useState([]); // 🆕 결제 내역

  const chargeCredit = (amount) => {
    setCredit((prev) => prev + amount);
  };

  const deductCredit = (amount) => {
    setCredit((prev) => prev - amount);
  };

  //  결제 내역 추가하는 함수
  const addPurchase = (items, totalAmount) => {
    const newRecord = {
      id: Date.now(), // 고유 ID
      date: new Date().toLocaleString(), // 현재 시간 기록
      items,         // 상품 목록 전체 저장
      totalAmount,   // 결제한 총 금액
    };
    setPurchaseHistory((prev) => [newRecord, ...prev]); // 내역 쌓기
  };

  return (
    <CreditContext.Provider
      value={{
        credit,
        setCredit,
        chargeCredit,
        deductCredit,
        purchaseHistory,   // 다른 곳에서 내역 보기 가능
        addPurchase        // 다른 곳에서 내역 추가 가능
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () => useContext(CreditContext);
