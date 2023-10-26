import React, { useState } from "react";
import {
  Collapse,
  Typography,
  IconButton,
  Button,
  Avatar,
  Drawer,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/adminSidebar/Admin_Sidebar";

function NavList() {
  const navigate = useNavigate();
  const [isLogedIn, setisLogedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const Logout = () => {
    localStorage.clear();
    navigate("/admin_login");
  };


  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* <Typography
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
      </Typography> */}
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

  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <navbar className=" z-10 rounded-none w-screen fixed ">
      <div className="flex items-center justify-between h-20 px-10 bg-blue-gray-100 text-blue-gray-900">
      <div className="flex items-center">
        <Drawer
          open={open}
          onClose={closeDrawer}
          className="bg-deep-orange-500 w-72"
        >
          <div className="flex items-center justify-between p-2">
            <Typography variant="h5" color="white">
              KeyTo
            </Typography>
            <IconButton variant="text" color="white" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <AdminSidebar />
        </Drawer>
        <div>
          <Bars3Icon
            onClick={openDrawer}
            className="h-10 w-10 mx-5 visible sm:invisible"
            color="black"
          />
        </div>
        <div>
          <Typography
            as="a"
            href="#"
            variant="h6"
            className=" cursor-pointer py-1.5 font-extrabold text-3xl text-red-900"
          >
            KeyTo
          </Typography>
        </div>
      </div>
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
