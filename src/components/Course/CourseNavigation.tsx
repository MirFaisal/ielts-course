"use client";
import { CourseNavigationProps } from "@/types/sectionTypes";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CourseNavigation({
  anchorItems,
  activeSection,
  onSectionClick,
}: CourseNavigationProps) {
  const [, setSwiperRef] = useState<SwiperType | null>(null);

  return (
    <div className="sticky top-[70px] z-[200] w-full bg-white border-b border-gray-200 mb-4">
      <div className="max-w-5xl relative px-4 py-3">
        <Swiper
          onSwiper={setSwiperRef}
          spaceBetween={10}
          slidesPerView="auto"
          navigation={{
            nextEl: ".nav-button-next",
            prevEl: ".nav-button-prev",
          }}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: "auto",
              spaceBetween: 10,
            },
          }}
          className="anchor-slider">
          {anchorItems.map((item) => (
            <SwiperSlide key={item.key} className="!w-auto">
              <button
                onClick={() => onSectionClick(item.key)}
                className={`relative px-1 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-t-lg ${
                  activeSection === item.key
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 border-b-2 border-transparent"
                }`}>
                {item.title}
                {activeSection === item.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="nav-button-prev absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md cursor-pointer transition-all duration-200 border border-gray-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="nav-button-next absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-md cursor-pointer transition-all duration-200 border border-gray-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
