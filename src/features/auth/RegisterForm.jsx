// src/features/auth/RegisterForm.jsx
import React from 'react';
import './RegisterForm.css';

const RegisterForm = ({
  form,
  phone,
  errors,
  onChange,
  onPhoneChange,
  onSubmit,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <form className="register-form" onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="username">이름</label>
        <input
          id="username"
          type="text"
          name="username"
          value={form.username}
          onChange={onChange}
          required
          aria-describedby={errors.username ? "username-error" : undefined}
        />
        {errors.username && (
          <div id="username-error" className="error-text" role="alert">
            {errors.username}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="id">아이디</label>
        <input
          id="id"
          type="text"
          name="id"
          value={form.id}
          onChange={onChange}
          required
          aria-describedby={errors.id ? "id-error" : undefined}
        />
        {errors.id && (
          <div id="id-error" className="error-text" role="alert">
            {errors.id}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">비밀번호</label>
        <div className="password-input">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={onChange}
            required
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && (
          <div id="password-error" className="error-text" role="alert">
            {errors.password}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">전화번호</label>
        <div className="phone-inputs" role="group" aria-labelledby="phone-label">
          <input
            id="phone-part1"
            type="tel"
            name="part1"
            value={phone.part1}
            onChange={onPhoneChange}
            maxLength={3}
            placeholder="010"
            required
            aria-label="전화번호 첫 번째"
          />
          <input
            id="phone-part2"
            type="tel"
            name="part2"
            value={phone.part2}
            onChange={onPhoneChange}
            maxLength={4}
            required
            aria-label="전화번호 두 번째"
          />
          <input
            id="phone-part3"
            type="tel"
            name="part3"
            value={phone.part3}
            onChange={onPhoneChange}
            maxLength={4}
            required
            aria-label="전화번호 세 번째"
          />
        </div>
        {errors.phone && (
          <div className="error-text" role="alert">
            {errors.phone}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <div id="email-error" className="error-text" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <fieldset className="form-group gender-fieldset">
        <legend>성별</legend>
        <label>
          <input
            type="radio"
            name="sex"
            value="남성"
            checked={form.sex === '남성'}
            onChange={onChange}
            required
          />
          남성
        </label>
        <label>
          <input
            type="radio"
            name="sex"
            value="여성"
            checked={form.sex === '여성'}
            onChange={onChange}
            required
          />
          여성
        </label>
        {errors.sex && (
          <div className="error-text" role="alert">
            {errors.sex}
          </div>
        )}
      </fieldset>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="mailagree"
            checked={form.mailagree || false}
            onChange={onChange}
            required
          />
          메일 수신에 동의합니다.
        </label>
        {errors.mailagree && (
          <div className="error-text" role="alert">
            {errors.mailagree}
          </div>
        )}
      </div>

      <button type="submit" className="submit-button">
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
