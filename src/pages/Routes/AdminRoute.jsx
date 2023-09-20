import React from 'react'
import { NavbarSimple } from '../../components/adminNavbar/Admin_NAvbar'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../../components/adminSidebar/Admin_Sidebar'

function AdminRoute() {
  return (
    <div>
      <div>
        <NavbarSimple/>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-5 mx-10 ">
        <div className="">
          <AdminSidebar/>
        </div>
        <div className='col-span-3'>

        <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminRoute