import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyBookings from './MyBookings/MyBookings';
import './Profile.css';

export default function Profile() {
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Пожалуйста, войдите в систему.");
      navigate("/login");
    } else {
      axios.get("http://localhost:8082/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const data = response.data;
          if (data) {
            setContact(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setMiddleName(data.middleName);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            localStorage.setItem("contact", JSON.stringify(data));
          } else {
            
            setContact({});
            setFirstName("");
            setLastName("");
            setMiddleName("");
            setEmail("");
            setPhoneNumber("");
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      
      if (contact && Object.keys(contact).length > 0) {
        
        const response = await axios.put("http://localhost:8082/api/contacts", {
          firstName,
          lastName,
          middleName,
          email,
          phoneNumber,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const updatedContact = {
            firstName,
            lastName,
            middleName,
            email,
            phoneNumber,
          };

          setContact(updatedContact);
          localStorage.setItem("contact", JSON.stringify(updatedContact));
          setMessage("Контактные данные успешно обновлены!");
          setIsEditing(false);
        } else {
          setMessage("Ошибка при обновлении контактных данных.");
        }
      } else {
        
        const response = await axios.post("http://localhost:8082/api/contacts", {
          firstName,
          lastName,
          middleName,
          email,
          phoneNumber,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 201) {
          const newContact = response.data;

          setContact(newContact);
          localStorage.setItem("contact", JSON.stringify(newContact));
          setMessage("Контактные данные успешно добавлены!");
          setIsEditing(false);
        } else {
          
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка при обработке данных.");
    }
  };

  return (
    <div className="profile-container">      
    <h2>Контактные данные</h2>
    {message && <p className="message">{message}</p>}
    {isEditing ? (
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Отчество"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button type="submit">Сохранить</button>
        <button type="button" onClick={() => setIsEditing(false)}>Отмена</button>
      </form>
    ) : (
      <div className="profile-info">
        {contact && Object.keys(contact).length > 0 ? (
          <>
            <p><strong>Имя:</strong> {contact.firstName}</p>
            <p><strong>Фамилия:</strong> {contact.lastName}</p>
            <p><strong>Отчество:</strong> {contact.middleName}</p>
            <p><strong>Электронная почта:</strong> {contact.email}</p>
            <p><strong>Номер телефона:</strong> {contact.phoneNumber}</p>
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
          </>
        ) : (
          
          <button onClick={() => setIsEditing(true)}>Добавить контактные данные</button>
        )}
      </div>
    )}
    <MyBookings />
  </div>
);
}
