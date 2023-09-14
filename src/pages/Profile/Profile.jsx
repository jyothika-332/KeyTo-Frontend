import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { SidebarWithContentSeparator } from "../../components/sidebar/Sidebar";
import { ProfileForm } from "../../components/profileform/Profileform"; 
import { FooterWithSocialLinks } from "../../components/footer/Footer";

function Profile() {
  return (
    <div>
      <StickyNavbar />
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 mx-10 ">
        <div className="">
          <SidebarWithContentSeparator />
        </div>
        <div className=" col-span-3">
          <p className="mt-24 ml-10 font-serif text-3xl  text-deep-orange-900">
            My Profile
          </p>
          <ProfileForm/>
        </div>
      </div>
      <div className="mt-36 "> 
        <FooterWithSocialLinks/>
      </div>
    </div>
  );
}

export default Profile;
