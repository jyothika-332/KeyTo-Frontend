import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { CarouselWithContent } from "../../components/banner/Banner";
import { PropertyList } from "../../components/propertylist/Propertylist";
import { Button } from "@material-tailwind/react";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <StickyNavbar />
      <CarouselWithContent />
      <div className="mt-16 flex justify-center">
        <p className="text-4xl font-serif font-bold">Latest Properties</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
        <PropertyList is_premium = { true }   />
      </div>
      <Link to='property'>
      <Button className="bg-deep-orange-500 mt-9 ml-10">
        View All Properties
      </Button>
      </Link>
      <div className="mt-16 flex justify-center">
        <p className="text-4xl font-serif font-bold">Why Choose Us</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-14 mx-10 gap-10">
        <div className="grid grid-rows-3 md:grid-rows-1">
          <p className="md:ml-36 md:mt-10 text-2xl font-serif">
            Trusted By Thousands
          </p>
          <p className="md:ml-36 md:mt-28 text-2xl font-serif">
            Wide Range Of Properties
          </p>
          <p className="md:ml-36 md:mt-28 text-2xl font-serif">
            Financing Made Easy
          </p>
        </div>
        <div className="">
          <img
            src={Image1}
            alt="card-image"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="mt-28 flex justify-center">
        <p className="text-4xl font-serif font-bold">About Us</p>
      </div>
      <div className="flex justify-center font-serif text-xl text-blue-gray-700 mx-44 mt-14 ">
       Our aims to revolutionize property transactions by providing a user-friendly interface for buyers, sellers,<br></br> and agents to seamlessly connect and transact. With advanced search filters, interactive property listings, and<br></br>secure payment processing, it promises to streamline the real estate experience for users across the globe.
      </div>
      <div className="mt-40">
      <hr className="my-2 border-blue-gray-100 mx-9" />
        <div className="mt-10"><FooterWithSocialLinks/></div>
      </div>
    </>
  );
}

export default Home;
