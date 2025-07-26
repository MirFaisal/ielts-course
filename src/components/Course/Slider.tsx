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
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());

  // Filter out sqr_img items
  const filteredMedia = media.filter((item) => item.name !== "sqr_img" && item.name !== "thumbnail");

  const toggleVideoPlay = (videoIndex: number) => {
    setPlayingVideos((prev) => {
      const isCurrentlyPlaying = prev.has(videoIndex);

      if (isCurrentlyPlaying) {
        // Stop the video - remove from playing list
        const updated = new Set(prev);
        updated.delete(videoIndex);
        return updated;
      } else {
        // Start the video - add to playing list
        const updated = new Set(prev);
        updated.add(videoIndex);
        return updated;
      }
    });
  };

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
                    {!playingVideos.has(i) ? (
                      /* Thumbnail View */
                      <div
                        className="relative w-full aspect-video cursor-pointer group bg-gray-100 overflow-hidden"
                        onClick={() => toggleVideoPlay(i)}>
                        <Image
                          src={item.thumbnail_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          fill
                        />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
                          <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg transition-all duration-200 transform group-hover:scale-110">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="36"
                              height="36"
                              fill="none"
                              viewBox="0 0 56 56">
                              <circle cx="28" cy="28" r="28" fill="#fff" fillOpacity="0.5"></circle>
                              <circle cx="27.999" cy="28" r="25.415" fill="#fff"></circle>
                              <path
                                fill="#1CAB55"
                                d="M37.492 26.268c1.334.77 1.334 2.694 0 3.464l-12.738 7.355c-1.334.77-3-.193-3-1.732v-14.71c0-1.539 1.666-2.501 3-1.732l12.738 7.355z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* YouTube Iframe */
                      <iframe
                        src={`https://www.youtube.com/embed/${item.resource_value}?autoplay=1`}
                        title={item.name}
                        className="w-full h-full rounded-md"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    )}
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
        <div className="swiper-button-prev-custom absolute left-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full shadow-lg cursor-pointer transition-all duration-200">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            color="white"
            style={{ color: "white" }}
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"></path>
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-2 top-1/2 transform -translate-y-1/2 z-10 rounded-full shadow-lg cursor-pointer transition-all duration-200">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            color="white"
            style={{ color: "white" }}
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"></path>
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
