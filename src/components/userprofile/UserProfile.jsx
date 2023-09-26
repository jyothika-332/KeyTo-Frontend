import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import profileicon from "../../assets/Image/profileicon.png";


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
        console.log(res);
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
      <img src={profileicon} className="w-14 sm:w-16 md:w-20"></img>
      <p className="text-xl sm:text-2xl font-semibold font-serif">
        Hello, {userData ? userData.first_name : ""}
      </p>
      </div>
      <div className="mt-5">
        <div className="text-blue-gray-400 font-medium text-left text-sm">
          Personal Info
        </div>
        <div className="md:flex-row mt-5">
          <div className="md:w-1/2">
            <div className="mb-4">
              <p className="text-base text-blue-gray-800 text-left">First Name : {userData ? userData.first_name : ""}</p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-base text-blue-gray-800 text-left">Last Name : {userData ? userData.last_name : ""}</p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-base text-blue-gray-800 text-left">Email <span className="ml-10">: {userData ? userData.email : ""}</span></p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-base text-blue-gray-800 text-left">Username<span className="ml-3">: {userData ? userData.email : ""}</span></p>
            </div>
            <div className="flex mt-4 md:mt-10">
              <div>
                <Button className="bg-deep-orange-500">Edit Profile</Button>
              </div>
              <div className="ml-4">
                <Button className="bg-deep-orange-500">Change Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
