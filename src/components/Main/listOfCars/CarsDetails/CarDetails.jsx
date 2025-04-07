import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './CarDetails.css';

const CarDetails = () => {
  const [car, setCar] = useState();
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token'); 
  const { id: carId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/cars/all', { 
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setCar(response.data[`${carId - 1}`]); 
      } catch (err) {
        setError('Ошибка при загрузке деталей автомобиля');
        console.log(err);
      } 
    };

    fetchCarDetails();
  }, [carId, token]);

  const handleRent = () => {
    
    alert(`Вы арендовали ${car.model} ${car.brand}`);
  };

  const handleCancel = () => {
    navigate('/home'); 
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!car) return <p className="loading-message">Загрузка...</p>;

  return (
    <div className="car-details">
      <h2>{car.model} {car.brand}</h2>
      <p>Цена: {car.pricePerHour} руб/час</p>
      <p>Статус: {car.available ? 'Доступно' : 'Недоступно'}</p>
      
      <div className="buttons-rents">
        <button onClick={handleCancel}>
          Отмена
        </button>
        <button onClick={handleRent} disabled={!car.available}>
          Арендовать
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
