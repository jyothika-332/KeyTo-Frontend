import React from "react";
import { ProfileForm } from "../../components/profileform/Profileform"; 

function Profile() {
  return (
    <div>
      <div className=" col-span-3">
        <div className="mt-14">
        <ProfileForm/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
