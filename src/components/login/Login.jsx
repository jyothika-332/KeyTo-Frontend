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
              className={isLogin ? " bg-deep-orange-400" : ""}
              onClick={() => setisLogin(true)}
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              className={!isLogin ? "bg-deep-orange-400" : ""}
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
                <div className="w-72 mt-8">
                  <Input label="Username" />
                </div>
                <div className="w-72 mt-8">
                  <Input label="Password" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-5">
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5" />
                    <span className="ml-2 text-gray-700">Remember Me</span>
                  </label>
                  </div>
                  <div className="mt-5"><Link to="/forgot-password">Forgot password?</Link></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex-col items-center">
                <p className=""> Register Form </p>
                <div className="w-72 mt-8">
                  <Input label="First Name" type="text" />
                </div>
                <div className="w-72 mt-8">
                  <Input label="Last Name" type="text" />
                </div>
                <div className="w-72 mt-8">
                  <Input label="Email" type="email" />
                </div>
                <div className="w-72 mt-8">
                  <Input label="Password" type="password" />
                </div>
                <div className="w-72 mt-8">
                  <Input label="Confirm Password" type="password" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
