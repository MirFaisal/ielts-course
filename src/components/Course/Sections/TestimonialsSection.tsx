"use client";

import { TestimonialsSectionProps } from "@/types/componentTypes";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TextTestimonialCard from "./TextTestimonialCard";
import VideoTestimonialCard from "./VideoTestimonialCard";

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  const toggleVideoPlay = (testimonialId: string) => {
    const newPlaying = new Set(playingVideos);
    if (newPlaying.has(testimonialId)) {
      newPlaying.delete(testimonialId);
    } else {
      newPlaying.add(testimonialId);
    }
    setPlayingVideos(newPlaying);
  };

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No testimonials available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        navigation={{
          nextEl: ".testimonial-button-next",
          prevEl: ".testimonial-button-prev",
        }}
        modules={[Navigation]}
        className="testimonials-swiper">
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id || index}>
            {testimonial.video_url ? (
              <VideoTestimonialCard
                testimonial={testimonial}
                isPlaying={playingVideos.has(testimonial.id || index.toString())}
                onTogglePlay={() => toggleVideoPlay(testimonial.id || index.toString())}
              />
            ) : (
              <TextTestimonialCard testimonial={testimonial} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="testimonial-button-prev absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 shadow-lg cursor-pointer transition-all duration-200 border border-gray-200 hidden md:block">
        <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div className="testimonial-button-next absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-black/50  rounded-full p-2 shadow-lg cursor-pointer transition-all duration-200 border border-gray-200 hidden md:block">
        <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
