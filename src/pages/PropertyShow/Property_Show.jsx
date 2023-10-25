import React, { useState } from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { Input, Button, Select, Option, Slider, slider } from "@material-tailwind/react";
import { PropertyList } from "../../components/propertylist/Propertylist";
import { FooterWithSocialLinks } from "../../components/footer/Footer";


function Property_Show() {
  const [sliderValue, setSliderValue] = useState(100); // Initialize with a default value
  const [place, setplace] = useState("")

  const handleSliderChange = (event) => {
    setSliderValue(Math.round(event.target.value) );
    console.log( Math.round(event.target.value) )
  };
  return (
    <div className="">
      <div>
        <StickyNavbar />
      </div>
      <div className="mt-20 w-full h-24 flex">
        <div className="h-10 flex-1 mt-14 flex">
          <div className="relative flex w-full gap-2 md:w-max ml-36">
            <Input
              type="search"
              label="Location..."
              value = { place }
              onChange={(e)=>setplace(e.target.value )}
              className="pr-10 rounded-xl"
              containerProps={{
                className: "min-w-[200px]",
              }}
            />
       
          </div>
          <div className="w-32 ml-14">
            <p className="text-xs flex justify-center">Select your price range</p>
            <Slider
        className="mt-2"
        size="lg"
        color="red"
        value={sliderValue}
        onChange={(e)=>handleSliderChange(e)}
        defaultValue={100}
           />
           <p> { sliderValue * 10000}</p>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="text-center mt-16 text-deep-orange-900 text-4xl font-serif font-bold">Properties</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <PropertyList price = { sliderValue * 10000 } place = { place } />
      </div>  
      <div className="mt-44">
        <FooterWithSocialLinks/>
      </div>
    </div>
  );
}

export default Property_Show;
