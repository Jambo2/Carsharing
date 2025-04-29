import { useEffect, useState } from "react";
import axios from "axios";

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
    return <div>Загрузка...</div>; 
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h2>Мои бронирования</h2>
      <ul>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <li key={booking.id}>
              Машина: {booking.car?.model || "неизвестно"}, <br />
              С {booking.startTime} по {booking.endTime}, <br />
              Сумма: {booking.totalPrice}
            </li>
          ))
        ) : (
          <li>Нет доступных бронирований.</li> 
        )}
      </ul>
    </div>
  );
}
