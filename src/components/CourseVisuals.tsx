"use client";

import { ChecklistItem, CTA, MediaItem } from "@/types/productTypes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPhoneFlip } from "react-icons/fa6";
import Slider from "./Slider";

const CourseVisuals = ({
  media,
  cta_text,
  checklist,
}: {
  media: MediaItem[];
  cta_text: CTA;
  checklist: ChecklistItem[];
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOutOfView, setIsOutOfView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;

    if (!container || !sticky) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          setIsOutOfView(true);
          setIsSticky(true);
        } else {
          setIsOutOfView(false);
          setIsSticky(false);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px 0px 0px",
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Original CourseVisuals */}
      <div>
        <div ref={containerRef} className="w-full bg-white shadow p-1">
          <Slider media={media} />
          {/* Course CTA Button */}
          <div className="px-3 flex flex-col gap-3 mt-4">
            <span className="text-3xl font-semibold">৳1000</span>
            <button className="py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition capitalize">
              {cta_text.value}
            </button>
          </div>
          {/* list of course features */}
          <div className="my-4 px-3">
            <h3 className="text-lg font-semibold py-4 text-gray-700">এই কোর্সে যা থাকছে</h3>
            <div>
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3 mb-2">
                  <Image src={item.icon} alt={item.text} width={20} height={20} />
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-[12px] text-gray-600">কোর্সটি সম্পর্কে বিস্তারিত জানতে</span>
          <a href="tel:16910" className="text-[12px] text-green-600 underline">
            <span className="flex items-center gap-1">
              <FaPhoneFlip /> ফোন করুন (16910)
            </span>
          </a>
        </div>
      </div>

      {/* Sticky CourseVisuals - Different appearance when out of view */}

      <div
        ref={stickyRef}
        className={`fixed top-[100px] z-50 ${
          isSticky && isOutOfView ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}>
        <div className="w-[380px] shadow">
          <div className="w-full h-[500px] bg-white shadow p-1">
            <Slider media={media} />
          </div>
        </div>
        <span>hello world</span>
      </div>
    </div>
  );
};

export default CourseVisuals;
