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
import { Link, useNavigate } from "react-router-dom";


export function AdminSidebar() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const Logout = () => {
      localStorage.clear();
      navigate("/admin_login");
  };

  return (
    <Card className="h-[calc(94vh-2rem)] w-72 max-w-[20rem] fixed rounded-none p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-gray-200">
      <List>
        <Accordion open={open === 1}>
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                <Link to="/admin/admin_dashboard">Dashboard</Link>
              </Typography>
            </AccordionHeader>
          </ListItem>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/admin_userlist">Users</Link>
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        <Link to="/admin/admin_bannerlist">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Banners
          </ListItem>
        </Link>
        <Accordion open={open === 2}>
          <Link to="/admin/admin_propertylist">
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Properties
                </Typography>
              </AccordionHeader>
            </ListItem>
          </Link>
        </Accordion>
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
