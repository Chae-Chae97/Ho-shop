// Login.jsx
import React from 'react';
import LoginForm from '../features/auth/LoginForm';

const Login = () => (
  <div className="login-page">
    <div className="login-card">
      <h2>로그인</h2>
      <LoginForm />
    </div>
  </div>
);

export default Login;