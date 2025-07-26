"use client";

import { TestimonialData } from "@/types/componentTypes";
import Image from "next/image";

interface VideoTestimonialCardProps {
  testimonial: TestimonialData;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function VideoTestimonialCard({
  testimonial,
  isPlaying,
  onTogglePlay,
}: VideoTestimonialCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full">
      {/* Video Content */}
      <div className="relative p-4">
        {!isPlaying ? (
          /* Thumbnail View */
          <div
            className="relative w-full aspect-video cursor-pointer group bg-gray-100 overflow-hidden rounded-md"
            onClick={onTogglePlay}>
            <Image
              src={testimonial.thumb || `https://i.ytimg.com/vi/${testimonial.video_url}/hqdefault.jpg`}
              alt={`Video testimonial by ${testimonial.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
              fill
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
              <div className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg transition-all duration-200 transform group-hover:scale-110">
                <svg className="w-8 h-8 text-red-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          /* YouTube Iframe */
          <div className="relative w-full aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${testimonial.video_url}?autoplay=1`}
              title={`Testimonial by ${testimonial.name}`}
              className="w-full h-full rounded-md"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </div>

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

          {/* Name and Description */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm truncate">{testimonial.name}</h4>
            <p className="text-gray-500 text-xs truncate">{testimonial.description || "IELTS Student"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
