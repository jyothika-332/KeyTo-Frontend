import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { BaseUrl } from "../../utils/Constants";
   
  function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }
   
  export function PricingCard4() {

    useEffect(() => {
      if (!localStorage.getItem("token"))
      {
          localStorage.clear()
          window.location.href = '/'
      }
  }, []);


  const PaymentData = async ( price ) => {
    var data = {
      "name" : "Test Name",
      "price" : price,
      "origin_site" : window.location.origin,
    }

    axios.post(`${BaseUrl}/payment/`,data)
    .then((res) => {
      console.log ( res)
      window.location.href = res.data.message.url
    })
    
  }

  const AddToPremium = async (addedmonth) => {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1. Also, pad with '0' if needed.
      var day = String(currentDate.getDate()).padStart(2, '0');

      var formattedDate = `${year}-${month}-${day}`;
      var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + addedmonth, currentDate.getDate());

      var formattedEndDate = endDate.toISOString().split('T')[0];
      var body = {
          id : jwtDecode(localStorage.getItem("token")).user_id,
          premium_starting : formattedDate,
          premium_ending : formattedEndDate,
          is_premium : true
      }
      axios.put(`${BaseUrl}/user/addtopremium/`, body)
      .then((res) => {
          PaymentData(1750)
      })
  }

    return (
      <Card color="brown" variant="gradient" className="w-full max-w-[20rem] p-8 ml-2">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            get premium
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-xl">₹</span>1750{" "}
            <span className="self-end text-xl">/4mo</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">10 Listing</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">4 Month Available</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">Non Featured</Typography>
            </li>
            <li className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">24/7 Support</Typography>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            onClick={()=>AddToPremium(4)}
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    );
  }