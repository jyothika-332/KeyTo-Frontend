import React,{useState,useEffect} from "react";
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
import jwtDecode from "jwt-decode";


 
export function SidebarWithContentSeparator() {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const Logout = () => {
      localStorage.clear();
      window.location.href = "/";
  };
 

  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role); 
    }
  }, []);



  return (
    <Card className="h-[calc(94vh-2rem)] w-72 fixed rounded-none max-w-[20rem] bg-blue-gray-100 p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Accordion open={open === 1}>
          {role == 'seller' ?
          (<Link to='/agent/seller_dashboard'>
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
          </Link>) :
          (<ListItem className="p-0" selected={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Dashboard
            </Typography>
          </AccordionHeader>
        </ListItem>)
        }
        </Accordion>
        <Accordion open={open === 2}>
          {role == 'seller' ? 
          (<Link to='/agent/seller_mylisting'>
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
          </Link>) :
          ( <ListItem className="p-0" selected={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              My Properties
            </Typography>
          </AccordionHeader>
        </ListItem>
        )
        }
        {role == 'seller' ?
          (<Link to='/agent/create_listing'>
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
          </Link>) : 
          ( <ListItem className="p-0" selected={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Create Listing
            </Typography>
          </AccordionHeader>
        </ListItem> )
        }
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        {role == 'seller' ?
        (<Link to='/agent/chat_section'>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
        </ListItem>
        </Link>) :
        ( <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
        </ListItem> )
        }
        {role == 'seller' ?
        (<Link to="/premium">
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Pricing
        </ListItem>
        </Link>) : 
        ( <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Pricing
        </ListItem> )
        }
        {role == 'seller' ?
        (<Link to="/agent/profile">
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>) :
        (<Link to="/userprofile">
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>)
        }
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