import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ShowToast } from '../../utils/Toats';
import axios from 'axios';
import { BaseUrl } from '../../utils/Constants';

function Reset_Password() {
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  let { token , user} = useParams()
  let navigate = useNavigate()
  useEffect(() => {
    console.log( token )
  }, []);

  const ResetPassword = () => {
      if (cpassword === "" || password === "")
      {
        ShowToast("Please Fill Fields", false)
      }
      else
      {
         if ( password != cpassword)
         {
          ShowToast("Password and Confirm Password are not Same" , false)
         }
         else
         {
          axios.post(`${BaseUrl}/user/reset-password/`,{
            token : token ,
            password : password,
            user : user
          })
          .then((res) => {
            ShowToast("Password Changed Succesfully" , true)
            navigate('/login')
          })
          .catch((err) => {
            var { message }= err.response.data ?err.response.data : "Something Went Wrong"
      ShowToast(message , false )
          })
         }
      }
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
              Reset Password
            </Typography>
          </div>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 mt-4">
            <Input label="New Password" size="lg" value={password} onChange={(e)=>setpassword(e.target.value)} />
            <Input label="Confirm Password" size="lg" value={cpassword} onChange={(e)=>setcpassword(e.target.value)} />
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            <Button className="bg-deep-orange-500" fullWidth onClick={ResetPassword}>
              submit
            </Button>
          </CardFooter>
        </Card>
      </div>
      </div>
    </div>
  )
}

export default Reset_Password