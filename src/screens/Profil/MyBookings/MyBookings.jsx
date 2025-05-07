import { useEffect, useState } from "react";
import axios from "axios";
import './MyBookings.css'; 

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8082/api/booking/my", {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        setBookings(response.data);
      } catch (error) {
        console.error(error);
        setError(error.response ? error.response.data : "Ошибка при получении бронирований"); // Обработка ошибок
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="bookings-container">
      <h2>Мои бронирования</h2>
      <ul className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <div className="booking-details">
                <strong>Машина:</strong> {booking.car?.model || "неизвестно"}<br />
                <strong>Период:</strong> {booking.startTime} по {booking.endTime}<br />
                <strong>Сумма:</strong> {booking.totalPrice} руб.
              </div>
            </li>
          ))
        ) : (
          <li className="no-bookings">Нет доступных бронирований.</li>
        )}
      </ul>
    </div>
  );
}
