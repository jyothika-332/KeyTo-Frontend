import React from 'react'
import { Button, Input } from "@material-tailwind/react";

function Become_A_Selller() {
  return (
    <div>
        <div className="flex-col items-center">
            <form>
                <div className="w-96 mt-6">
                    <Input label="Address" type="text" />
                </div>
                <div className="w-96 mt-8">
                    <Input label="Phone Number" type="text" />
                </div>
                <div className="w-96 mt-8">
                    <Input label="Location" type="text" />
                </div>
                <div className="w-96 mt-8">
                    <Input label="Upload Id" type="file" />
                </div>
                <div>
                    <Button className='mt-10 ml-72 bg-deep-orange-500'>Submit</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Become_A_Selller