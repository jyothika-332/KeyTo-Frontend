import React from 'react'
import { PropertyList } from '../../components/propertylist/Propertylist'

function Seller_My_Listing() {
  return (
    <div>
        <div className="text-deep-orange-900 font-serif text-3xl mt-28 ml-96">
            My Listing
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10">
        <PropertyList />
        <PropertyList />
      </div>
    </div>
  )
}

export default Seller_My_Listing