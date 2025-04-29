
import React, { useState } from 'react';
import './Registration.css';
import LoginForm from '../login/LoginForm';
import axios from 'axios';




const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setIsRegistered(true);
      navigator('/contacts')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка при регистрации');
    }
  };

  const handleLoginRedirect = () => {
    setIsRegistered(true);
  };

  return (
    <>
      {isRegistered ? (
        <LoginForm /> 
      ) : (
        <div className="registration-container">
          <h2>Регистрация</h2>
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
            <div className='button-registr'>
              <button type="submit">Зарегистрироваться</button>
              <button
              className='button-enter' 
              type="button" 
              onClick={handleLoginRedirect} 
              >
              Уже есть аккаунт?
              </button>
            </div>
            
          </form>
        </div>
      )}
    </>
  );
};

export default Registration;
