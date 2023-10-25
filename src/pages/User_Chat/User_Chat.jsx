import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'
import Chat_Contacts from '../../components/chat_contacts/Chat_Contacts'
import Chat_Page from '../../components/chat_section/Chat_Section'
import { FooterWithSocialLinks } from '../../components/footer/Footer'

function User_Chat() {
  return (
    <div>
        <div><StickyNavbar/></div>
        <div className='mt-20 grid grid-cols-[20rem,1fr]'>
            <div className='border-2'>
                <div className="bg-blue-gray-200 h-14">kkk</div>
                <div><Chat_Contacts/></div>
            </div>
            <div><Chat_Page/></div>
        </div>
        <div className='mt-40'><FooterWithSocialLinks/></div>
    </div>
  )
}

export default User_Chat