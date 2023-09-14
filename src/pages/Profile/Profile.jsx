import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { SidebarWithContentSeparator } from "../../components/sidebar/Sidebar";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";

function Profile() {
  return (
    <div>
      <StickyNavbar />
      {/* <div className='grid-rows-2'>
            <div className='fixed'>
                
            </div>
            <div>
                
            </div>
        </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 mt-10 mx-10 ">
        <div className="">
          <SidebarWithContentSeparator />
        </div>
        <div className="">
          <p className="mt-36 ml-10 font-serif text-3xl">
            My Profile hsgas shdbsbd hdhshd hsdhjsbd nhdhjs dn dsbd dsdhs dbgds
            dsdhs d
          </p>
          <p>llllllllllllllllllllllllllllll</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
