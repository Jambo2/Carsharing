// src/AddCar.js
import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      model,
      brand,
      pricePerHour,
    };

    try {
      const response = await axios.post('http://localhost:8082/api/cars/add', newCar); // Замените на ваш URL API
      
      // Очистить поля ввода после успешного добавления
      
      setModel('');
      setBrand('');
      setPricePerHour('');

    } catch (error) {
      setMessage('Ошибка при добавлении автомобиля');
    }
  };

  return (
    <div>
      <h2>Добавить автомобиль</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Moдель:</label>
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
          <label>Цена:</label>
          <input
            type="number"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            required
          />
        </div>
        <button type="submit">Добавить</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCar;
