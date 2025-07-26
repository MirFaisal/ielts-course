"use client";

import { TestimonialData } from "@/types/componentTypes";
import Image from "next/image";
import { useState } from "react";

interface TextTestimonialCardProps {
  testimonial: TestimonialData;
}

export default function TextTestimonialCard({ testimonial }: TextTestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Clean up escape sequences and convert to single line text
  const cleanText = (text: string) => {
    return text
      .replace(/\\n/g, " ") // Convert \n to spaces instead of newlines
      .replace(/\\t/g, " ") // Convert \t to spaces
      .replace(/\\"/g, '"') // Convert \" to actual quotes
      .replace(/\\\\/g, "\\") // Convert \\ to actual backslashes
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .trim();
  };

  const fullText = cleanText(testimonial.testimonial || "");
  const shouldTruncate = fullText.length > 150;
  const displayText = isExpanded ? fullText : truncateText(fullText, 150);

  return (
    <div className="testimonial bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full">
      {/* Text Content */}
      <div className="p-4 relative">
        {/* Testimonial Text */}
        <div className="mb-6 pt-8">
          <div>
            <p className="text-gray-700 text-sm leading-relaxed">{displayText}</p>
            {shouldTruncate && (
              <button
                onClick={toggleExpanded}
                className="text-green-600 hover:text-green-700 text-sm font-medium mt-2 transition-colors">
                {isExpanded ? "কম দেখুন" : "আরও দেখুন"}
              </button>
            )}
          </div>
        </div>
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
