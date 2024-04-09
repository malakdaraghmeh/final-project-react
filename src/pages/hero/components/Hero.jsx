import React from "react";
import "./hero.css";
import { Navigation, Pagination, Scrollbar, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react'
import { NavLink } from "react-router-dom";
import hero2 from '../../../../public/hero2.png'
import hero3 from '../../../../public/hero3.jpg'
import hero4 from '../../../../public/hero4.png'
import hero5 from '../../../../public/hero5.jpg'


export default function Hero() {
  return (
    <>
    <div className="container">
        <Swiper
          className="swiperContainer "
          modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
          slidesPerView={1}
          navigation
          Pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide className="mm">
            <NavLink>
              <img className=" w-100 heroimage  " src={hero2}></img>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink>
              <img className="w-100 heroimage" src={hero3}></img>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink>
              <img className="w-100 heroimage " src={hero4}></img>
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink>
              <img className="w-100 heroimage " src={hero5}></img>
            </NavLink>
          </SwiperSlide>
        </Swiper>
      </div>

   
    </>
  );
}
