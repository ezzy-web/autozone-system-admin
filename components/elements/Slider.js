import React, { useState } from 'react'


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Thumbs } from 'swiper'
import { Box } from '@chakra-ui/react'


export default Slider = ({ data, renderItem, isResponsive, allowThumbs, thumbRender }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const settings = {
        pagination: {
            clickable: true
        },

        breakpoints: isResponsive ? {
            640: {
                slidesPerView: 1,
                spaceBetween: 5
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 5,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 5,
            }
        } : null,

        modules: [allowThumbs ? Thumbs : Pagination],

        thumbs: allowThumbs ? { swiper: thumbsSwiper } : null,

        className: 'mySwiper'
    }

    const thumbSettings = {
        modules: [Thumbs],
        onSwiper: setThumbsSwiper,
        breakpoints: {
            640: {
                slidesPerView: 5,
                spaceBetween: 8
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 12,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 12,
            }
        }
    }

    return (
        <>
            <Swiper {...settings} >
                {data.map((item, key) => {
                    return (
                        <SwiperSlide key={key}>
                            {renderItem({ item, index: key })}
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            {allowThumbs
                ?
                <Box paddingY={3}>
                    <Swiper {...thumbSettings} >
                        {data.map((item, key) => {
                            return (
                                <SwiperSlide key={key}>
                                    {thumbRender({ item })}
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </Box>
                : <></>}





        </>

    );
}