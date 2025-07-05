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

  if (!currentUser) return <p>ログインが必要です。</p>;

  const handleNameUpdate = () => {
    if (!newName.trim()) return alert('名前を入力してください。');
    const updatedUser = { ...currentUser, username: newName };
    updateUserInStorage(updatedUser);
    setIsEditingName(false);
    alert('名前が変更されました。');
  };

  const handlePasswordUpdate = () => {
    if (!newPassword.trim()) return alert('新しいパスワードを入力してください。');

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!passwordRegex.test(newPassword)) {
      alert('パスワードは8〜20文字で、英字、数字、特殊文字をすべて含む必要があります。');
      return;
    }

    const confirmed = window.confirm('本当にパスワードを変更しますか？');
    if (!confirmed) return;

    const updatedUser = { ...currentUser, password: newPassword };
    updateUserInStorage(updatedUser);
    updateUser(updatedUser); // context 상태 동기화

    setNewPassword('');
    setIsEditingPassword(false);
    alert('パスワードが変更されました。');
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
      alert('チャージ金額を正しく入力してください。');
      return;
    }
    chargeCredit(amount);
    alert(`${amount.toLocaleString()} 円がチャージされました。`);
    setChargeAmount('');
  };

  return (
    <div className="profile-page">
      <h2>マイページ</h2>

      <div className="profile-section">
        <label>ID:</label>
        <span>{currentUser.id}</span>
      </div>

      <div className="profile-section">
        <label>名前:</label>
        {isEditingName ? (
          <>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button onClick={handleNameUpdate}>保存</button>
            <button onClick={() => setIsEditingName(false)}>キャンセル</button>
          </>
        ) : (
          <>
            <span>{currentUser.username}</span>
            <button onClick={() => setIsEditingName(true)}>修正</button>
          </>
        )}
      </div>

      <div className="profile-section">
        <label>パスワード:</label>
        {isEditingPassword ? (
          <>
            <input
              type="text"
              placeholder="新しいパスワードを入力"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordUpdate}>保存</button>
            <button
              onClick={() => {
                setIsEditingPassword(false);
                setNewPassword('');
              }}
            >
              キャンセル
            </button>
          </>
        ) : (
          <>
            <span>{showPassword ? currentUser.password : '●●●●●●'}</span>
            <button onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? '隠す' : '表示'}
            </button>
            <button onClick={() => setIsEditingPassword(true)}>変更</button>
          </>
        )}
      </div>

      <div className="profile-section">
        <label>残りのクレジット:</label>
        <span>{credit.toLocaleString()} 円</span>
      </div>

      <div className="profile-section">
        <label>クレジットチャージ:</label>
        <input
          type="number"
          placeholder="チャージ金額を入力"
          value={chargeAmount}
          onChange={(e) => setChargeAmount(e.target.value)}
          min="1"
          step="100"
        />
        <button onClick={handleCharge}>チャージする</button>
      </div>

      {/* 주문 내역 컴포넌트 */}
      <PurchaseHistory />
    </div>
  );
};

export default ProfilePage;
