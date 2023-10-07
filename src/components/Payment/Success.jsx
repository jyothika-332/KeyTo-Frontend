import React from "react";
import payment from '../../assets/Image/payment.jpg'
import { CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { Button, Card } from "react-bootstrap";


function Success() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
      <Card className="mt-6 w-96 border-2 rounded-xl border-light-green-500">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Payment Successfull
        </Typography>
        <Typography className="text-sm mt-5">
          Your payment done successfully.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button size="sm" variant="text" className="flex items-center ml-64 gap-2">
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
        </a>
      </CardFooter>
    </Card>
    </div>
    </div>
  );
}

export default Success;
