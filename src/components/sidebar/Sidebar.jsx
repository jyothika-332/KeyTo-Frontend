import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

 
export function SidebarWithContentSeparator() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const Logout = () => {
    if (window.confirm("Do You Want to Logout")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };
 
  return (
    <Card className="h-[calc(94vh-2rem)] w-full fixed rounded-none max-w-[20rem] bg-blue-gray-100 p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Accordion
          open={open === 1}
        >
          <Link to='/agent/seller_dashboard'>
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          </Link>
        </Accordion>
        <Accordion
          open={open === 2}
        >
          <Link to='/agent/seller_mylisting'>
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                My Properties
              </Typography>
            </AccordionHeader>
          </ListItem>
          </Link>
          <Link to='/agent/create_listing'>
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Create Listing
              </Typography>
            </AccordionHeader>
          </ListItem>
          </Link>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
        </ListItem>
        <Link to="/premium">
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Pricing
        </ListItem>
        </Link>
        <Link to="/agent/profile">
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>
        <ListItem onClick={() => Logout()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}