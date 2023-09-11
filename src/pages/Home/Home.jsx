import React from 'react'
import { StickyNavbar } from '../../components/navbar/Navbar'
import { CarouselWithContent } from '../../components/banner/Banner'

function Home() {
  return (
    <div>
        <StickyNavbar></StickyNavbar>
        <CarouselWithContent></CarouselWithContent>
    </div>
  )
}

export default Home