import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
 
export function LogOut() {
  const [open, setOpen] = React.useState(false);
 const navigate = useNavigate()
  const handleOpen = () => setOpen(!open);
  const Logout = () => {
      localStorage.clear();
      navigate('/')
    }
 
  return (
    <>
      <Typography onClick={handleOpen} variant="text" className="text-red-500">
        logout
      </Typography>
      <Dialog
      size="xs"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="rounded-none"
      >
       
        <DialogBody divider>
          Are You Sure Want To Logout
        </DialogBody>
        <DialogFooter>
          <Button
          size="sm"
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 "
          >
            <span>No</span>
          </Button>
          <Button variant="filled" size="sm" color="green" onClick={() => Logout()}>
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}