import React from "react";
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
 
export function ChangePasswordUser() {
  const [open, setOpen] = React.useState(false);
  const [Datas, setDatas] = React.useState("");
  const handleOpen = () => setOpen((cur) => !cur);

  const ChangePass = () => {
  
      if ( Datas.newpass != Datas.newcpass)
      {
        window.alert("Mismatch Password")
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
          window.alert("Password Changed Succesfully")
          localStorage.clear()
          window.location.href = '/'
        })
        .catch((err)=> {
          var { message} = err.response.data ? err.response.data : "Something Went Wrong"
          window.alert(message)
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
            <Button className="bg-deep-orange-500" onClick={ChangePass} fullWidth>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}