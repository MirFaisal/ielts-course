"use client";

import { RecommendationProduct } from "@/types/recommendationTypes";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "./CourseCard";

interface CourseSlideshowProps {
  products: RecommendationProduct[];
}

export default function CourseSlideshow({ products }: CourseSlideshowProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          nextEl: ".recommendations-swiper-button-next",
          prevEl: ".recommendations-swiper-button-prev",
        }}
        pagination={{
          el: ".recommendations-swiper-pagination",
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        className="recommendations-swiper">
        {products.map((product) => (
          <SwiperSlide key={product.product_id}>
            <CourseCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="hidden md:flex recommendations-swiper-button-prev absolute right-10 top-[-65px] transform -translate-y-1/2 -translate-x-4 z-10 bg-black/50 shadow-lg rounded-full w-8 h-8 items-center justify-center cursor-pointer transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div className="hidden md:flex recommendations-swiper-button-next absolute right-6 top-[-65px] transform -translate-y-1/2 translate-x-4 z-10 bg-black/50 shadow-lg rounded-full w-8 h-8 items-center justify-center cursor-pointer transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
