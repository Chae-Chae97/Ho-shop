import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';
import PurchaseHistory from '../components/PurchaseHistory';
import { useCredit } from '../contexts/CreditContext';

const ProfilePage = () => {
  const { currentUser, logout, updateUser } = useAuth();
  const { credit, chargeCredit } = useCredit();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.username || '');

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [chargeAmount, setChargeAmount] = useState('');

  if (!currentUser) return <p>로그인이 필요합니다.</p>;

  const handleNameUpdate = () => {
    if (!newName.trim()) return alert('이름을 입력해주세요.');
    const updatedUser = { ...currentUser, username: newName };
    updateUserInStorage(updatedUser);
    setIsEditingName(false);
    alert('이름이 수정되었습니다.');
  };

  const handlePasswordUpdate = () => {
    if (!newPassword.trim()) return alert('새 비밀번호를 입력해주세요.');

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!passwordRegex.test(newPassword)) {
      alert('비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 모두 포함해야 합니다.');
      return;
    }

    const confirmed = window.confirm('비밀번호를 정말 변경하시겠습니까?');
    if (!confirmed) return;

    const updatedUser = { ...currentUser, password: newPassword };
    updateUserInStorage(updatedUser);
    updateUser(updatedUser); // context 상태 동기화

    setNewPassword('');
    setIsEditingPassword(false);
    alert('비밀번호가 변경되었습니다.');
  };

  // 🔧 사용자 정보를 localStorage에 업데이트
  const updateUserInStorage = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const handleCharge = () => {
    const amount = parseInt(chargeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert('충전 금액을 올바르게 입력해주세요.');
      return;
    }
    chargeCredit(amount);
    alert(`${amount.toLocaleString()} 엔이 충전되었습니다.`);
    setChargeAmount('');
  };

  return (
    <div className="profile-page">
      <h2>내 정보</h2>

      <div className="profile-section">
        <label>아이디:</label>
        <span>{currentUser.id}</span>
      </div>

      <div className="profile-section">
        <label>이름:</label>
        {isEditingName ? (
          <>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button onClick={handleNameUpdate}>저장</button>
            <button onClick={() => setIsEditingName(false)}>취소</button>
          </>
        ) : (
          <>
            <span>{currentUser.username}</span>
            <button onClick={() => setIsEditingName(true)}>수정</button>
          </>
        )}
      </div>

      <div className="profile-section">
        <label>비밀번호:</label>
        {isEditingPassword ? (
          <>
            <input
              type="text"
              placeholder="새 비밀번호 입력"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordUpdate}>저장</button>
            <button
              onClick={() => {
                setIsEditingPassword(false);
                setNewPassword('');
              }}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <span>{showPassword ? currentUser.password : '●●●●●●'}</span>
            <button onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? '숨기기' : '보기'}
            </button>
            <button onClick={() => setIsEditingPassword(true)}>변경</button>
          </>
        )}
      </div>

      <div className="profile-section">
        <label>남은 크레딧:</label>
        <span>{credit.toLocaleString()} 엔</span>
      </div>

      <div className="profile-section">
        <label>크레딧 충전:</label>
        <input
          type="number"
          placeholder="충전 금액 입력"
          value={chargeAmount}
          onChange={(e) => setChargeAmount(e.target.value)}
          min="1"
          step="100"
        />
        <button onClick={handleCharge}>충전하기</button>
      </div>

      {/* 주문 내역 컴포넌트 */}
      <PurchaseHistory />
    </div>
  );
};

export default ProfilePage;
