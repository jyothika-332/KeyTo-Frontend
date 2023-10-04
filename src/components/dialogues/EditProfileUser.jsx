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
 
export function EditProfileUser({data}) {
  const [open, setOpen] = React.useState(false); 
  const handleOpen = () => setOpen(!open);
  const [Data, setData] = React.useState("");

 
  return (
    <>
        <Button className="bg-deep-orange-500" onClick={handleOpen}>
            Edit Profile
        </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="text-deep-orange-900">Edit Profile</DialogHeader>
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
                value={data.first_name ? data.first_name : ""}
                onChange={(e) =>
                  setData({ ...Data, first_name: e.target.value })
                }
              />
              <Input
                label="Last Name"
                value={data.last_name ? data.last_name : ""}
                onChange={(e) =>
                  setData({ ...Data, last_name: e.target.value })
                }
              />
              <Input
                label="Email"
                value={data.email ? data.email : ""}
                onChange={(e) => setData({ ...Data, email: e.target.value })}
              />
              <Input
                label="Username"
                value={data.email ? data.email : ""}
                onChange={(e) => setData({ ...Data, email: e.target.value })}
              />
              <Input
                label="Image"
                type="file"
                onChange={(e) => setData({ ...Data, image: e.target.files[0] })}
              />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button className="bg-deep-orange-500" onClick={handleOpen}>
            update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}