"use client";
import { Course } from "@/types/productTypes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseCart from "./CourseCart";
import Slider from "./Slider";

const CourseMetaResponsive = ({ courseData }: { courseData: Course }) => {
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
          // Container is out of view, show sticky element
          setIsOutOfView(true);
          setIsSticky(true);
        } else {
          // Container is in view, hide sticky element
          setIsOutOfView(false);
          setIsSticky(false);
        }
      },
      {
        threshold: 0.01,
        rootMargin: "-150px 0px 0px 0px", // Fixed: negative margin to trigger when element starts going out of view
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="block md:hidden">
      <div className="w-full bg-[url('/background/course_meta_bg.jpeg')] bg-cover bg-center flex flex-col items-center justify-center pt-2">
        <div className="p-2 mb-4 w-full overflow-hidden">
          <Slider media={courseData.media} />
        </div>
        <div className="flex flex-col gap-2 p-3 mb-3">
          <h1 className="text-2xl font-bold text-white">{courseData.title}</h1>
          {/* Course Rating */}
          <div className="flex gap-2 flex-wrap items-center">
            <span className="inline-block">
              <Image
                src="/elements/five_star.jpeg"
                alt="course rating"
                width={100}
                height={20}
                className="rounded"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </span>
            <span className="inline-block text-sm text-white font-medium">
              (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
            </span>
          </div>
          {/* Course Description */}
          <div
            className="text-gray-400 font-medium"
            dangerouslySetInnerHTML={{ __html: courseData.description }}></div>
        </div>
      </div>
      <div ref={containerRef}>
        <CourseCart
          media={courseData.media}
          cta_text={courseData.cta_text}
          checklist={courseData.checklist}
        />
      </div>
      <div
        ref={stickyRef}
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
          isSticky && isOutOfView ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          boxShadow: "0 -25px 50px -12px rgba(0, 0, 0, 0.25), 0 -10px 20px -5px rgba(0, 0, 0, 0.1)",
        }}>
        <div className="px-3 flex flex-col gap-3 py-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold text-gray-900">৳3850</span>
            <span className="text-lg text-gray-500 line-through">৳5000</span>
            <span className="relative bg-orange-400 text-white px-3 py-[2.8px] text-sm font-medium rounded ml-2">
              <span className="absolute top-[1px] left-[1px] transform -translate-x-full">
                <span className="block w-0 h-0 border-r-[12px] border-r-orange-400 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></span>
              </span>
              . ৳1150 ছাড়
            </span>
          </div>
          <button className="w-full py-3 bg-green-500 text-white font-semibold text-lg rounded-lg hover:bg-green-600 transition-colors duration-200 capitalize shadow-sm border-b-[7px] border-b-green-600">
            {courseData.cta_text.value}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMetaResponsive;
