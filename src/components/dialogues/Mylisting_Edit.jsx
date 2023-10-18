import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";


export function MylistEdit({ open, handleOpen , Data , setData , next }) {


  const Update = () => {
    let formData = new FormData();
    formData.append("title", Data.title);
    formData.append("description", Data.description);
    formData.append("id", Data.id);
    formData.append("location", Data.location);
  
    // Check if Data.image is a valid file before appending it
    if (Data.image && Data.image instanceof File) {
      formData.append("image", Data.image);
    }
  
    if (Data.id) {
      axios.put(`${BaseUrl}/property/`, formData)
        .then((res) => {
          console.log("Update successful:", res.data);
          handleOpen();
          setData("");
          next();
        })
        .catch((error) => {
          console.error("Update failed:", error);
        });
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="text-deep-orange-900">
            Edit Property
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
          <div className="grid gap-6 mt-5">
            <Input label="Image" type="file" onChange={(e) => setData({ ...Data, image: e.target.files[0] })} />
            <Input label="Title" type="text" value={Data.title ? Data.title : ""} onChange={(e) => setData({ ...Data, title: e.target.value })} />
            <Input label="Location" type="text" value={Data.location ? Data.location : ""} onChange={(e) => setData({ ...Data, location: e.target.value })} />
            <Textarea label="Description" value={Data.description ? Data.description : ""} onChange={(e) => setData({ ...Data, description: e.target.value })} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button className="bg-deep-orange-500" onClick={() =>{ console.log(Data.id); Update(Data.id); }}>
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
