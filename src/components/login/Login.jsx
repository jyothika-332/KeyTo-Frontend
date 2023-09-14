import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";

export function LoginPage() {
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
          setgUser(res.data);
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

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
                  <p className="mt-8 text-3xl font-serif text-deep-orange-900"> Login Form </p>
                  <div className="w-96 mt-7">
                    <Input label="Email" type="email" />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Password" type="password" />
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
                    <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto mt-5">
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
                  <p className="mt-8 text-3xl font-serif text-deep-orange-900"> Register Form </p>
                  <div className="w-96 mt-6">
                    <Input label="First Name" type="text" />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Last Name" type="text" />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Email" type="email" />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Password" type="password" />
                  </div>
                  <div className="w-96 mt-5">
                    <Input label="Confirm Password" type="password" />
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
                    <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto mt-5">
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
