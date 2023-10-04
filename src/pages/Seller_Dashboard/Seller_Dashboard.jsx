import React from 'react'

function Seller_Dashboard() {
  return (
    <>
     <div>
        <div className="text-deep-orange-900 font-serif text-3xl mt-28 ml-11">
            Dashboard
        </div>
     </div>
    <div className='grid grid-cols-[1fr,1fr,1fr] h-40 mt-8'>
        <div className='flex justify-center items-center'>
            <div className='h-32 w-56 border-2 border-blue-gray-600 rounded-lg'>
                <div className='mt-5 text-4xl font-serif'><span className='ml-20'>125</span></div>
                <div className='mt-3'><span className='ml-11 text-2xl font-serif'>Active Listing</span></div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <div className='h-32 w-56 border-2 border-blue-gray-600 rounded-lg'>
                <div className='mt-5 text-4xl font-serif'><span className='ml-20'>125</span></div>
                <div className='mt-3'><span className='ml-11 text-2xl font-serif'>Listing Views</span></div>
            </div>
        </div>
        <div className='flex justify-center items-center'>
            <div className='h-32 w-56 border-2 border-blue-gray-600 rounded-lg'>
                <div className='mt-5 text-4xl font-serif'><span className='ml-20'>125</span></div>
                <div className='mt-3'><span className='ml-12 text-2xl font-serif'>Your Rewies</span></div>
            </div>
        </div>

    </div>
    </>
  )
}

export default Seller_Dashboard