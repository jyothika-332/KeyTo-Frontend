import React from 'react'
import { CreateListingForm } from '../../components/create_listing/Create_Listing'

function Create_Listing() {
  return (
    <div>
        <div className="ml-4">
          <div className="text-deep-orange-900 font-serif text-3xl mt-28 ml-60">Create Listing</div>
          <div className="mt-1 ml-14"><CreateListingForm/></div>
        </div>
    </div>
  )
}

export default Create_Listing