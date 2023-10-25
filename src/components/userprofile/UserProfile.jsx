import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import profileicon from "../../assets/Image/profileicon.png";
import { ChangePasswordUser } from "../dialogues/ChangePasswordUser";
import { EditProfileUser } from "../dialogues/EditProfileUser";
import { ChangeDp } from "../dialogues/ChangeDP";
import { Badge } from "@material-tailwind/react";

export function UserProfile() {
  const [userData, setuserData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  const getUserData = async () => {
    axios
      .get(`${BaseUrl}/user/`, {
        params: {
          id: jwtDecode(localStorage.getItem("token")).user_id,
        },
      })
      .then((res) => {
        setuserData(res.data);
      })
      .catch((err) => {
        localStorage.clear();
        window.location.href = "/";
      });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 max-w-screen-md">
          <div>
            <Badge
              className="w-10 h-10 p-2 bg-white hover:bg-red-500 border border-white"
              placement="bottom-end"
              overlap="circular"
              content={<ChangeDp next = { getUserData} />}
            >
              <div className="  md:w-36 h-36">
                <img
                  src={
                    userData.profile_image
                      ? `${BaseUrl}${userData.profile_image}`
                      : profileicon
                  }
                  className="w-36 h-36"
                ></img>
              </div>
            </Badge>
          </div>
      <div className="mt-5">
        <div className="text-blue-gray-400 font-medium text-left text-sm">
          Personal Info
        </div>
        <div className="md:flex-row mt-5">
          <div className="md:w-1/2">
            <div className="mb-4">
              <p className="text-base text-blue-gray-800 text-left">
                First Name : {userData ? userData.first_name : ""}
              </p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-base text-blue-gray-800 text-left">
                Last Name : {userData ? userData.last_name : ""}
              </p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-base text-blue-gray-800 text-left">
                Email{" "}
                <span className="ml-10">
                  : {userData ? userData.email : ""}
                </span>
              </p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-base text-blue-gray-800 text-left">
                Username
                <span className="ml-3">: {userData ? userData.email : ""}</span>
              </p>
            </div>
            <div className="flex mt-4 md:mt-10">
              <div>
                <EditProfileUser
                  next={getUserData}
                  data={userData}
                  setData={setuserData}
                />
              </div>
              <div className="ml-4">
                <ChangePasswordUser />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
