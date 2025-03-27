import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListOfCars = () => {
  const [cars, setCars] = useState([]); // Инициализация как пустой массив
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token'); // Получаем токен из localStorage

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

  return (
    <div>
      <h2>Список автомобилей</h2>
      {error && <p>{error}</p>}
      {cars.length > 0 ? ( // Проверяем, есть ли автомобили в массиве
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.model} {car.brand} - {car.pricePerHour} руб/час - {car.available ? 'Доступно' : 'Недоступно'}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных автомобилей.</p> // Сообщение, если массив пуст
      )}
    </div>
  );
};

export default ListOfCars;
