import React from "react";
import { ProfileForm } from "../../components/profileform/Profileform"; 

function Profile() {
  return (
    <div>
      <div className=" col-span-3">
        <div>
        <ProfileForm/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
