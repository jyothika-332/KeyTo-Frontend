import React, { useContext, useState,useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  Button,
  MenuItem,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { SimpleContext } from "../Context/Context";
import { SidebarWithContentSeparator } from "../sidebar/Sidebar";

export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const nvgt = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  const Logout = () => {
    localStorage.clear();
    nvgt("/login");
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {localStorage.getItem("token") ? (
          jwtDecode(localStorage.getItem("token")).role === "user" ? (
            <Link to="/userprofile">
              <MenuItem className="flex items-center ">
                <UserCircleIcon className="h-4 w-4 me-2 " />
                <Typography className="">My Profile</Typography>
              </MenuItem>
            </Link>
          ) : (
            <Link to="/agent/profile">
              <MenuItem className="flex items-center ">
                <UserCircleIcon className="h-4 w-4 me-2 " />
                <Typography className="">My Profile</Typography>
              </MenuItem>
            </Link>
          )
        ) : (
          ""
        )}

        <MenuItem className="flex items-center " onClick={Logout}>
          <PowerIcon className="h-4 w-4 me-2 text-red-500" />
          <Typography className="text-red-500 ">Sign Out</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export function StickyNavbar() {
  const { Datas } = useContext(SimpleContext);
  const [openNav, setOpenNav] = React.useState(false);
  const [is_premium, setis_premium] = useState(false);


  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role); 
    }
  }, []);



  const [isLogedIn, setisLogedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  let navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    if (localStorage.getItem("token")) {
      setis_premium(jwtDecode(localStorage.getItem("token")).is_premium);
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Link to="/property">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Property
          </a>
        </Typography>
      </Link>
      {role === 'user' && (
        <Link to="/user_chat">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a href="#" className="flex items-center">
              Inbox
            </a>
          </Typography>
        </Link>
      )}
      {isLogedIn ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/agent/become_a_seller" className="flex items-center">
            Become a Seller
          </Link>
        </Typography>
      ) : ''}
      {isLogedIn ? (
        ""
      ) : (
        <Link to="/login">
        <Button
          className=" font-normal bg-deep-orange-500 "
        >
           <div className="flex items-center">
            Sign In
            </div>
          </Button>
          </Link>
      )}
      <div className="relative flex w-full gap-2 md:w-max">
        {isLogedIn ? (
          <>
            {is_premium ? (
              <Link to="/premium">
                <Button className="border-2 rounded-xl bg-light-green-700">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-0.5 h-5 w-5 text-yellow-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Premium
                  </div>
                </Button>
              </Link>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </ul>
  );

  return (
    <div className="max-h-[768px] w-screen">
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-90 ">
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
              <SidebarWithContentSeparator />
            </Drawer>
            {role === 'seller' &&
            (<div>
              <Bars3Icon
                onClick={openDrawer}
                className="h-10 w-10 mx-5 visible sm:invisible"
                color="black"
              />
            </div>
            )}
            <div>
              <Typography
                as="a"
                href="#"
                className="font-extrabold text-3xl text-red-900 mx-5 cursor-pointer py-1.5 "
              >
                KeyTo
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {isLogedIn ? <ProfileMenu /> : ""}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </div>
  );
}
