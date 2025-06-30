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
      alert('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }

    // 🔍 로컬스토리지에서 유저 목록 조회
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.id === id && u.password === password);

    if (!user) {
      alert('아이디 또는 비밀번호를 확인하세요.');
      return;
    }

    // ✅ 로그인 성공 처리
    login(user); // AuthContext에 사용자 저장
    localStorage.setItem('token', 'fake-token'); // (더미 토큰 저장)
    alert('로그인 되었습니다.');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-input">
        <span className="icon">👤</span>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
      <div className="login-input">
        <span className="icon">🔒</span>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
