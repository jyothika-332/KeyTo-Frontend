import React from 'react'
import Home from './pages/Home/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/Forgot-Password/Forgot-password'
import Profile from './pages/Profile/Profile'
import Userprofile from './pages/Userprofile/Userprofile'
import Become_a_seller from './pages/Become_a_Seller/Become_a_seller'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Login} path='/login' />
        <Route Component={ForgotPassword} path='/forgot-password' />
        <Route Component={Profile} path='/profile' />
        <Route Component={Userprofile} path='/userprofile' />
        <Route Component={Become_a_seller} path='/become_a_seller' />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App