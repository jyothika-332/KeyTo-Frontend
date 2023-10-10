import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  Textarea,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import React,{ useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Input } from "postcss";
import { MylistEdit } from "../dialogues/Mylisting_Edit";



const TABLE_HEAD = ["Image", "Title", "Location", "Description", "", ""];

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

  const EditData = (image, title, location, description, id) => {
    setData({
      id: id,
      image: image,
      title: title,
      location: location,
      description: description,
    });
    setOpen(true);
  };

  const Update = () => {
    let formData = new FormData();
    formData.append("title", Data.title);
    formData.append("description", Data.description);
    formData.append("id", Data.id);
    if (Data.image) {
      formData.append("image", Data.image);
    }
    formData.append("location", Data.location);
    if (Data.id){
        axios.put(`${BaseUrl}/property/`, formData).then((res) => {
          getProperties();
          setData("");
          handleOpen();
        });
    }
  };

  return (
    <div className="">
      <Card className="h-full w-full">
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
              ({ image, title, location, description }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={title}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {image}
                      </Typography>
                    </td>
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
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Property">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" onClick={() =>
                            EditData(image,title,location,description,id)
                          } />
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
      <MylistEdit open={open} handleOpen={handleOpen}/>
    </div>
  );
}
