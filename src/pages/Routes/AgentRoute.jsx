import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'
import { SidebarWithContentSeparator } from '../../components/sidebar/Sidebar'
import { FooterWithSocialLinks } from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'

function AgentRoute() {
  return (
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 mx-10 ">
        <div className="">
          <SidebarWithContentSeparator />
        </div>
        <Outlet />
      </div>
      <div className="mt-36 "> 
        <FooterWithSocialLinks/>
      </div>
    </div>
  )
}

export default AgentRoute