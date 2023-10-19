import React from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { Input, Button, Select, Option } from "@material-tailwind/react";
import { PropertyList } from "../../components/propertylist/Propertylist";
import { FooterWithSocialLinks } from "../../components/footer/Footer";


function Property_Show() {
  return (
    <div>
      <div>
        <StickyNavbar />
      </div>
      <div className="mt-20 w-full h-24 flex">
        <div className="h-10 flex-1 mt-14 flex">
          <div className="relative flex w-full gap-2 md:w-max ml-36">
            <Input
              type="search"
              label="Location..."
              className="pr-10 rounded-xl"
              containerProps={{
                className: "min-w-[200px]",
              }}
            />
            <Button
              size="sm"
              className="!absolute right-1 bg-brown-300 top-1 rounded-full"
            >
              Search
            </Button>
          </div>
          <div className="w-28 ml-14">
            <Select label="Select Price">
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="text-center mt-16 text-deep-orange-900 text-4xl font-serif font-bold">Properties</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        <PropertyList/>
      </div>  
      <div className="mt-44">
        <FooterWithSocialLinks/>
      </div>
    </div>
  );
}

export default Property_Show;
