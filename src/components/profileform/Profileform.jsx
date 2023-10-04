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
import { EditProfileSeller } from "../dialogues/EditProfileSeller";
import { ChangePasswordUser } from "../dialogues/ChangePasswordUser";



export function ProfileForm() {
  
  const [userData, setuserData] = useState("");

  useEffect(() => {
      if (localStorage.getItem("token"))
      {
        getUserData()
      }
      else
      {
        localStorage.clear();
        window.location.href = '/'
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
        console.log(res.data);
        setuserData(res.data)
      })
      .catch((err) => {
        localStorage.clear();
        window.location.href = "/";
      });
  };



  return (
    <>
      <div>
        <img src={userData.profile_image ? userData.profile_image : profileicon } className="w-14 sm:w-16 md:w-20"></img>
        <p className="text-2xl font-semibold font-serif">Hello, { userData.first_name ? userData.first_name : ''}</p>
      </div>
      <div className="mt-8 ml-10">
        <div className="text-blue-gray-600 font-medium">Personal Info</div>
        <div className="flex flex-col md:flex-row mt-5">
          <div className="md:w-1/2">
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800">First Name : <span className="h-10 mt-2 text-base ps-10 pt-1">{ userData.first_name ? userData.first_name : ''}</span></p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-xs text-blue-gray-800">Last Name : <span className="h-10 mt-2 text-base ps-10 pt-1">{ userData.last_name ? userData.last_name : ''}</span></p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-xs text-blue-gray-800">Email<span className="ml-8">:</span><span className="h-10 mt-2 text-base ps-10 pt-1">{ userData.email ? userData.email : ''}</span></p>
            </div>
          </div>
          <div className="md:w-1/2 md:ml-4">
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800">Phone<span className="ml-10">:</span><span className="h-10 mt-2 text-base ps-10 pt-1">{ userData.phone ? userData.phone : ''}</span></p>
            </div>
            <div className="mb-4 mt-8">
              <p className="text-xs text-blue-gray-800">Address<span className="ml-8">:</span><span className="h-10 mt-2 text-base ps-10 pt-1">{ userData.address ? userData.address : ''}</span></p>
            </div>
            <div className="flex mt-4 md:mt-10">
              <div>
                <EditProfileSeller data={userData}/>
              </div>
              <div className="ml-4">
                <ChangePasswordUser/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


