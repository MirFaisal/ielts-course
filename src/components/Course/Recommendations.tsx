"use client";

import { fetchRecommendations } from "@/lib/api";
import { RecommendationsResponse } from "@/types/recommendationTypes";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "./CourseCard";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await fetchRecommendations();
        setRecommendations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  if (loading) {
    return (
      <section className="py-16 max-w-7xl mx-auto recommendations">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-64 mb-4"></div>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-80">
                  <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 max-w-7xl mx-auto recommendations">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            <p>Error loading recommendations: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!recommendations?.data?.products?.length) {
    return null;
  }

  return (
    <section className="py-16 max-w-7xl mx-auto recommendations">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">আপনার জন্য আরও কিছু কোর্স</h2>
        </div>

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
            {recommendations.data.products.map((product) => (
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
      </div>
    </section>
  );
}
