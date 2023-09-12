import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { CarouselWithContent } from "../../components/banner/Banner";
import { PropertyList } from "../../components/propertylist/Propertylist";
import { Button } from "@material-tailwind/react";
import Image1 from "../../assets/Image/bailey-anselme-Bkp3gLygyeA-unsplash.jpg";
import { FooterWithSocialLinks } from "../../components/footer/Footer";


function Home() {
  return (
    <>
      <StickyNavbar />
      <CarouselWithContent />
      <div className="mt-16 flex justify-center">
        <p className="text-4xl font-serif font-bold">Latest Properties</p>
      </div>
      <div className="grid grid-cols-3 mt-10 mx-10 gap-10">
        <PropertyList />
        <PropertyList />
        <PropertyList />
      </div>
      <Button className="bg-deep-orange-500 mt-9 ml-10">
        View All Properties
      </Button>
      <div className="mt-16 flex justify-center">
        <p className="text-4xl font-serif font-bold">Why Choose Us</p>
      </div>
      <div className="grid grid-cols-2 mt-10 mx-10 gap-10">
        <div className="grid-rows-3">
          <p className="ml-36 mt-10 text-2xl font-serif">
            Trusted By Thousands
          </p>
          <p className="ml-36 mt-28 text-2xl font-serif">
            Wide Range Of Properties
          </p>
          <p className="ml-36 mt-28 text-2xl font-serif">Financing Made Easy</p>
        </div>
        <div>
          <img
            src={Image1}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <p className="text-4xl font-serif font-bold">About Us</p>
      </div>
      <div className="flex mt-10 col-span-12 mx-10 gap-10">
        <div className="md:col-span-4 col-span-12">
        <PropertyList />

        </div>
        <div className="md:col-span-4 col-span-12">
        <PropertyList />

        </div>
        <div className="md:col-span-4 col-span-12">

        <PropertyList />
        </div>
      </div>
      <div className="mt-40">
        <FooterWithSocialLinks/>
      </div>
    </>
  );
}

export default Home;
