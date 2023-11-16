import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";
import { BaseUrl } from "../../utils/Constants";
import GoogleImage from "../../assets/Image/google2.png";
import "react-toastify/dist/ReactToastify.css";
import { ShowToast } from "../../utils/Toats";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loding from "../loading/Loding";

export function LoginPage() {

  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  
  const send_otofromik = useFormik({
    initialValues: {
      email: "",
     
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("* Email is Required"),

    }),
    onSubmit: (values) => {
      SendOTP(values);
    },
  });


  const registrationFormik = useFormik({
    initialValues: {
      email: "",
      first_name : "",
      last_name  : "",
      password : "",
      c_password : ""
     
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("* required"),
        first_name : Yup.string().required("first name is Required"),
        last_name : Yup.string().required("first name is Required"),
        password: Yup.string().required("Password is required").matches(/^\S*$/, "Password must not contain spaces"),
        c_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),

    }),
    onSubmit: (values) => {
      Signup(values);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required").matches(/^\S*$/, "Password must not contain spaces"),
    }),
    onSubmit: (values) => {
      loginWithUsername(values);
    },
  });

  const [isVerify, setisVerify] = useState(false);
  const [otpform, setotpform] = useState(false);
  const [isemail, setisemail] = useState(true);
  const [otp, setotp] = useState("");
  let navigate = useNavigate();
  const [regDatas, setregDatas] = useState("");
  const [logDatas, setlogDatas] = useState("");
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
          const { data } = res;
          if (isLogin) {
            var datas = { email: data.email, password: data.email };
            loginWithUsername(datas);
          } else {
            var datas = {
              email: data.email,
              first_name: data.given_name,
              last_name: data.family_name,
              password: data.email,
              cpassword: data.email,
            };
            Signup(datas);
          }

          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const loginWithUsername = (data) => {
    handleLoading();
    const datas = data ? data : logDatas;
    if (datas) {
      axios
        .post(`${BaseUrl}/user/token/`, datas)
        .then((res) => {
          const { access, refresh } = res.data;
          localStorage.setItem("token", access);
          localStorage.setItem("refresh", refresh);
          ShowToast("Login Succesfull", true);
          handleLoading();
          return navigate("/");
        })
        .catch((err) => {
          console.log(err.response);
          var { detail } = err.response.data
            ? err.response.data
            : "Something Went Wrong";
          ShowToast(detail, false);
          handleLoading();
        });
    }
  };


  const Signup = (data) => {
    handleLoading();
    const datas = data ? data : regDatas;
    axios
    .post(`${BaseUrl}/user/`, datas)
    .then((res) => {
      ShowToast("User Registered Succesfully", true);
      handleLoading();
      var logindata = {
        username: datas.email,
        password: datas.password,
      };
      setisLogin(true);
      setregDatas("");
    })
    .catch((err) => {
      var { message } = err.response.data
        ? err.response.data
        : "Something Went Wrong";
      ShowToast(message, false);
      handleLoading();
    });
  };

  const SendOTP = (values) => {
    handleLoading()
    axios
      .post(`${BaseUrl}/send-otp/`, values)
      .then((res) => {
        ShowToast("OTP Send To the Email", true);
        handleLoading();
        setotpform(true);
        setisemail(false);
        setregDatas({
          ...regDatas , email : values.email
        })
      })
      .catch((err) => {
        var { message } = err.response.data
          ? err.response.data
          : "Server Error";
        ShowToast(message, false);
        handleLoading();
      });
  };

  const verifyOTP = () => {
    handleLoading()
    console.log( regDatas )
    console.log( otp )
    axios
      .post(`${BaseUrl}/verify/`, { email: regDatas.email, otp: otp })
      .then((res) => {
        ShowToast("OTP Verifiled", true);
        handleLoading();
        setisVerify(true);
        registrationFormik.setValues({
          ...registrationFormik.values,
          email: regDatas.email,
         
        });
      })
      .catch((err) => {
        ShowToast("Invalid OTP", false);
        handleLoading();
      });
  };

  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 mt-10 mx-10 gap-10  h-full">
      { loading && <Loding/> }
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
                  <p className="mt-8 text-3xl font-serif text-deep-orange-900">
                    {" "}
                    Login{" "}
                  </p>
                  <div className="w-96 mt-7">
                    <Input
                      label="Email"
                      type="email"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div className="text-red-500">{formik.errors.username}</div>
                    ) : null}
                  </div>
                  <div className="w-96 mt-5">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500">{formik.errors.password}</div>
                    ) : null}
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
                      <div
                        className="flex items-center p-2 rounded-lg h-10  text-black border-2 border-gray-400"
                        onClick={() => login()}
                      >
                        <img
                          src={GoogleImage}
                          alt="Google Icon"
                          className="h-8  bg-white rounded-full p-1"
                        />
                        <p className="mx-2 ">Sign In With google</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="bg-deep-orange-500 h-10 ml-40 mx-auto "
                        onClick={formik.handleSubmit}
                      >
                        LOGIN
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <p
                className="mt-7 text-light-blue-800"
                onClick={() => setisLogin(false)}
              >
                {" "}
                Signup Here{" "}
              </p>
            </div>
          ) : (
            <div className="">
              <form>
                <div className="flex-col items-center">
                  <p className="mt-8 text-3xl font-serif text-deep-orange-900">
                    {" "}
                    Register{" "}
                  </p>
                  {!isVerify ? (
                    <>
                      {isemail ? (
                        <>
                          <div className="w-96 mt-14">
                          <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={send_otofromik.values.email}
                      onChange={send_otofromik.handleChange}
                      onBlur={send_otofromik.handleBlur}
                    />
                    {send_otofromik.touched.email && send_otofromik.errors.email ? (
                      <div className="text-red-500">{send_otofromik.errors.email}</div>
                    ) : null}
                  </div>
                          <Button
                            className="mt-10 bg-deep-orange-500 ml-64"
                            onClick={send_otofromik.handleSubmit}
                          >
                            {" "}
                            Send OTP{" "}
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                      {otpform ? (
                        <>
                          <div className="w-96 mt-14">
                            <Input
                              label="OTP"
                              type="text"
                              value={otp}
                              onChange={(e) => setotp(e.target.value)}
                            />
                          </div>
                          <Button
                            className="mt-10 bg-deep-orange-500 ml-64"
                            onClick={() => verifyOTP()}
                          >
                            {" "}
                            Verify OTP{" "}
                          </Button>
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-96 mt-5">
                    <Input
                      label="First Name"
                      type="text"
                      name="first_name"
                      value={registrationFormik.values.first_name}
                      onChange={registrationFormik.handleChange}
                      onBlur={registrationFormik.handleBlur}
                    />
                    {registrationFormik.touched.first_name && registrationFormik.errors.first_name ? (
                      <div className="text-red-500">{registrationFormik.errors.first_name}</div>
                    ) : null}
                  </div>
                  <div className="w-96 mt-5">
                    <Input
                      label="Last Name"
                      type="text"
                      name="last_name"
                      value={registrationFormik.values.last_name}
                      onChange={registrationFormik.handleChange}
                      onBlur={registrationFormik.handleBlur}
                    />
                    {registrationFormik.touched.last_name && registrationFormik.errors.last_name ? (
                      <div className="text-red-500">{registrationFormik.errors.last_name}</div>
                    ) : null}
                  </div>
                      <div className="w-96 mt-5">
                      <Input
                      label="Email"
                      type="email"
                      name="email"
                      disabled={true}
                      value={registrationFormik.values.email}
                      onChange={registrationFormik.handleChange}
                      onBlur={registrationFormik.handleBlur}
                    />
                    {registrationFormik.touched.email && registrationFormik.errors.email ? (
                      <div className="text-red-500">{registrationFormik.errors.email}</div>
                    ) : null}
                      </div>
                      <div className="w-96 mt-5">
                    <Input
                      label="Paswword"
                      type="password"
                      name="password"
                      value={registrationFormik.values.password}
                      onChange={registrationFormik.handleChange}
                      onBlur={registrationFormik.handleBlur}
                    />
                    {registrationFormik.touched.password && registrationFormik.errors.password ? (
                      <div className="text-red-500">{registrationFormik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="w-96 mt-5">
                    <Input
                      label="Confirm Password"
                      type="password"
                      name="c_password"
                      value={registrationFormik.values.c_password}
                      onChange={registrationFormik.handleChange}
                      onBlur={registrationFormik.handleBlur}
                    />
                    {registrationFormik.touched.c_password && registrationFormik.errors.c_password ? (
                      <div className="text-red-500">{registrationFormik.errors.c_password}</div>
                    ) : null}
                  </div>
                      <div className="mt-5">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                          />
                          <span className="ml-2 text-gray-700 text-sm">
                            I agree to the Privacy Policy and Terms and
                            Conditions
                          </span>
                        </label>
                      </div>
                      <div className="flex justify-between mt-5">
                        <div>
                          <div
                            className="flex items-center p-2 rounded-lg h-10  text-black border-2 border-gray-400"
                            onClick={() => login()}
                          >
                            <img
                              src={GoogleImage}
                              alt="Google Icon"
                              className="h-8  bg-white rounded-full p-1"
                            />
                            <p className="mx-2 ">Sign In With google</p>
                          </div>
                        </div>
                        <div>
                          <Button
                            className="bg-deep-orange-500 h-10 ml-40 mx-auto "
                            onClick={registrationFormik.handleSubmit}
                          >
                            SIGNUP
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </form>
              <p
                className="mt-5 text-light-blue-800"
                onClick={() => setisLogin(true)}
              >
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
