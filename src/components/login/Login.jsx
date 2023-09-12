import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [isLogin, setisLogin] = useState(true);
  return (
    <Card className="w-full h-screen md:flex-row flex-col rounded-none">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full md:w-2/4  shrink-0 rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1560440021-33f9b867899d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1559&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <div className="grid grid-cols-1  container mx-auto p-10">
        <div className="bg-white flex justify-around mt-8">
          <div>
            <Button
              className={isLogin ? " bg-deep-orange-500" : "bg-brown-300"}
              onClick={() => setisLogin(true)}
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              className={!isLogin ? "bg-deep-orange-500" : "bg-brown-300"}
              onClick={() => setisLogin(false)}
            >
              SIGNUP
            </Button>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center">
          {isLogin ? (
            <div className="">
              <div>
                <p> Login Form </p>
                <div className="w-96 mt-8">
                  <Input label="Email" type="text"/>
                </div>
                <div className="w-96 mt-8">
                  <Input label="Password" type="password"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-5">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700 text-sm">Remember Me</span>
                    </label>
                  </div>
                  <div className="mt-5 ml-16 text-sm">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex-col items-center">
                <p className=""> Register Form </p>
                <div className="w-96 mt-8">
                  <Input label="First Name" type="text" />
                </div>
                <div className="w-96 mt-8">
                  <Input label="Last Name" type="text" />
                </div>
                <div className="w-96 mt-8">
                  <Input label="Email" type="email" />
                </div>
                <div className="w-96 mt-8">
                  <Input label="Password" type="password" />
                </div>
                <div className="w-96 mt-8">
                  <Input label="Confirm Password" type="password" />
                </div>
                <div className="mt-8">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4"
                      />
                      <span className="ml-2 text-gray-700 text-sm">I agree to the Privacy Policy and Terms and Conditions</span>
                    </label>
                  </div>
              </div>
            </div>
          )}
        </div>

        {isLogin ? (
          <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto">
            LOGIN
          </Button>
        ) : (
          <Button className="bg-deep-orange-500 h-10 ml-40 mx-auto mt-5">
            SIGNUP
          </Button>
        )}
      </div>
    </Card>
  );
}
