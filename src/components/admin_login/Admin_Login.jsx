import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../utils/Toats";
import { useFormik } from "formik";
import * as Yup from "yup";


export function SimpleRegistrationForm() {
  let navigate = useNavigate();
  const [logDatas, setlogDatas] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("* required"),
      password: Yup.string().required("* required"),
    }),
    onSubmit: (values) => {
      loginWithUsername(values);
    },
  });

  const loginWithUsername = (values) => {
    axios
      .post(`${BaseUrl}/user/token/`, values)
      .then((res) => {
        const { access, refresh } = res.data;
        console.log("THE CODE IS" , jwtDecode(access))
        if (jwtDecode(access).is_superuser != true) {
          ShowToast("You Dont Have The Permission to Login Here", false);
        } else {
          localStorage.setItem("token", access);
          localStorage.setItem("refresh", refresh);

          return navigate("/admin/admin_dashboard");
        }
      })
      .catch((err) => {
        var { message } = err.response.data
          ? err.response.data
          : "Sometging Went Wrong";
        ShowToast(message, false);
      });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography
        variant="h4"
        color="blue-gray"
        className="mt-10 font-serif text-deep-orange-900 text-3xl"
      >
        Login
      </Typography>
      <form className="mt-10 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <Button
          onClick={formik.handleSubmit}
          className="mt-10 bg-deep-orange-500"
          fullWidth
        >
          Login
        </Button>
      </form>
    </Card>
  );
}
