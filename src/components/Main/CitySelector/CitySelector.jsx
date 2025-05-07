import React from 'react';
import './CitySelector.css'; 

const CitySelector = () => {
  const city = 'Кострома';

  return (
    <div className="container">
      <h2>Ваш город - {city}</h2>
    </div>
  );
};

export default CitySelector;
