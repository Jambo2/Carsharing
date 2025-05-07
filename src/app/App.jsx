import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../screens/Home";
import Registration from "../screens/Registration/Registration";
import AddCar from "../components/Main/AddCars/AddCar";
import Header from "../components/header/Header";
import CarDetails from "../components/Main/listOfCars/CarsDetails/CarDetails";
import Profile from "../screens/Profil/Profile";


export default function App() {
  const location = useLocation();
  const showHeader = location.pathname !== "/registration" && location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/carsharing" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Registration />} />
        <Route path="/addCar" element={<AddCar />} />
        <Route path="home/:id" element={<CarDetails />} /> 
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </>
  );
}
