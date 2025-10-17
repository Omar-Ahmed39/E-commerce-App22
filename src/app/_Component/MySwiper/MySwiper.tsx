
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { CategoryType } from '_/app/_Interfaces/Product.Typs';



export default function MySwiper({ imageList = undefined, spaceBetween = 40, slidesPerView = 1, categories = undefined }: {
    imageList?: string[] | undefined,
    spaceBetween?: number,
    slidesPerView?: number,
    categories?: CategoryType[] | undefined
}) {


    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            loop
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >

            {
                imageList != undefined ?

                    imageList?.map(slide => <SwiperSlide key={slide}>
                        <div className='cursor-grab'>
                            <img src={slide} className='w-full h-70 object-cover' alt={"product"} />
                        </div>
                    </SwiperSlide>
                    )
                    :
                    categories?.map(slide => <SwiperSlide key={slide.name}>
                        <div className='cursor-grab'>
                            <img src={slide.image} className='w-full h-70 object-cover mb-1' alt={"product"} />
                            <h2 className='text-[#1F2B4C] text-xl font-semibold'>{slide.name}</h2>
                        </div>
                    </SwiperSlide>
                    )
            }
        </Swiper>
    );
};

