import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'
import { SidebarWithContentSeparator } from '../../components/sidebar/Sidebar'
import { FooterWithSocialLinks } from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'

function AgentRoute() {
  return (
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-20 ">
        <div className="">
          <SidebarWithContentSeparator />
        </div>
        <div className='col-span-3'>
        <Outlet />
        <div className="mt-40">
        <hr className="my-2 border-blue-gray-100" />
         <div className='mt-10'> 
          <FooterWithSocialLinks/>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AgentRoute