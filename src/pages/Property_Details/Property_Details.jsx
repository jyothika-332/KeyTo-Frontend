import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../../components/navbar/Navbar";
import { Avatar, Typography,Tooltip } from "@material-tailwind/react";
import {PhoneIcon,EnvelopeIcon,MapPinIcon,CurrencyRupeeIcon} from '@heroicons/react/24/solid'
import {ChatBubbleOvalLeftEllipsisIcon} from '@heroicons/react/24/outline'
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";



function Property_Details() {
  const [propertyData, setpropertyData] = useState("");
  let { id}  = useParams()
  useEffect(() => {
      console.log( id)
      getProperty()
  }, []);

  const getProperty = () => {
    axios.get(`${BaseUrl}/property/`,{
      params : {
        id :id
      }
    })
    .then((res) => {
      console.log( res)
      setpropertyData(res.data)
    })
  }
  return (
    <div>
      <div>
        <StickyNavbar />
      </div>
      {
        propertyData ? <>
        <div className="text-center mt-32 text-deep-orange-900 text-4xl font-serif font-bold">
        {propertyData.title} Details
      </div>
      <div className="flex">
        <div className="flex-1 mt-16">
          <div className="w-96 h-96 bg-blue-gray-300 ml-60 mt-5 rounded-lg">
            <img src={`${BaseUrl}${propertyData.image}`} />
          </div>
        </div>
        <div className="flex-1 mt-16">
          <div className="w-2/3 h-96 bg-blue-gray-100 ml-5 mt-5 rounded-lg">
            <div className="w-full h-32 bg-deep-orange-300 rounded-lg flex justify-center pt-14">
              <div className="bg-deep-orange-800 border-2 relative w-80 h-32 rounded-lg grid grid-cols-[1fr,2fr]">
                <div className="">
                  <Avatar
                    variant="circular"
                    size="md"
                    alt="tania andrew"
                    className="border border-gray-900 mt-10 ml-10"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </div>
                <div className="mt-14 ml-8 text-white font-serif text-2xl">{propertyData.user ? propertyData.user[0].first_name : ""}</div>
              </div>
            </div>
            <div>
              <div className="flex ml-9 mt-28">
                <PhoneIcon className="w-4 h-4 mt-1"/>
                <Typography className="ml-2">
                Phone : {propertyData.user ? propertyData.user[0].phone : ""}</Typography>
              </div>
              <div className="flex ml-9 mt-5">
                <EnvelopeIcon className="w-4 h-4 mt-1"/>
                <Typography className="ml-2">Mail : {propertyData.user ? propertyData.user[0].email : ""}</Typography>
              </div>
              <div className="mt-8 flex justify-end mr-4">
                <Tooltip content='Inbox'>
                <ChatBubbleOvalLeftEllipsisIcon className="w-10 h-10"/>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-serif font-bold text-2xl ml-32 mt-20">
        About This Listing
      </div>
      <div className="ml-44 mt-8">
        {propertyData.description}
      </div>
      <div className="font-serif font-bold text-2xl ml-32 mt-20">More Details</div>
      <div className="ml-44 mt-8 flex">
        <div><MapPinIcon className="w-8 h-8"/></div>
        <div className="mt-2 ml-5">{propertyData.location}</div>
      </div>
      <div className="ml-44 mt-8 flex">
        <div><CurrencyRupeeIcon className="w-8 h-8"/></div>
        <div className="mt-2 ml-5">{ propertyData.price_per_cent } Rs/cent</div>
      </div></> : ''
      }
      <div className="mt-40">
      <hr className="my-2 border-blue-gray-100 mx-9" />
        <div className="mt-10"><FooterWithSocialLinks/></div>
      </div>
    </div>
  );
}

export default Property_Details;
