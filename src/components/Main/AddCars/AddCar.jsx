import React, { useEffect, useState } from 'react';
import axios from 'axios';



const ListOfCars = () => {
  const [cars, setCars] = useState([]); 
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({ brand: '', model: '', pricePerHour: '', available: true });
  
  const token = localStorage.getItem('token'); 


  useEffect(() => {
    const fetchCars = async () => {
      if (!token) {
        setError('Необходима авторизация');
        return;
      }
      
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



  const handleDeleteCar = async (carId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
      try {
        await axios.delete(`http://localhost:8082/api/cars/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(cars.filter(car => car.id !== carId));
      } catch (err) {
        setError('Ошибка при удалении автомобиля');
        console.error(err);
      }
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/cars/add', newCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars([...cars, response.data]);
      setNewCar({ brand: '', model: '', pricePerHour: '', available: true }); // Сброс формы
    } catch (err) {
      setError('Ошибка при добавлении автомобиля');
      console.error(err);
    }
  };

  return (
    <div className="car-list">
      <h2>Список автомобилей</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleAddCar} className="add-car-form">
        <input 
          type="text" 
          placeholder="Марка" 
          value={newCar.brand} 
          onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} 
          required 
        />
        <input 
          type="text" 
          placeholder="Модель" 
          value={newCar.model} 
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} 
          required 
        />
        <input 
          type="number" 
          placeholder="Цена за час" 
          value={newCar.pricePerHour} 
          onChange={(e) => setNewCar({ ...newCar, pricePerHour: e.target.value })} 
          required 
        />
        <label>
          Доступно:
          <input 
            type="checkbox" 
            checked={newCar.available} 
            onChange={(e) => setNewCar({ ...newCar, available: e.target.checked })} 
          />
        </label>
        <button type="submit">Добавить автомобиль</button>
      </form>

      {cars.length > 0 ? (
        <div className="car-cards">
          {cars.map((car) => (
            <div className="car-card" key={car.id} onClick={() => handleCarClick(car.id)}>
              <h3>{car.brand} {car.model}</h3>
              <p>Цена: {car.pricePerHour} руб/час</p>
              <p>Статус: {car.available ? 'Доступно' : 'Недоступно'}</p>
              <button onClick={() => handleDeleteCar(car.id)}>Удалить</button>
            </div>          ))}
        </div>
      ) : (
        <p>Нет доступных автомобилей.</p>
      )}
    </div>
  );
};

export default ListOfCars;
