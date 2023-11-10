import React from 'react'
import { ClipLoader } from 'react-spinners'

function Loding() {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 bg-gray-200'>
        <ClipLoader color='red'/>
    </div>
  )
}

export default Loding