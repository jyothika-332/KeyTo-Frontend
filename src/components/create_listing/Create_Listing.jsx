import { Card, Input, Button, Textarea, Radio } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { BaseUrl } from "../../utils/Constants";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useFormik } from "formik";
import * as Yup from "yup";


export function CreateListingForm() {

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price_per_cent: "",
      total_cent: "",
      type: "",
      location: "",
      latitude: "",
      longitude: "",
      image:null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("* required"),
      description: Yup.string().required("* required"),
      price_per_cent: Yup.number()
    .positive("* Price must be a positive number")
    .required("* Price is required"),
  total_cent: Yup.number()
    .positive("* Total cent must be a positive number")
    .required("* Total cent is required"),
      type: Yup.string().required("* required"),
      location: Yup.string().required("* required"),
      latitude: Yup.string().required("* required"),
      longitude: Yup.string().required("* required"),
      image: Yup.string().required("* required"),
    }),
    onSubmit: (values) => {
      AddProperty(values);
    },
  });


  const [Data, setData] = React.useState("");
  const [propertyList, setpropertyList] = useState([]);
  useEffect(() => {
    const map = L.map("map").setView([10.8505, 76.2711], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    map.on("click", async (e) => {
      const coordinates = e.latlng;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}`
        );
        const data = await response.json();

        if (data.display_name) {
          console.log(data);
          formik.setValues({
            ...formik.values,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            location: data.address.town ? data.address.town : data.address.village,
          });
          // setData({
          //   ...Data,
          //   latitude: coordinates.lat,
          //   longitude: coordinates.lng,
          //   location: data.address ? data.address.town : "Not Found",
          // });
        } else {
          alert("No location found");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    });
  }, []);

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = () => {
    axios.get(`${BaseUrl}/property/`).then((res) => {
      setpropertyList(res.data);
    });
  };

  const AddProperty = (values) => {
    console.log(jwtDecode(localStorage.getItem("token")));
    let formData = new FormData();
    formData.append("title", values.title);
    formData.append("location", values.location);
    formData.append("description", values.description);
    formData.append("user", jwtDecode(localStorage.getItem("token")).user_id);
    formData.append("id", values.id);
    if (values.image) {
      formData.append("image", values.image);
    }
    formData.append("price_per_cent", values.price_per_cent);
    formData.append("total_cent", values.total_cent);
    formData.append("type", values.type);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);

    axios.post(`${BaseUrl}/property/`, formData).then((res) => {
      getProperty();
      setData("");
    });

    console.log(values)
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
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <Textarea
              size="lg"
              label="Description"
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="my-1 flex items-center gap-2">
            <Input
              type="text"
              size="lg"
              label="Price"
              name="price_per_cent"
              containerProps={{ className: "min-w-[72px]" }}
              value={formik.values.price_per_cent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price_per_cent && formik.errors.price_per_cent ? (
              <div className="text-red-500">{formik.errors.price_per_cent}</div>
            ) : null}
            <Input
              type="text"
              size="lg"
              label="Area"
              name="total_cent"
              containerProps={{ className: "min-w-[72px]" }}
              value={formik.values.total_cent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.total_cent && formik.errors.total_cent ? (
              <div className="text-red-500">{formik.errors.total_cent}</div>
            ) : null}
          </div>
          <div>
            <Radio
              label="For Rent"
              color="blue"
              name="type"
              value="rent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.type && formik.errors.type ? (
              <div className="text-red-500">{formik.errors.type}</div>
            ) : null}
            <span className="ml-8">
              <Radio
                label="For Sale"
                color="blue"
                name="type"
                value="sale"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              />
              {formik.touched.type && formik.errors.type ? (
              <div className="text-red-500">{formik.errors.type}</div>
            ) : null}
            </span>
          </div>
          <div className="mt-3">
            <Textarea
              size="lg"
              label="Location"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500">{formik.errors.location}</div>
            ) : null}
          </div>
          <div className="my-1 flex items-center gap-2">
            <Input
              type="text"
              size="lg"
              label="Location Latitude"
              name="latitude"
              containerProps={{ className: "min-w-[72px]" }}
              value={formik.values.latitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.latitude && formik.errors.latitude ? (
              <div className="text-red-500">{formik.errors.latitude}</div>
            ) : null}
            <Input
              type="text"
              size="lg"
              label="Location Longitude"
              name="longitude"
              containerProps={{ className: "min-w-[72px]" }}
              value={formik.values.longitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.longitude && formik.errors.longitude ? (
              <div className="text-red-500">{formik.errors.longitude}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Property Image </Form.Label>
              <Form.Control
                type="file"
                name="image"
  onChange={(e) => {
    formik.setFieldValue("image", e.currentTarget.files[0]);
  }}
  onBlur={formik.handleBlur}
              />
            </Form.Group>
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500">{formik.errors.image}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <div id="map" style={{ height: "400px" }}></div>
          </div>
        </div>
        <Button className="mt-10 bg-deep-orange-500" onClick={formik.handleSubmit}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
