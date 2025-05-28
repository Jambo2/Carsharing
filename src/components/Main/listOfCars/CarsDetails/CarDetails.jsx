import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './CarDetails.css'; 


const CarDetails = () => { 
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
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

        setCar(response.data[carId - 9]); 
      } catch (error) {
        setError('Ошибка при загрузке деталей автомобиля');
      } 
    };

    fetchCarDetails();
  }, [carId, token]);

  const handleRent = async () => {
    if (!car.available) {
      alert('Эта машина недоступна для аренды.');
      return;
    }

    if (!startDate || !endDate) {
      alert('Пожалуйста, выберите обе даты.');
      return;
    }

    const storedContact = JSON.parse(localStorage.getItem("contact"));
    if (!storedContact || !storedContact.firstName || !storedContact.lastName || !storedContact.email || !storedContact.phoneNumber) {
      alert('Пожалуйста, заполните все контактные данные перед арендой.');
      return;
    }

    
    const hours = Math.ceil((endDate - startDate) / (1000 * 60 * 60)); // Разница в часах
    const totalCost = hours * car.pricePerHour;

    const bookingData = {
      userId: 1, 
      carId: car.id, 
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    };

    try {
      await axios.post('http://localhost:8082/api/booking/create', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
      deductRentCost(totalCost);
    

      alert(`Вы арендовали ${car.model} ${car.brand} с ${startDate.toLocaleDateString()} по ${endDate.toLocaleDateString()} за ${totalCost}`);
      navigate('/home');
    } catch (err) {
      alert('Ошибка при создании бронирования. Попробуйте еще раз.');
      console.log(err);
    }
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

      <div className="date-picker">
        <label>Выберите дату начала:</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        
        <label>Выберите дату окончания:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      <div className="buttons-rents">
        <button onClick={handleCancel}>
          Отмена
        </button>        
        <button onClick={handleRent}>
          Арендовать
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
