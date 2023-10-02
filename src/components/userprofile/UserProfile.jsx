import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardHeader,
  Typography,
  CardBody,
  Checkbox,
  CardFooter,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import profileicon from "../../assets/Image/profileicon.png";
import { ChangePasswordUser } from "../dialogues/ChangePasswordUser";
import { EditProfileUser } from "../dialogues/EditProfileUser";

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
        <img src={userData.profile_image ? userData.profile_image : profileicon} className="w-14 sm:w-16 md:w-20"></img>
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
                <EditProfileUser data={userData}/>
              </div>
              <div className="ml-4">
                <ChangePasswordUser />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Dialog open={open} handler={handleOpen}>
          <div className="flex items-center justify-between">
            <DialogHeader >
              
            </DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5"
              onClick={handleOpen}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <DialogBody divider>
            <div className="grid gap-6">
              
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              close
            </Button>
            <Button className="bg-deep-orange-500" onClick={handleOpen}>
              Save
            </Button>
          </DialogFooter>
        </Dialog>
      </div> */}
    </div>
  );
}
