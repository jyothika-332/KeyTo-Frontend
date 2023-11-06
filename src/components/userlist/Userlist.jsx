import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import { Card, Typography, Button } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";


const TABLE_HEAD = ["First_name", "Last_name", "Email", "Role", "Premium","Status"];


function Userlist() {
  const [page, setpage] = useState(1);
  const tableStyle = {
    borderCollapse: "separate",
    borderSpacing: "10px",
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
  }, [page]);

  const getUserData =  () => {
    axios
      .get(`${BaseUrl}/user/`,{
        params :{
          page : page
        }
      })
      .then((res) => {
        setuserList(res.data);
      })
      .catch((err) => {
        setpage(page-1)
        console.log(err)
      });
  };
  const TABLE_ROWS = userList

  const userManagent = (id,is_active) => {
    axios.put(`${BaseUrl}/user/`, 
        {
          "id":id, 
          "is_active":!is_active
        }
    ).then((res) => {
      getUserData()
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <Card className="h-full w-full overflow-x-scroll">
    <table className="w-full min-w-max  table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-400 p-4">
              <Typography
                variant="small"
                color="white"
                className="font-serif text-lg leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TABLE_ROWS.map(({ first_name, last_name, email, role,is_premium,is_active,id }, index) => {
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
                  {last_name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {email}
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {role}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                {is_premium == true? 'True': 'False'}
                </Typography>
              </td>
              <td className={`${classes} bg-blue-gray-50/50`}>
                  <Button className="bg-white border-2 rounded-xl" onClick={() => userManagent(id,is_active)}>
                  {is_active ?
                    <p className='text-light-green-900 text-center w-full p-1'>Block</p>
                    : <p className='text-deep-orange-900 text-center p-1'>Unblock</p>
                  }
                  </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <div className="mt-28 flex justify-center items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={()=>setpage(page - 1 )}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={()=>setpage(page + 1 )}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  </Card>
  );
}

export default Userlist;
