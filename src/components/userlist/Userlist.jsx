import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["First_name", "Email", "Role", "Premium","Status",""];

 

function Userlist() {
  const tableStyle = {
    borderCollapse: "separate",
    borderSpacing: "10px", // Adjust the value to set the desired gap
  };

  const [userList, setuserList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
        if ( jwtDecode(localStorage.getItem("token")).role != "admin")
        {
            localStorage.clear();
            window.location.href = "/";
        }
        else{
      getUserData();

        }
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  const getUserData =  () => {
    axios
      .get(`${BaseUrl}/user/`)
      .then((res) => {
        console.log(res);
        setuserList(res.data);
      })
      .catch((err) => {
        localStorage.clear();
        window.location.href = "/";
      });
  };
  const TABLE_ROWS = userList


  return (
    <Card className="h-full w-full">
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map(({ first_name, email, role,is_premium,is_active }, index) => {
          const isLast = index === TABLE_ROWS.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={name}>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {first_name}
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {email}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {role}
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {is_premium}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {is_active}
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  <Tooltip content="Edit User">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>

  );
}

export default Userlist;
