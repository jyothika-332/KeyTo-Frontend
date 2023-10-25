import { Input } from '@material-tailwind/react'
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

function Chat_Page() {
  return (
    <>
      <div className='bg-gray-300  flex-col'>
        <div className='bg-blue-gray-200 h-14'>
          ddd
        </div>
        <div className='h-[27rem]'>
          messages
        </div>
        <div className='bg-blue-gray-100 flex justify-between items-center p-2'>
          <div className='w-10'><PlusIcon className='h-5 w-5'/></div>
          <div className='w-full'> 
          <Input placeholder='Type a message' variant='outlined' className='rounded-full !border !border-gray-600  text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10' labelProps={{
          className: "hidden"}}/> </div>
          <div className='w-10'><PaperAirplaneIcon className='h-5 w-5 m-2'/></div>
        </div>
      </div>
    </>
  )
}

export default Chat_Page