
import React from 'react'
import img1 from '_/assets/Images/black-headphones-dark-background-music-concept-3d-rendering_844516-1541.jpg'
import img2 from '_/assets/Images/black-shopping-bags-grey-background_950053-5940.jpg'
import img3 from '_/assets/Images/R.jpeg'
import MySwiper from '../MySwiper'

export default function StaticSwiper() {
    return (
        <MySwiper imageList={[img1.src , img2.src , img3.src]}/>
    )
}
