import { Carousel, Typography, Button } from "@material-tailwind/react";
import Image1 from '../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg'
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import { useEffect, useState } from "react";


export function CarouselWithContent() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners()
  }, []);

  const getBanners = () => {
    axios.get(`${BaseUrl}/banner/`)
    .then((res) => {
      console.log ("THE Banners Are",res.data)
      setBanners(res.data);
    })
    .catch((error) => {
      console.error("Error fetching banners:", error);
    })
  }
  return (
    <Carousel>
      {
        banners.map((value,key) => (
          <div className="relative h-full w-full">
        <img
          src={`${BaseUrl}/${value.image}`}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              { value.heading }
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              { value.description }
            </Typography>
          </div>
        </div>
      </div>
        ))
      }
      
      
    </Carousel>
  );
}

