import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './ListOfCars.css'; 

const ListOfCars = () => {
  const [cars, setCars] = useState([]); 
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate(); // Получите объект history

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/cars/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCars(response.data); 
      } catch (err) {
        setError('Ошибка при загрузке автомобилей');
        console.error(err);
      } 
    };

    fetchCars();
  }, [token]);

  const handleCarClick = (carId) => {
    navigate(`${carId}`); // Исправлено
  };

  return (
    <div className="car-list">
      <h2>Список автомобилей</h2>
      {error && <p className="error-message">{error}</p>}
      {cars.length > 0 ? (
        <div className="car-cards">
          {cars.map((car) => (
            <div className="car-card" key={car.id} onClick={() => handleCarClick(car.id)}>
              <h3>{car.model} {car.brand}</h3>
              <p>Цена: {car.pricePerHour} руб/час</p>
              <p>Статус: {car.available ? 'Доступно' : 'Недоступно'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет доступных автомобилей.</p>
      )}
    </div>
  );
};

export default ListOfCars;
