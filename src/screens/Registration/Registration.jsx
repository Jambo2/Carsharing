// src/RegistrationForm.js
import React, { useState } from 'react';
import './Registration.css';
import axios from 'axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/api/auth/register', { 
        username, 
        password,
      });

      localStorage.setItem('token', response.data.token); 
      
      setMessage(response.data.message || 'Регистрация завершена!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка при регистрации');
    }
  };

  return (
    <div className="registration-container">
      <h2>Регистрация</h2>
      {message && <p>{message}</p>} {/* Отображение сообщения */}
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
        <div className="form-group">
          <label htmlFor="confirm-password">Подтверждение пароля</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Registration;
