import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../screens/Home";
import Registration from "../screens/Registration/Registration";
import LoginForm from "../screens/Login/LoginForm";
import AddCar from "../components/Main/AddCars/AddCar";
import Header from "../components/header/Header";

export default function App() {
  const location = useLocation();
  const showHeader = location.pathname !== "/registration" && location.pathname !== "/"; // Указываем пути, на которых Header не будет отображаться

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Registration />} />
        <Route path="/carsharing" element={<AddCar />} />
      </Routes>
    </>
  );
}
