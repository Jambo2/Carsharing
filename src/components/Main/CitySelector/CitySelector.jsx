import React, { useState } from 'react';
import './CitySelector.css'; 

const CitySelector = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const cities = [
    'Кострома',
    'Москва',

  ];

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="container">
      <h2>Ваш город - </h2>
      <select value={selectedCity} onChange={handleChange}>
        <option value="">Выберите город</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

    </div>
  );
};

export default CitySelector;
