import { Routes, Route } from "react-router-dom"
import Home from "../screens/Home"
import Registration from "../screens/Registration/Registration"

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </>
  )
}


