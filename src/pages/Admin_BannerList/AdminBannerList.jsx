import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Card,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { Tooltip } from "react-bootstrap";
import { PencilIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["Image", "Heading", "Priority", "Description", "", ""];

function AdminBannerList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open)
    setData("")
  }
  const [Data, setData] = React.useState("");

  const tableStyle = {
    borderCollapse: "separate",
    borderSpacing: "10px", 
  };

  const [bannerList, setbannerList] = useState([]);

  const TABLE_ROWS = bannerList;

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    axios.get(`${BaseUrl}/banner/`).then((res) => {
      console.log(res);
      setbannerList(res.data);
    });
  };

  const EditData = (heading, priority, description, id) => {
    setData({
      id: id,
      heading: heading,
      description: description,
      priority: priority,
    });
    setOpen(true);
  };

  const Delete = (id) => {
    axios.delete(`${BaseUrl}/banner/`, { data: { id: id } }).then((res) => {
      getBanners();
    });
  };

  const AddBanner = () => {
    let formData = new FormData();
    formData.append("heading", Data.heading);
    formData.append("description", Data.description);
    formData.append("id", Data.id);
    if (Data.image) {
      formData.append("image", Data.image);
    }
    formData.append("priority", Data.priority);
    if (Data.id) {
      axios.put(`${BaseUrl}/banner/`, formData).then((res) => {
        getBanners();
        setData("");
        handleOpen();
      });
    } else {
      axios.post(`${BaseUrl}/banner/`, formData).then((res) => {
        getBanners();
        setData("");
        handleOpen();
      });
    }
  };
  
  return (
    <div>
        <div className=" col-span-2">
          <div className="grid grid-cols-2">
            <p className="mt-9 ml-10 font-serif text-3xl  text-deep-orange-900">
              Banner List
            </p>
            <div className="ml-64 mt-9">
              <Button onClick={handleOpen} className="bg-deep-orange-900">
                Add Banner
              </Button>
            </div>
          </div>
          <div className="mt-10 w-full h-full">
            <Card className="h-full w-full">
              <table className="w-full max-w-full table-auto text-left">
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
                    ({ heading, image, priority, description, id }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={name}>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <img src={`${BaseUrl}${image}`}
                            className="transform hover:scale-150"
                            style={{ height:"80px" , width:"80px" , objectFit:"cover" , borderRadius:"50%"}}/>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {heading}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {priority}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {description}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              <Tooltip content="Edit User">
                                <IconButton
                                  variant="text"
                                  onClick={() =>
                                    EditData(heading, priority, description, id)
                                  }
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Button
                              className=" bg-deep-orange-500"
                              onClick={() => Delete(id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Card>
          </div>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add/Update Banner</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              label="Heading"
              size="lg"
              value={Data.heading ? Data.heading : ""}
              onChange={(e) => setData({ ...Data, heading: e.target.value })}
            />
            <Textarea
              label="Description"
              size="lg"
              value={Data.description ? Data.description : ""}
              onChange={(e) =>
                setData({ ...Data, description: e.target.value })
              }
            />
            <Input
              label="Image"
              size="lg"
              type="file"
              onChange={(e) => setData({ ...Data, image: e.target.files[0] })}
            />
            <Input
              label="Priority"
              size="lg"
              value={Data.priority ? Data.priority : ""}
              onChange={(e) => setData({ ...Data, priority: e.target.value })}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button className="bg-deep-orange-500" onClick={AddBanner}>
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default AdminBannerList;
