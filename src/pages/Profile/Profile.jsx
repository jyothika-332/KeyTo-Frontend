import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { SidebarWithContentSeparator } from "../../components/sidebar/Sidebar";
import { ProfileForm } from "../../components/profileform/Profileform"; 
import { FooterWithSocialLinks } from "../../components/footer/Footer";

function Profile() {
  return (
    <div>
      <div className=" col-span-3">
        <p className="mt-24 ml-10 font-serif text-3xl  text-deep-orange-900">
          My Profile
        </p>
        <ProfileForm/>
      </div>
    </div>
  );
}

export default Profile;
