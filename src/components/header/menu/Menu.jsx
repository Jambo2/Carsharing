import React, { useState, useEffect } from 'react';
import 'boxicons';
import { Link, useNavigate } from 'react-router-dom';
import CarDetails from '../../Main/listOfCars/CarsDetails/CarDetails';

export default function Menu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(1000000); // Начальная сумма
  const navigate = useNavigate(); 

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token !== null);
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    checkAuthStatus(); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    checkAuthStatus(); 
    navigate('/home');
  };

  const deductRentCost = (amount) => {
    setBalance((prevBalance) => prevBalance - amount);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

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
          <li><Link to="">Подписка</Link></li>
          <li><Link to="">Для бизнеса</Link></li>
          
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
      <div className="balance">
        <h3>Текущий баланс: {balance} руб.</h3>
      </div>

   
      
    </div>
  );
}
