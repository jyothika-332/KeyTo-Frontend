import React from "react";
import { ProfileForm } from "../../components/profileform/Profileform"; 

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
