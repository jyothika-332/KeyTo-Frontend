import React from 'react'
import { NavbarSimple } from '../../components/adminNavbar/Admin_NAvbar'
import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '../../components/adminSidebar/Admin_Sidebar'

function AdminRoute() {
  return (
    <div>
      <div className='h-[5rem]'>
        <NavbarSimple/>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-4 ">
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