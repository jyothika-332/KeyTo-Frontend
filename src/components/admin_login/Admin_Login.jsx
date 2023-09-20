import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
   
  export function SimpleRegistrationForm() {
    let navigate = useNavigate()
    const [logDatas, setlogDatas] = useState("")


    const loginWithUsername = () => {
      
      if (logDatas)
      {
        axios.post(`${BaseUrl}/user/token/`,logDatas).then((res) => {
          console.log ( res)
          const { access } = res.data
          if (jwtDecode(access).role != "admin")
          {
            window.alert("You Dont Have The Permission to Login Here")
          }
          else{
          localStorage.setItem('token' , access)
          return navigate('/admin/admin_dashboard')

          }
  
        })
        .catch((err) => {
          console.log ( err)
           var { message } = err.response.data ? err.response.data : 'Sometging Went Wrong'
          window.alert(message)
        })
      }
      else{
        window.alert("Please Fill Datas")
      }
    }



    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="mt-10 font-serif text-deep-orange-900 text-3xl">
          Login
        </Typography>
        <form className="mt-10 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" value={ logDatas.username ? logDatas.username : ''}  onChange={(e)=>setlogDatas({...logDatas , username :e.target.value})} />
            <Input type="password" size="lg" label="Password" value={ logDatas.password ? logDatas.password : ''}  onChange={(e)=>setlogDatas({...logDatas , password :e.target.value})} />
          </div>
          <Button onClick={loginWithUsername} className="mt-10 bg-deep-orange-500" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    );
  }