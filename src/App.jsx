import React from 'react'
import Home from './pages/Home/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/Forgot-Password/Forgot-password'
import Profile from './pages/Profile/Profile'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path='/login' />
        <Route Component={ForgotPassword} path='/forgot-password' />
        <Route Component={Profile} path='/profile'/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App