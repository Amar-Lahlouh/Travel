import React, { useRef, useState } from "react";
// Import Swiper React components
import "swiper/css";
import "./Gallery.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import g1 from "../../assets/gallery1.jpg";

import g2 from "../../assets/gallery2.jpg";
import g3 from "../../assets/gallery3.jpg";
import g4 from "../../assets/gallery4.jpg";
import g5 from "../../assets/gallery5.jpg";
import g6 from "../../assets/gallery6.jpg";
import g7 from "../../assets/serv2.jpg";
import g8 from "../../assets/b1.jpg";
import g9 from "../../assets/b2.jpg";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
function Gallery() {
  return (
    <div className="mt-7  mb-9 pb-6" id="gallery">
      <div className="main-title flex justify-center align-middle">
        <h2 className=" font-serif text-3xl font-bold">
          Our <span className="checknoww pt-5 "> Gallery</span>
        </h2>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={g1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g8} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g9} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g6} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={g7} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Gallery;
