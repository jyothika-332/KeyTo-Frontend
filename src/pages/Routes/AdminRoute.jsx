import React from 'react'
import { NavbarSimple } from '../../components/adminNavbar/Admin_Navbar'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../../components/adminSidebar/Admin_Sidebar'

function AdminRoute() {
  return (
    <div>
      <div className='h-[5rem]'>
        <NavbarSimple/>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-4 ">
        <div className="invisible sm:visible">
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