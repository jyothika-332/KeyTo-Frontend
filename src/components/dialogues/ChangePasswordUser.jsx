import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import { ShowToast } from "../../utils/Toats";


 
export function ChangePasswordUser() {

  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const [open, setOpen] = React.useState(false);
  const [Datas, setDatas] = React.useState("");
  const handleOpen = () => setOpen((cur) => !cur);

  const ChangePass = () => {
      setLoading(true)
      if ( Datas.newpass != Datas.newcpass)
      {
        ShowToast("Mismatch Password", false)
      }
      else
      {
        var data  = { 
          "id" : jwtDecode(localStorage.getItem("token")).user_id,
          "oldpass" : Datas.oldpass,
          "newpass" : Datas.newpass
        }
        axios.post(`${BaseUrl}/user/changepassword/`,data)
        .then((res) => {
          ShowToast("Password Changed Succesfully", true)
          setLoading(false)
          localStorage.clear()
          window.location.href = '/'
        })
        .catch((err)=> {
          var { message} = err.response.data ? err.response.data : "Something Went Wrong"
          ShowToast(message,false)
          setLoading(false)
        })
      }
  }
 
  return (
    <>
      <Button className="bg-deep-orange-500" onClick={handleOpen}>Change Password</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
            <Typography variant="h5" className="text-deep-orange-900 text-center mt-10">
              Change Password
            </Typography>
          <CardBody className="flex flex-col gap-4 mt-5">
            <Input label="Current Password" value={ Datas.oldpass ? Datas.oldpass : ""} onChange={(e)=>setDatas({...Datas , oldpass : e.target.value})} size="lg" type="password"/>
            <Input label="New Password" value={ Datas.newpass ? Datas.newpass : ""} onChange={(e)=>setDatas({...Datas , newpass : e.target.value})} size="lg" type="password"/>
            <Input label="Confirm Password" value={ Datas.newcpass ? Datas.newcpass : ""} onChange={(e)=>setDatas({...Datas , newcpass : e.target.value})} size="lg" type="password"/>
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            {loading ?
            (<Button className="bg-deep-orange-500" fullWidth>
              Submiting...
            </Button>
            ) : (
            <Button className="bg-deep-orange-500" onClick={ChangePass} fullWidth>
              Submit
            </Button>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}