import React, { useState, useEffect } from 'react';
import 'boxicons';
import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Хук для навигации

  // Функция для проверки аутентификации
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
  };

  // Функция для входа (сохранение токена)
  const login = (token) => {
    localStorage.setItem('token', token);
    checkAuthStatus(); // Обновляем статус аутентификации
  };

  // Функция для выхода (удаление токена)
  const logout = () => {
    localStorage.removeItem('token');
    checkAuthStatus(); // Обновляем статус аутентификации
  };

  // Проверяем статус аутентификации при монтировании компонента
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Перенаправляем на страницу регистрации, если не аутентифицирован
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/home'); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='block__menu'>
      <div className="logo">
        <Link to='/home'>
          <box-icon type='solid' name='car' color='white' size='4em'></box-icon>
        </Link>
      </div>
      <nav>
        <ul className='menu__list'>
          <li><Link to="home">Каршеринг</Link></li>
          <li><Link to="addCar">Админка</Link></li>
          <li><Link href="">Подписка</Link></li>
          <li><Link href="">Для бизнеса</Link></li>
          
          {isAuthenticated ? (
            <>
              <li style={{ marginLeft: '30px' }}><Link to="/profile">Мой профиль</Link></li>
              <li style={{ marginLeft: '30px' }}><button onClick={logout}>Выход</button></li>
            </>
          ) : (
            <li style={{ marginLeft: '30px' }}><Link to='/'>Регистрация</Link></li>
          )}
        </ul>
      </nav>
    </div>
  );
}
