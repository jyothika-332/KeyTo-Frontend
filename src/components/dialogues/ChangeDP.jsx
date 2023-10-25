import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import avatar from "../../assets/Image/avatar.png";
import { BaseUrl } from "../../utils/Constants";
import { ShowToast } from "../../utils/Toats";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function ChangeDp({ next }) {

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);


  const UpdateDP = () => {
    const formData = new FormData();
    formData.append('profile_image', image);
    formData.append('id', jwtDecode(localStorage.getItem("token")).user_id);
    console.log(image);
    console.log ( jwtDecode(localStorage.getItem("token")))
    axios.put(`${BaseUrl}/user/`, formData)
      .then((res) => {
        ShowToast('Profile Image Update Successfully', true);
        next();
        handleOpen();
      })
      .catch((error) => {
        console.error('Error updating profile image:', error);
      });
  };

  

  return (
    <>
      <Tooltip content="Change Profile">
        <CameraIcon
          onClick={handleOpen}
          className="text-red-500 hover:text-white cursor-pointer"
        />
      </Tooltip>

      <Dialog open={open} handler={handleOpen} size="xs" staticBackdrop>
        <DialogHeader className="text-deep-orange-900">
          Change Profile Image
        </DialogHeader>
        <DialogBody>
          <div className="flex justify-center">
            <img
              src={image ? URL.createObjectURL(image) : avatar}
              className="w-40 h-40 rounded-full"
              alt="Preview"
            />
          </div>
          <Input type="file" onChange={handleImageChange} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button className="bg-deep-orange-500" onClick={UpdateDP}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
