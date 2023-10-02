import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";


function Property_Details() {
  return (
    <div>
      <div>
        <StickyNavbar />
      </div>
      <div className="text-center mt-32 text-deep-orange-900 text-4xl font-serif font-bold">
        Property Details
      </div>
      <div className="flex">
        <div className="flex-1 mt-16">
          <div className="w-96 h-96 bg-blue-gray-600 ml-60 mt-5 rounded-lg"></div>
        </div>
        <div className="flex-1 mt-16">
          <div className="w-2/3 h-96 bg-blue-gray-100 ml-5 mt-5 rounded-lg">
            <div className="w-full h-28 bg-deep-orange-400 rounded-lg">eee</div>
          </div>
        </div>
      </div>
      <div className="font-serif font-bold text-2xl ml-32 mt-20">
        About This Listing
      </div>
      <div className="ml-44 mt-8">
        Praesent eros turpis, commodo vel justo at, pulvinar mollis eros. Mauris
        aliquet eu quam id ornare. Morbi ac quam enim. Cras vitae
        <br />
        nulla condimentum, semper dolor non, faucibus dolor. Vivamus adipiscing
        eros quis orci fringilla, sed pretium lectus viverra. Pellentesque
        <br />
        habitant morbi tristique senectuset netus et malesuada fames ac turpis
        egestas. Donec nec velit non odio aliquam suscipit. Sed non
        <br />
        neque faucibus, condimentum lectus at, accumsan enim.
      </div>
      <div className="font-serif font-bold text-2xl ml-32 mt-20">Details</div>
    </div>
  );
}

export default Property_Details;
