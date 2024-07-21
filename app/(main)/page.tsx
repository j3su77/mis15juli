

import React from 'react'
import { Navbar } from './_components/navbar/navbar';
import { Hero } from './_components/hero';
import { CountDown } from './_components/count-down';
import { Gallery } from './_components/gallery';
import { Invitation } from './_components/invitation';
import { Map } from './_components/map';

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <CountDown />
      <Gallery />
      <Invitation />
      <Map />
    </div>
  )
}

export default MainPage