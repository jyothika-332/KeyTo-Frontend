import { Carousel, Typography } from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { useEffect, useState } from "react";

export function CarouselWithContent() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    axios
      .get(`${BaseUrl}/banner/`)
      .then((res) => {
        setBanners(res.data);
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
      });
  }

  
  return (
    <Carousel>
      {banners.map((value, key) => (
        <div className="relative h-screen w-full mt-20" key={key}>
          <img
            src={value.image}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full items-center">
            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                {value.heading}
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                {value.description}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}


