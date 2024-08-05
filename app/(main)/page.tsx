

import React from 'react'
import { Navbar } from './_components/navbar/navbar';
import { Hero } from './_components/hero';
import { CountDown } from './_components/count-down';
import { Gallery } from './_components/gallery';
import { Invitation } from './_components/invitation';
import { Map } from './_components/map';
import { Music } from './_components/music';
import { db } from '@/lib/db';

const MainPage = async () => {



  return (
    <div className='relative'>
      <Navbar />
      <Hero  />
      <CountDown />
      <Gallery />
      <Invitation />
      <Map />
      <Music />
    </div>
  )
}

export default MainPage