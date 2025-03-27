// src/AddCar.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddCar.css'; // Импортируем стили

const AddCar = () => {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      available,
      brand,
      model,
      pricePerHour: parseFloat(pricePerHour),
    };

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Необходима авторизация');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/api/cars/add', newCar, {
        headers: {
          Authorization: `Bearer ${token}`, // Здесь используются обратные кавычки
        },
      });

      setModel('');
      setBrand('');
      setPricePerHour('');
      setAvailable(true);
      setMessage('Автомобиль успешно добавлен!');

    } catch (error) {
      console.error('Ошибка при добавлении автомобиля:', error); // Логирование ошибки
      setMessage('Ошибка при добавлении автомобиля: ' + (error.response?.data?.message || 'Неизвестная ошибка'));
    }
  };

  return (
    <div className="add-car-container">
      <h2>Добавить автомобиль</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Модель:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Брэнд:</label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Цена за час:</label>
          <input
            type="number"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            required
          />
        </div>
        <div className='check_box'>
          <label>Доступен:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <button type="submit">Добавить</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCar;
