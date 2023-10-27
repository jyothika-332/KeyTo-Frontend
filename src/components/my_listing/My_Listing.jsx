import {
  Card,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import React,{ useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { PencilIcon } from "@heroicons/react/24/outline";
import { MylistEdit } from "../dialogues/Mylisting_Edit";
import { ShowToast } from "../../utils/Toats";



const TABLE_HEAD = ["Image", "Title", "Location", "Price" , "Type", "status", "", ""];

export function My_Listing() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [Data, setData] = useState("");
  const [properties, setProperties] = useState([]);
  const TABLE_ROWS = properties;


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProperties();
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  const getProperties = () => {
    axios
      .get(`${BaseUrl}/property/`, {
        params: {
          user: jwtDecode(localStorage.getItem("token")).user_id,
        },
      })
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {
        localStorage.clear();
        window.location.href = "/";
      });
  };

  const EditData = (image, title, location, price_per_cent, type, id) => {
    setData({
      id: id,
      image: image,
      title: title,
      location: location,
      price_per_cent: price_per_cent,
      type:type,
    });
    setOpen(true);
  };

  const ChangeStatus = (id , old_stat) => {
      var data  = {
        "id" : id,
        is_sold : !old_stat
      }
      axios.put(`${BaseUrl}/property/`,data)
      .then((res) => {
        ShowToast("Status Changes Succesfully",true)
        getProperties()
      })
  }

  const Delete = (id) => {
    axios.delete(`${BaseUrl}/property/`, { data: { id: id } }).then((res) => {
      getProperties();
    });
  };
  

  return (
    <div className="overflow-x-auto">
      <Card className="w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
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
            {TABLE_ROWS.map(
              ({ image, title, location, id, price_per_cent , type, is_sold }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={title}>
                    <td className={classes}>
                      <img src={`${BaseUrl}${image}`}
                      className="transform hover:scale-150"
                        style={{ height:"80px" , width:"80px" , objectFit:"cover" , borderRadius:"50%"}}/>                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {location}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {price_per_cent}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {
                        is_sold ? <Button className="bg-red-900" onClick={()=>ChangeStatus(id,is_sold)} > Sold</Button> : 
                        <Button className="bg-green-900" onClick={()=>ChangeStatus(id,is_sold)}> Available</Button>
                      }
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Property">
                        <IconButton variant="text"  onClick={() =>
                            EditData(image,title,location,price_per_cent,id)
                          }>
                          <PencilIcon className="h-4 w-4"/>
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        onClick={() => Delete(id)}
                      >
                        Delete
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      <MylistEdit next = { getProperties} open={open} handleOpen={handleOpen} Data= { Data } setData={ setData }/>
    </div>
  );
}
