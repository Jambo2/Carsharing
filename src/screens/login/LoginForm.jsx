// src/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../registration/Registration.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8082/api/auth/login', { 
        username, 
        password,
      });

      localStorage.setItem('token', response.data.token);
      setMessage(response.data.message || 'Успешный вход!');
      navigate('/home'); // Замените '/main' на ваш маршрут главной страницы

    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка при входе');
    }
  };

  return (
    <div className="login-container">
      <h2>Авторизация</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;