"use client";

import { TestimonialsSectionProps } from "@/types/componentTypes";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<string>>(new Set());
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  const toggleExpanded = (testimonialId: string) => {
    const newExpanded = new Set(expandedTestimonials);
    if (newExpanded.has(testimonialId)) {
      newExpanded.delete(testimonialId);
    } else {
      newExpanded.add(testimonialId);
    }
    setExpandedTestimonials(newExpanded);
  };

  const toggleVideoPlay = (testimonialId: string) => {
    const newPlaying = new Set(playingVideos);
    if (newPlaying.has(testimonialId)) {
      newPlaying.delete(testimonialId);
    } else {
      newPlaying.add(testimonialId);
    }
    setPlayingVideos(newPlaying);
  };

  const truncateText = (text: string, maxLength: number = 130) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength);
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
        onSwiper={setSwiperRef}
        className="testimonials-swiper">
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id || index}>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full">
              {/* Video or Text Content */}
              {testimonial.video_url ? (
                /* Video Testimonial */
                <div className="relative p-4">
                  {!playingVideos.has(testimonial.id || index.toString()) ? (
                    /* Thumbnail View */
                    <div
                      className="relative w-full aspect-video cursor-pointer group bg-white"
                      onClick={() => toggleVideoPlay(testimonial.id || index.toString())}>
                      <Image
                        src={
                          testimonial.thumb ||
                          `https://img.youtube.com/vi/${testimonial.video_url}/maxresdefault.jpg`
                        }
                        alt={`Video testimonial by ${testimonial.name}`}
                        fill
                        className="object-cover rounded-md"
                        unoptimized
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
                        <Image
                          src="https://10minuteschool.com/images/annual_exam/play_icon_2.svg"
                          alt="Quote Icon"
                          width={100}
                          height={100}
                        />
                      </div>

                      {/* Quote Icon for Video */}
                      {/* <div className="absolute top-4 left-4">
                        <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                      </div> */}
                    </div>
                  ) : (
                    /* YouTube Iframe */
                    <div className="relative w-full aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${testimonial.video_url}?autoplay=1`}
                        title={`Testimonial by ${testimonial.name}`}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  )}
                </div>
              ) : (
                /* Text Testimonial */
                <div className="p-4 relative">
                  {/* Quote Icon */}
                  {/* <div className="absolute top-[-10px] z-[50]">
                    <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div> */}

                  {/* Testimonial Text */}
                  <div className="mb-6">
                    {(() => {
                      const testimonialId = testimonial.id || index.toString();
                      const isExpanded = expandedTestimonials.has(testimonialId);
                      const fullText = testimonial.testimonial || "";
                      const shouldTruncate = fullText.length > 150;
                      const displayText = isExpanded ? fullText : truncateText(fullText, 150);

                      return (
                        <div>
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                            {displayText}
                          </p>
                          {shouldTruncate && (
                            <button
                              onClick={() => toggleExpanded(testimonialId)}
                              className="text-green-600 hover:text-green-700 text-sm font-medium mt-2 transition-colors">
                              {isExpanded ? "কম দেখুন" : "আরও দেখুন"}
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Profile Section */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  {/* Profile Image */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.profile_image || "/api/placeholder/48/48"}
                      alt={testimonial.name || "Student"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name and Score */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{testimonial.name}</h4>
                    <p className="text-gray-500 text-xs">
                      {testimonial.description || testimonial.testimonial}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="testimonial-button-prev absolute -left-11 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 shadow-lg cursor-pointer transition-all duration-200 border border-gray-200">
        <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div className="testimonial-button-next absolute -right-11 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-gray-50 rounded-full p-2 shadow-lg cursor-pointer transition-all duration-200 border border-gray-200">
        <svg className="w-5 h-5 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
