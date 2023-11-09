import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import "react-toastify/dist/ReactToastify.css";
import { ShowToast } from "../../utils/Toats";

export function EditProfileSeller({ data, setData, next }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [details, setDetails] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    phone: data.phone,
    address: data.address,
  });

  const UpdateDatas = () => {
    axios
      .patch(`${BaseUrl}/user/updateseller/${data.id}/`, details)
      .then((res) => {
        ShowToast("User Updated Suc}cesfully", true);
        next();
        handleOpen();
      });
  };

  return (
    <>
      <Button className="bg-deep-orange-500" onClick={handleOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="text-deep-orange-900">
            Edit Profile
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
            <Input
              label="First Name"
              defaultValue={data.first_name ? data.first_name : ""}
              onChange={(e) =>
                setDetails({ ...details, first_name: e.target.value })
              }
            />
            <Input
              label="Last Name"
              defaultValue={data.last_name ? data.last_name : ""}
              onChange={(e) =>
                setDetails({ ...details, last_name: e.target.value })
              }
            />
            <Input
              type="number"
              label="Phone Number"
              defaultValue={data.phone ? data.phone : ""}
              onChange={(e) =>
                setDetails({ ...details, phone: e.target.value })
              }
            />
            <Input
              label="Address"
              defaultValue={data.address ? data.address : ""}
              onChange={(e) =>
                setDetails({ ...details, address: e.target.value })
              }
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button className="bg-deep-orange-500" onClick={UpdateDatas}>
            update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
