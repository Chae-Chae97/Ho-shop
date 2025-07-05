import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !password) {
      alert('IDとパスワードを両方入力してください。');
      return;
    }

    // 🔍 로컬스토리지에서 유저 목록 조회
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.id === id && u.password === password);

    if (!user) {
      alert('IDまたはパスワードを確認してください。');
      return;
    }

    // ✅ 로그인 성공 처리
    login(user); // AuthContext에 사용자 저장
    localStorage.setItem('token', 'fake-token'); // (더미 토큰 저장)
    alert('ログインしました。');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-input">
        <span className="icon">👤</span>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div className="login-input">
        <span className="icon">🔒</span>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
