// src/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/cars/all'); // Замените на ваш URL API
        setCars(response.data); // Предполагается, что ответ содержит массив автомобилей
      } catch (err) {
        setError('Ошибка при загрузке автомобилей');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Список автомобилей</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} - {car.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
