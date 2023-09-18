import React from 'react'
import { SimpleRegistrationForm } from '../../components/admin_login/Admin_Login'
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";
import { NavbarSimple } from '../../components/adminNavbar/Admin_NAvbar';


function Adminlogin() {
  return (
    <div>
      <div className='w-full'>
        <NavbarSimple/>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ml-20 mt-16 mx-10 gap-10 h-full">
        <div className="">
        <img
          src={Image1}
          alt="card-image"
          className="h-96 mt-10 w-full object-cover rounded-lg"
        />
      </div>
            <div>
                <SimpleRegistrationForm/>
            </div>
        </div>
    </div>
  )
}

export default Adminlogin