import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'
import { UserProfile } from '../../components/userprofile/UserProfile'
import { FooterWithSocialLinks } from '../../components/footer/Footer'

function Userprofile() {
  return (
    <>
        <StickyNavbar/>
        <div className="text-center">
          <p className="mt-32 font-serif text-3xl  text-deep-orange-900">
            My Profile
          </p>
          <div className=''>
          <UserProfile/>
          </div>
        </div>
        <div className="mt-36 ">
            <FooterWithSocialLinks/>
        </div>    
    </>
  )
}

export default Userprofile