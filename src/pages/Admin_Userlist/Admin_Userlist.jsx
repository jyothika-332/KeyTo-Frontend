import React from 'react'
import Userlist from '../../components/userlist/Userlist'

function Admin_Userlist() {
  return (
    <div>
      <div>
      <div className=" col-span-2">
          <p className="mt-9 ml-10 font-serif text-3xl  text-deep-orange-900">
            User List
          </p>
          <div className='mt-10 w-full h-full'>
            <Userlist/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin_Userlist