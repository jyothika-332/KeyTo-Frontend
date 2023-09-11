import React from 'react'
import Home from './pages/Home/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/Forgot-Password/Forgot-password'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/home" />
        <Route Component={Login} path='/login' />
        <Route Component={ForgotPassword} path='/forgot-password' />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App