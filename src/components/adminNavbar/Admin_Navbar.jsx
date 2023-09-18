import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


 
function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
  as="li"
  variant="small"
  color="blue-gray"
  className="p-1 font-medium"
>
  <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 0a5.89 5.89 0 00-5.877 6.482C3.058 7.918 1 9.515 1 12v2a1 1 0 001 1h16a1 1 0 001-1v-2c0-2.485-2.058-4.082-3.123-5.518A5.89 5.89 0 0010 0zM5.877 4.482A3.894 3.894 0 0110 2a3.895 3.895 0 014.123 2.482C14.484 5.295 12.546 6 10 6s-4.484-.705-4.123-1.518zM12 8a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4z"
        clipRule="evenodd"
      />
    </svg>
    Profile
  </a>
</Typography>
<Button className="bg-deep-orange-500">Logout</Button>

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
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
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
    </Navbar>
  );
}