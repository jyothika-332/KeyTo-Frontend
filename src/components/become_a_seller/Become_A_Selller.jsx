import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../utils/Toats";


function Become_A_Selller() {
  const formData = new FormData();
  const navigate = useNavigate()
  const id = jwtDecode(localStorage.getItem("token")).user_id


  const formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      location: "",
      id_card_image: null,
    },
    validationSchema: Yup.object({
      address: Yup.string().min(4,'Addres is too short').required("* required"),
      phone: Yup.number().positive("Enter valid number").min(10,'Phone number should be 10 digits').required("* required"),
      location: Yup.string().required("* required"),
      id_card_image: Yup.string().required("* required"),
    }),
    onSubmit: (values) => {
      formData.append("role", "seller");
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("location", values.location);
      if (values.id_card_image instanceof File) {
        formData.append("id_card_image", values.id_card_image);
      };

      axios.put(`${BaseUrl}/user/become-a-seller/${id}/`, formData).then((res) => {
        localStorage.clear();
        navigate('/login')
        ShowToast("Congrates Your a Seller Now", true);
      });
    }
  });


  useEffect(() => {
    console.log(jwtDecode(localStorage.getItem("token")));
    if (localStorage.getItem("token")) {
      console.log("ok");
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);


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
