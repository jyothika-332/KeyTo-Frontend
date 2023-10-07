import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'
import { PricingCard } from '../../components/premium/Premium'
import { FooterWithSocialLinks } from '../../components/footer/Footer'
import { PricingCard2 } from '../../components/premium2/Premium2'
import { PricingCard3 } from '../../components/premium3/Premium3'
import { PricingCard4 } from '../../components/premium4/Premium4'
import premiumimage from '../../assets/Image/premium.jpg'
import { Card } from 'react-bootstrap'
import { CardHeader, Typography } from '@material-tailwind/react'
import axios from 'axios'
import { BaseUrl } from '../../utils/Constants'


function Premium_Page() {


 
  return (
    <div>
        <StickyNavbar/>
        <Card
        shadow={false}
        className="relative grid h-[40rem] w-full rounded-none items-end justify-center overflow-hidden text-center mt-20"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="inset-0 m-0  rounded-none lg:w-[94.95rem] h-[40rem] bg-cover bg-center"
          style={{backgroundImage: `url(${premiumimage})`}}
        >
            
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/50 via-black/50" />
          <div className="flex justify-start items-center h-full">

          <Typography
            variant="h1"
            color="white"
            className="mb-12 font-sans leading-[1.5] z-10 ml-28"
            >
            Our Pricing Plans...
          </Typography>
              </div>

        </CardHeader>

      </Card>
        <p className='mt-24 ml-10 text-3xl font-serif text-blue-gray-600'>Simple Pricing For Everyone Users :</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
        <PricingCard/>
        <PricingCard2/>
        <PricingCard3/>
        <PricingCard4/>
        </div>
        <div className='mt-44'>
        <FooterWithSocialLinks/>
        </div>
    </div>
  )
}

export default Premium_Page