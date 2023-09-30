import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'

function Property_Details() {
  return (
    <div>
        <div>
            <StickyNavbar/>
        </div>
        <div className="text-center mt-32 text-deep-orange-900 text-4xl font-serif font-bold">Property Details</div>
        <div className='flex'>
            <div className='flex-1 mt-16'>
                <div className='w-96 h-96 bg-blue-gray-600 ml-60 mt-5 rounded-lg'></div>
            </div>
            <div className='flex-1 mt-16'>
                <div className='w-2/3 h-96 bg-blue-gray-100 ml-5 mt-5 rounded-lg'>
                    <div className='w-full h-28 bg-deep-orange-400 rounded-lg'>eee</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Property_Details