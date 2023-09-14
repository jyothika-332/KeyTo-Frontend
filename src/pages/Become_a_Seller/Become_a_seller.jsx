import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'

function Become_a_seller() {
  return (
    <div>
        <StickyNavbar/>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-5 mx-10 ">
            <div className="">
            <SidebarWithContentSeparator />
            </div>
            <div className=" col-span-3">
            <p className="mt-24 ml-10 font-serif text-3xl  text-deep-orange-900">
                My Profile
            </p>
            </div>
        </div>    
    </div>
  )
}

export default Become_a_seller