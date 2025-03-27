import { Routes, Route } from "react-router-dom"
import Home from "../screens/Home"
import Registration from "../screens/Registration/Registration"
import LoginForm from "../screens/Login/LoginForm"
import AddCar from "../components/Main/AddCars/AddCar"

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/" element={<Registration/>}/>
        <Route path="/home/carsharing" element={<AddCar/>}/>
        
      </Routes>
    </>
  )
}


