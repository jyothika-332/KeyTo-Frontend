import {
  Card,
  Input,
  Button,
  Textarea,
  Radio,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BaseUrl } from "../../utils/Constants";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function CreateListingForm() {
  
  const [Data, setData] = React.useState("");
  const [propertyList, setpropertyList] = useState([]);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = () => {
    axios.get(`${BaseUrl}/property/`).then((res) => {
      setpropertyList(res.data);
    });
  };

  const AddProperty = () => {
    console.log(jwtDecode(localStorage.getItem("token")));
    let formData = new FormData();
    formData.append("title", Data.title);
    formData.append("location", Data.location);
    formData.append("description", Data.description);
    formData.append("user", jwtDecode(localStorage.getItem("token")).user_id);
    formData.append("id", Data.id);
    if (Data.image) {
      formData.append("image", Data.image);
    }
    formData.append("price_per_cent", Data.price_per_cent);
    formData.append("total_cent", Data.total_cent);
    formData.append("type", Data.type);
    formData.append("latitude", Data.latitude);
    formData.append("longitude", Data.longitude);

    axios.post(`${BaseUrl}/property/`, formData).then((res) => {
      getProperty();
      setData("");
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <form className="mt-8 mb-2 w-2/3 ">
        <div className="mb-4 flex flex-col gap-6">
          <div>
            <Input
              size="lg"
              label="Property Title"
              type="text"
              value={Data.title ? Data.title : ""}
              onChange={(e) => setData({ ...Data, title: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <Textarea
              size="lg"
              label="Description"
              value={Data.description ? Data.description : ""}
              onChange={(e) =>
                setData({ ...Data, description: e.target.value })
              }
            />
          </div>
          <div className="my-1 flex items-center gap-2">
            <Input
              type="text"
              size="lg"
              label="Price"
              containerProps={{ className: "min-w-[72px]" }}
              value={Data.price_per_cent ? Data.price_per_cent : ""}
              onChange={(e) =>
                setData({ ...Data, price_per_cent: e.target.value })
              }
            />
            <Input
              type="text"
              size="lg"
              label="Area"
              containerProps={{ className: "min-w-[72px]" }}
              value={Data.total_cent ? Data.total_cent : ""}
              onChange={(e) => setData({ ...Data, total_cent: e.target.value })}
            />
          </div>
          <div>
            <Radio
              label="For Rent"
              color="blue"
              name="propertyType"
              value="rent"
              onChange={(e) => setData({ ...Data, type: e.target.value })}
            />
            <span className="ml-8">
              <Radio
                label="For Sale"
                color="blue"
                name="propertyType"
                value="sale"
                onChange={(e) => setData({ ...Data, type: e.target.value })}
              />
            </span>
          </div>
          <div className="mt-3">
            <Textarea
              size="lg"
              label="Location"
              value={Data.location ? Data.location : ""}
              onChange={(e) => setData({ ...Data, location: e.target.value })}
            />
          </div>
          <div className="my-1 flex items-center gap-2">
            <Input
              type="text"
              size="lg"
              label="Location Latitude"
              containerProps={{ className: "min-w-[72px]" }}
              value={Data.latitude ? Data.latitude : ""}
              onChange={(e) => setData({ ...Data, latitude: e.target.value })}
            />
            <Input
              type="text"
              size="lg"
              label="Location Longitude"
              containerProps={{ className: "min-w-[72px]" }}
              value={Data.longitude ? Data.longitude : ""}
              onChange={(e) => setData({ ...Data, longitude: e.target.value })}
            />
          </div>
          <div className="mt-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setData({ ...Data, image: e.target.files[0] })}
              />
            </Form.Group>
          </div>
        </div>
        <Button className="mt-10 bg-deep-orange-500" onClick={AddProperty}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
