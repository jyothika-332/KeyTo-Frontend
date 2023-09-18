import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";
import { BaseUrl } from "../../utils/Constants";

export function LoginPage() {
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
          console.log ("------------------------------------------------------------")
          // setgUser(res.data);
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
        console.log ( res)
        const { access } = res.data
        console.log ( data)
        localStorage.setItem('token' , access)
        return navigate('/')

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

  const Signup =  (data) => {
    const datas = data ? data : regDatas
    if ( datas )
    {
      if ( datas.password != datas.cpassword){
        window.alert("Invalid Confirm Password")
      }
      else
      {
        axios.post(`${BaseUrl}/user/`,datas)
        .then((res) => {
            window.alert("User Registered Succesfully")
            // setregDatas("")
            // setisLogin(true)
         
            var logindata = {
              username : datas.email,
              password : datas.password
            }
            loginWithUsername( logindata )
        })
        .catch((err) => {
          console.log ( err)
           var { message } = err.response.data ? err.response.data : 'Sometging Went Wrong'
          window.alert(message)
        })
      }
    }
    else
    {
      window.alert("Please Fill All Fields")
    }
    
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
                  <div className="flex justify-around">
                    <Button
                      className="border-black border-2 bg-white text-black mt-5"
                      onClick={() => login()}
                    >
                      Sign up With google
                    </Button>
                    <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto mt-5" onClick={(e) => loginWithUsername(null)}>
                      LOGIN
                    </Button>
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
                  <div className="w-96 mt-6">
                    <Input label="First Name" type="text" value={ regDatas.first_name ? regDatas.first_name : ''} onChange={(e)=>setregDatas({...regDatas , first_name : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Last Name" type="text" value={ regDatas.last_name ? regDatas.last_name : ''} onChange={(e)=>setregDatas({...regDatas , last_name : e.target.value })} />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Email" type="email" value={ regDatas.email ? regDatas.email : ''} onChange={(e)=>setregDatas({...regDatas , email : e.target.value })} />
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
                  <div className="flex justify-around">
                    <Button
                      className="border-black border-2 bg-white text-black mt-5"
                      onClick={() => login()}
                    >
                      Sign up With google
                    </Button>
                    <Button onClick={(e)=>Signup(null)} className="bg-deep-orange-500 h-10 ml-40 mx-auto mt-5">
                      SIGNUP
                    </Button>
                  </div>
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
