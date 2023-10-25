import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BaseUrl } from "../../utils/Constants";
import { ShowToast } from "../../utils/Toats";

function ForgotPassword() {
  const [email, setemail] = useState("");

  const SendResetLink = () => {
    axios.post(`${BaseUrl}/user/send-resetlink/`,{ "email" : email})
    .then((res) => {
      ShowToast("Link Send to Your Email , Please Check" , false )
    }).catch((err) => {
      var { message }= err.response.data ?err.response.data : "Something Went Wrong"
      ShowToast(message , false )
    })
  }
  return (
    <div className="h-screen">
      <div className="bg-deep-orange-400 h-60">
      <div className="flex justify-center relative pt-44">
        <Card className="w-96 h-96">
          <CardHeader
            className="mb-4 grid h-28 place-items-center bg-deep-orange-100"
          >
          <div className="flex justify-center">
            <Typography className="text-black font-serif text-2xl">
              Forgot Password
            </Typography>
          </div>
          </CardHeader>
          <Typography className="flex justify-center text-xs mt-7">
            Enter your email and we'll send you a link to reset your password.
          </Typography>
          <CardBody className="flex flex-col gap-4 mt-4">
            <Input label="Email" size="lg" value={email} onChange={(e)=>setemail(e.target.value)} />
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            <Button className="bg-deep-orange-500" fullWidth onClick={SendResetLink}>
              submit
            </Button>
            <Link to='/login'>
            <Typography variant="small" className="mt-6 flex justify-center">
              <div className="mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 transform rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
            </div>
              <p className="ml-2">Back to Login</p>
            </Typography>
            </Link>
          </CardFooter>
        </Card>
      </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
