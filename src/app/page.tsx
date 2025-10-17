import React from 'react'

import HomeHeader from './_Component/HomeHeader/HomeHeader';
import DynamicSwiper from './_Component/MySwiper/DynamicSwiper/DynamicSwiper';
import AllProducts from './_Component/AllProducts/AllProducts';



export default async function Home() {




  return (
    <>
      <HomeHeader />
        <DynamicSwiper />
        <AllProducts />
    </>
  )
}
