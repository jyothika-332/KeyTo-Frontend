import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";


function Become_A_Selller() {

  const formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      location: "",
      id_card_image: null,
    },
    validationSchema: Yup.object({
      address: Yup.string().required("* required"),
      phone: Yup.number().positive("* Must be 10 digit number").required("* required"),
      location: Yup.string().required("* required"),
      id_card_image: Yup.string().required("* required"),
    }),
    onSubmit: (values) => {
      updateSellerData(values);
    },
  });


  const [sellerData, setsellerData] = useState("");
  useEffect(() => {
    console.log(jwtDecode(localStorage.getItem("token")));
    if (localStorage.getItem("token")) {
      console.log("ok");
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);


  const updateSellerData = (values) => {
    console.log(sellerData);
    const formData = new FormData();
    formData.append("id", jwtDecode(localStorage.getItem("token")).user_id);
    formData.append("role", "seller");
    formData.append("address", sellerData.address);
    formData.append("phone", sellerData.phone);
    formData.append("location", sellerData.location);
    formData.append("id_card_image", sellerData.id_card_image);
    axios.put(`${BaseUrl}/user/`, formData).then((res) => {
      localStorage.clear();
      window.location.href = "/login";
    });
  };

  return (
    <div>
      <div className="flex-col items-center">
        <form className="w-full md:max-w-md">
          <div className="w-96 mt-6">
            <Input
              label="Address"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500">{formik.errors.address}</div>
            ) : null}
          </div>
          <div className="w-96 mt-8">
            <Input
              label="Phone Number"
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="w-96 mt-8">
            <Input
              label="Location"
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500">{formik.errors.location}</div>
            ) : null}
          </div>
          <div className="w-96 mt-8">
            <Input
              label="Upload Id"
              type="file"
              name="id_card_image"
              onChange={(e) => {
                formik.setFieldValue("id_card_image", e.currentTarget.files[0]);
                }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.id_card_image && formik.errors.id_card_image ? (
              <div className="text-red-500">{formik.errors.id_card_image}</div>
            ) : null}
          </div>
          <div>
            <Button
              className="mt-10 ml-72 bg-deep-orange-500"
              onClick={formik.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Become_A_Selller;
