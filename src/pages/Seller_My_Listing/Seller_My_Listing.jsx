import React from 'react'
import { My_Listing } from '../../components/my_listing/My_Listing'

function Seller_My_Listing() {
  return (
    <div>
        <div className="text-deep-orange-900 font-serif text-3xl mt-28 ml-4 md:ml-20 lg:ml-96">
            My Listing
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-10">
        <My_Listing/>
      </div>
    </div>
  )
}

export default Seller_My_Listing