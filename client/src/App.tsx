import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/index.tsx"
import Login from "./pages/Login/index.tsx"
import Register from './pages/Register/index.tsx'
import NotFound from "./pages/NotFound.tsx"

const App = () => {
  const [isAuthenticated,setIsAuthenticated] =useState(false);
  return (
    <Routes>
      <Route path="/" element={isAuthenticated?<Home />:<Navigate to={"/signin"}/>} />  
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App