// components/IELTSScoreSlider.tsx
"use client";

import { MediaItem } from "@/types/productTypes";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slider({ media }: { media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  // Filter out sqr_img items
  const filteredMedia = media.filter((item) => item.name !== "sqr_img");

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="mb-4">
          {filteredMedia.map((item: MediaItem, i: number) => (
            <SwiperSlide key={i}>
              <div className="bg-white text-center">
                {item.resource_type === "video" ? (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${item.resource_value}`}
                      title={item.name}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                ) : (
                  <Image
                    src={item.resource_value}
                    alt={item.name}
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200">
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
        <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg cursor-pointer transition-all duration-200">
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

      {/* Thumbnail Navigator */}
      <div className="w-full overflow-hidden px-3">
        <div className="flex gap-[2px] justify-center">
          {filteredMedia.map((item: MediaItem, i: number) => (
            <div key={i} onClick={() => mainSwiper?.slideTo(i)}>
              <Image
                src={item.thumbnail_url || item.resource_value}
                alt={item.name}
                width={60}
                height={40}
                className={`rounded-lg border-2 cursor-pointer object-cover transition-all duration-200 ${
                  activeIndex === i
                    ? "border-green-500 ring-2 ring-green-200 shadow-md"
                    : "border-gray-300 hover:border-green-500"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
