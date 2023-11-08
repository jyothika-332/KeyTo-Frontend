import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PropertyList({ is_premium, price, place , page  }) {
  const [properties, setProperties] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    getProperties();
  }, [price, place , page]);

  const getProperties = () => {
    axios
      .get(`${BaseUrl}/property/`, {
        params: {
          page: page,
          is_premium: is_premium,
          price: price,
          place: place,
        },
      })
      .then((res) => {
        setProperties(res.data);
      })
      .catch((error) => {
        console.error("Error fetching property:", error);
      });
  };

  return (
    <>
      {properties.map((value, key) => (
        <Card
          className="w-full md:max-w-[26rem] shadow-lg ml-3"
          onClick={() => navigate(`/property_details/${value.id}`)}
        >
          <>
            <CardHeader floated={false} color="blue-gray">
              <img
                src={`${BaseUrl}${value.image}`}
                style={{ width: "384px", height: "256px" }}
                alt="ui/ux review check"
              />
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              <IconButton
                size="sm"
                color="red"
                variant="text"
                className="!absolute top-4 right-4 rounded-full"
              >
              </IconButton>
            </CardHeader>
            <CardBody className="mt-5 ml-3 h-52">
              <div className="mb-3 flex items-center justify-between">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-medium"
                >
                  {value.title}
                </Typography>
                {is_premium == true ? (
                  <Typography
                    color="blue-gray"
                    className="flex items-center gap-1.5 font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="-mt-0.5 h-5 w-5 text-yellow-700"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Typography>
                ) : (
                  ""
                )}
              </div>
              <Typography color="gray" className="mt-6">
                {value.description}
              </Typography>
              <Typography color="gray" className="mt-3">
                {value.location}
              </Typography>
            </CardBody>
            <CardFooter className="pt-3">
              <Button
                className=" bg-deep-orange-500"
                size="lg"
                fullWidth={true}
              >
                {value.type}
              </Button>
            </CardFooter>
          </>
        </Card>
      ))}
    </>
  );
}
