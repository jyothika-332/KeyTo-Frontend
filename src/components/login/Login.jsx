import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";
import { BaseUrl } from "../../utils/Constants";
import GoogleImage from "../../assets/Image/google2.png";
import 'react-toastify/dist/ReactToastify.css';
import { ShowToast } from "../../utils/Toats";


export function LoginPage() {

  const [isVerify, setisVerify] = useState(false)
  const [otpform, setotpform] = useState(false)
  const [isemail, setisemail] = useState(true)
  const [otp, setotp] = useState("")
  let navigate = useNavigate()
  const [regDatas, setregDatas] = useState("")
  const [logDatas, setlogDatas] = useState("")
  const [isLogin, setisLogin] = useState(true);
  const [user, setUser] = useState([]);
  const [guser, setgUser] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });


  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const { data  } = res
          if (isLogin) {
            var datas = { username :data.email , password : data.email}
              loginWithUsername(datas)
          }
          else
          {

      
        
        var datas = {
          email : data.email,
          first_name : data.given_name,
          last_name : data.family_name,
          password : data.email,
          cpassword : data.email
        }
        Signup( datas )
      }
          
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);



  const loginWithUsername = (data) => {
    const datas = data ? data : logDatas
    if (datas)
    {
      axios.post(`${BaseUrl}/user/token/`,datas).then((res) => {
        const { access , refresh } = res.data
        
        localStorage.setItem('token' , access)
        localStorage.setItem('refresh' , refresh)
        ShowToast("Login Succesfull" , true )

        return navigate('/')

      })
      .catch((err) => {
        console.log ( err.response)       
         var { detail } = err.response.data ? err.response.data : 'Something Went Wrong'
    
          ShowToast(detail , false )
         
      })
    }
    else{
      ShowToast("Please Fill All Fields",false)
    }
  }

  const Signup =  (data) => {
    const datas = data ? data : regDatas
    if ( datas )
    {
      if ( datas.password != datas.cpassword){
        ShowToast("Invalid Confirm Password", false)
      }
      else
      {
        axios.post(`${BaseUrl}/user/`,datas)
        .then((res) => {

          ShowToast("User Registered Succesfully", true)  
         
            var logindata = {
              username : datas.email,
              password : datas.password
            }
            setisLogin(true)
            setregDatas("")
        })
        .catch((err) => {
          var { message } = err.response.data ? err.response.data : 'Something Went Wrong'
          ShowToast(message, false)
        })
      }
    }
    else
    {
      ShowToast("Please Fill All Fields", false)
    }
    
  }

  const SendOTP = () => {
    axios.post(`${BaseUrl}/send-otp/`,{ email : regDatas.email})
    .then((res) => {
      ShowToast("OTP Send To the Email", true)
      setotpform(true)
      setisemail(false)
    })
    .catch((err) => {
      var { message } = err.response.data ? err.response.data : "Server Error"
      ShowToast(message, false)
    })
  }

  const verifyOTP = () => {
      axios.post(`${BaseUrl}/verify/`,{ "email" : regDatas.email , "otp" : otp})
      .then((res) => {
        ShowToast("OTP Verifiled", true)
        setisVerify(true)
      })
      .catch((err) => {
        ShowToast("Invalid OTP", false)
      })
  }


  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 mt-10 mx-10 gap-10  h-full">
      <div className="">
        <img
          src={Image1}
          alt="card-image"
          className="h-96 mt-10 w-full object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-rows-3 md:grid-rows-1">
        <div className="md:col-span-2 flex justify-center">
          {isLogin ? (
            <div className=" ">
              <form>
                <div className="flex-col items-center">
                  <p className="mt-8 text-3xl font-serif text-deep-orange-900"> Login </p>
                  <div className="w-96 mt-7">
                    <Input label="Email" type="email" value={ logDatas.username ? logDatas.username : ''} onChange={(e)=>setlogDatas({...logDatas, username : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Password" type="password" value={ logDatas.password ? logDatas.password : ''} onChange={(e)=>setlogDatas({...logDatas, password : e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mt-5">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                        />
                        <span className="ml-2 text-gray-700 text-sm">
                          Remember Me
                        </span>
                      </label>
                    </div>
                    <div className="mt-5 ml-16 text-sm">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                  </div>
                  <div className="flex justify-between mt-5"> 
                    <div>
                      <div className="flex items-center p-2 rounded-lg h-10  text-black border-2 border-gray-400"  onClick={() => login()}>
                        <img src={GoogleImage} alt="Google Icon" className="h-8  bg-white rounded-full p-1" /> 
                        <p className="mx-2 ">Sign In With google</p>
                      </div>
                    </div>
                    <div>
                      <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto " onClick={(e) => loginWithUsername(null)}>
                        LOGIN
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <p className="mt-7 text-light-blue-800" onClick={() => setisLogin(false)}>
                {" "}
                Signup Here{" "}
              </p>
            </div>
          ) : (
            <div className="">
              <form>
                <div className="flex-col items-center">
                  <p className="mt-8 text-3xl font-serif text-deep-orange-900"> Register </p>
                  {
                    !isVerify ? 
                    <>
                    {
                        isemail ? 
                        <>
                        <div className="w-96 mt-14">
                    <Input label="Email" type="email" value={ regDatas.email ? regDatas.email : ''} onChange={(e)=>setregDatas({...regDatas , email : e.target.value })} />
                  </div>
                  <Button className="mt-10 bg-deep-orange-500 ml-64" onClick={()=>SendOTP()}> Send OTP </Button>

                  </> : ''
                    }
                    {
                      otpform ? 
                      <>
                    <div className="w-96 mt-14">
                    <Input label="OTP" type="text" value={ otp } onChange={(e)=>setotp(e.target.value)} />
                  </div>
                  <Button className="mt-10 bg-deep-orange-500 ml-64" onClick={()=>verifyOTP()}> Verify OTP </Button>
                  </> : ''
                    }
                    
                 
                  </> : <>
                  <div className="w-96 mt-6">
                    <Input label="First Name" type="text" value={ regDatas.first_name ? regDatas.first_name : ''} onChange={(e)=>setregDatas({...regDatas , first_name : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Last Name" type="text" value={ regDatas.last_name ? regDatas.last_name : ''} onChange={(e)=>setregDatas({...regDatas , last_name : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Email" disabled={true} type="email" value={ regDatas.email ? regDatas.email : ''} onChange={(e)=>setregDatas({...regDatas , email : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Password" type="password" value={ regDatas.password ? regDatas.password : ''} onChange={(e)=>setregDatas({...regDatas , password : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Confirm Password" type="password" value={ regDatas.cpassword ? regDatas.cpassword : ''} onChange={(e)=>setregDatas({...regDatas , cpassword : e.target.value })} />
                  </div>
                  <div className="mt-5">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700 text-sm">
                        I agree to the Privacy Policy and Terms and Conditions
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-between mt-5"> 
                    <div>
                      <div className="flex items-center p-2 rounded-lg h-10  text-black border-2 border-gray-400"  onClick={() => login()}>
                        <img src={GoogleImage} alt="Google Icon" className="h-8  bg-white rounded-full p-1" /> 
                        <p className="mx-2 ">Sign In With google</p>
                      </div>
                    </div>
                    <div>
                      <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto " onClick={(e) => Signup(null)}>
                        SIGNUP
                      </Button>
                    </div>
                  </div>
                  </>
                  }
                  
                </div>
              </form>
              <p className="mt-5 text-light-blue-800" onClick={() => setisLogin(true)}>
                {" "}
                Login Here{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
