import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
  const [isLogedIn, setisLogedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const Logout = () => {
    if (window.confirm("Do You Want to Logout")) {
      localStorage.clear();
      window.location.href = "/admin_login";
    }
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {isLogedIn ? (
          <a
            href="#"
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </a>
        ) : (
          ""
        )}
      </Typography>
      {isLogedIn ? (
        <Button className="bg-deep-orange-500" onClick={() => Logout()}>
          Logout
        </Button>
      ) : (
        ""
      )}
    </ul>
  );
}

export function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <navbar className=" z-10 rounded-none w-screen  fixed ">
      <div className="flex items-center justify-between h-20 px-10  bg-blue-gray-100 text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 font-extrabold text-3xl text-red-900"
        >
          KeyTo
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </navbar>
  );
}
