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
      newErrors.id = 'IDは英字と数字の組み合わせで5〜10文字である必要があります。';
    }

    const pwPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!pwPattern.test(form.password)) {
      newErrors.password = 'パスワードは英字、数字、特殊文字を含む8〜20桁である必要があります。';
    }

    const phoneCombined = phone.part1 + phone.part2 + phone.part3;
    if (!/^\d{10,11}$/.test(phoneCombined)) {
      newErrors.phone = '電話番号は数字のみで10〜11桁である必要があります。';
    }

    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailPattern.test(form.email)) {
      newErrors.email = '有効なメールアドレスを入力してください。';
    }

    if (form.username.length < 2) {
      newErrors.username = '名前は2文字以上である必要があります。';
    }

    if (!form.sex) {
      newErrors.sex = '性別を選択してください。';
    }

    if (!form.mailagree) {
      newErrors.mailagree = 'メール受信に同意する必要があります。';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      alert('入力値にエラーがあります。確認してください。');
      return;
    }

    const fullPhone = `${phone.part1}-${phone.part2}-${phone.part3}`;
    const newform = { ...form, phone: fullPhone };
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newform);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`会員登録が完了しました。\n名前: ${form.username}\nメール: ${form.email}`);
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
              メインに戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;