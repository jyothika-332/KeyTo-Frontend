import React from 'react'
import { LoginPage } from '../../components/login/Login'
import { StickyNavbar } from '../../components/navbar/Navbar'
function Login() {
  return (
    <div>
      <StickyNavbar/>
      <div className='mt-20'>
        <LoginPage/>  
      </div>
    </div>
  )
}

export default Login