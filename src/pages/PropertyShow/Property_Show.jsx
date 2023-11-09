import React, { useState } from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { Input, Button, Slider } from "@material-tailwind/react";
import { PropertyList } from "../../components/propertylist/Propertylist";
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function Property_Show() {
  const [page, setpage] = useState(1);
  const [sliderValue, setSliderValue] = useState(100); 
  const [place, setplace] = useState("");

  const handleSliderChange = (event) => {
    setSliderValue(Math.round(event.target.value));
    console.log(Math.round(event.target.value));
  };
  return (
    <div className="">
      <div>
        <StickyNavbar />
      </div>
      <div className="mt-20 w-full h-24 flex flex-col md:flex-row">
        <div className="h-10 md:flex-1 mt-4 md:mt-14 md:flex">
          <div className="relative w-full md:max-w-[400px] ml-5">
            <Input
              type="search"
              label="Location..."
              value={place}
              onChange={(e) => setplace(e.target.value)}
              className="pr-10 rounded-lg"
              containerProps={{
                className: "min-w-[200px]",
              }}
            />
          </div>
          <div className="relative w-full md:w-1/3 ml-0 md:ml-14 mt-4 md:mt-0">
            <p className="text-xs flex justify-center">
              Select your price range
            </p>
            <Slider
              className="relative z-0 mt-2"
              size="lg"
              color="red"
              value={sliderValue}
              onChange={(e) => handleSliderChange(e)}
              defaultValue={100}
            />
            <p> {sliderValue * 10000}</p>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="text-center mt-16 text-deep-orange-900 text-4xl font-serif font-bold">
        Properties
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <PropertyList price={sliderValue * 10000} place={place} page = { page } />
      </div>

      <div className="mt-44 flex justify-center  items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={() => setpage(page - 1)}
          disabled={page === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={() => setpage(page + 1)}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-20">
        <hr className="my-2 border-blue-gray-100 mx-9" />
        <div className="mt-10">
          <FooterWithSocialLinks />
        </div>
      </div>
    </div>
  );
}

export default Property_Show;
