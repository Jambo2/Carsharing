import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import Registration from '../Registration/Registration';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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
      navigate('/home'); 

    } catch (error) {
      setMessage(error.response?.data?.message || 'Ошибка при входе');
    }
  };

  const handleRegistRedirect = () => {
    setIsRegistering(true);
  };
  
  return (
    <div className="login-container">
      {isRegistering ? (
        <Registration />
      ) : (
        <>
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
            <div >
               <button type="submit">Войти</button>
               <button 
               type="button" 
               onClick={handleRegistRedirect}
               className='button-reg'>
                 Зарегистрироваться
               </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;