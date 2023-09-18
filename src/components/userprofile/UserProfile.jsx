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

export function UserProfile() {

  const [userData, setuserData] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token'))
    {
      getUserData()
    }
    else
    {
      localStorage.clear()
      window.location.href = '/'
    }
  }, []);

  const getUserData = async () => {
    axios.get(`${BaseUrl}/user/`,{
      params : {
        'id' : jwtDecode(localStorage.getItem('token')).user_id
      }
    })
    .then((res) => {
        console.log (res)
        setuserData( res.data)
    })
    .catch((err) => {
      localStorage.clear()
      window.location.href = '/'
    })
  }

  return (
    <div className="">
      <div className="mt-8 ml-72">
        <p className="text-2xl font-semibold font-serif">Hello, { userData ? userData.first_name : '' }</p>
      </div>
      <div className="mt-10 mx-72">
        <div className="text-blue-gray-600 font-medium text-left">Personal Info</div>
        <div className="md:flex-row mt-5">
          <div className="md:w-1/2">
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800 text-left">First Name</p>
              <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">
              { userData ? userData.first_name : '' }
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800 text-left">Last Name</p>
              <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">
              { userData ? userData.last_name : '' }
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800 text-left">Email</p>
              <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">
              { userData ? userData.email : '' }              
              </div>
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
