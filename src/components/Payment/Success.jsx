import React from "react";
import payment4 from '../../assets/Image/payment4.jpg'
import { CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


function Success() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen" style={{backgroundImage: `url(${payment4})`}}>
      <Card className="w-96 border-4 border-green-600 rounded-xl">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-3xl text-light-green-900">
          Payment Successfull
        </Typography>
        <Typography className="text-sm mt-5">
          Your payment done successfully.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Link to='/agent/profile'>
          <Button size="sm" variant="text" className="flex items-center ml-64 gap-2 text-deep-orange-900 font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 transform rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
            Back
          </Button>
          </Link>
        </a>
      </CardFooter>
    </Card>
    </div>
    </div>
  );
}

export default Success;
