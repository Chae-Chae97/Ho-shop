// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../features/auth/RegisterForm';
//import './Register.css'; // 로그인 페이지와 통일된 스타일 사용

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    id: '',
    password: '',
    phone: '',
    email: '',
    sex: '',
    mailagree: false,
  });

  const [phone, setPhone] = useState({ part1: '', part2: '', part3: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const onPhoneChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setPhone((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors = {};

    const idPattern = /^[A-Za-z0-9]{5,10}$/;
    if (!idPattern.test(form.id)) {
      newErrors.id = '아이디는 영문과 숫자 조합만 가능하며 5~10자여야 합니다.';
    }

    const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!pwPattern.test(form.password)) {
      newErrors.password = '비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자리여야 합니다.';
    }

    const phoneCombined = phone.part1 + phone.part2 + phone.part3;
    if (!/^\d{10,11}$/.test(phoneCombined)) {
      newErrors.phone = '전화번호는 숫자만 입력하며 10~11자리여야 합니다.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    if (form.username.length < 2) {
      newErrors.username = '이름은 최소 2자리 이상이어야 합니다.';
    }

    if (!form.sex) {
      newErrors.sex = '성별을 선택해주세요.';
    }

    if (!form.mailagree) {
      newErrors.mailagree = '메일 수신에 동의해야 가입할 수 있습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      alert('입력값에 오류가 있습니다. 확인해주세요.');
      return;
    }

    const fullPhone = `${phone.part1}-${phone.part2}-${phone.part3}`;
    const newform = { ...form, phone: fullPhone };
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newform);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`회원가입이 완료되었습니다.\n이름: ${form.username}\n이메일: ${form.email}`);
    navigate('/');
  };

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.length > 0) {
      setHasUser(true);
    }
  }, []);

  return (
    <div className="user-form-outer">
      <div className="user-form-container">
        <UserForm
          form={form}
          phone={phone}
          errors={errors}
          onChange={onChange}
          onPhoneChange={onPhoneChange}
          onSubmit={onSubmit}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />

        {hasUser && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button className="return-home-button" onClick={() => navigate('/')}>
              메인으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
