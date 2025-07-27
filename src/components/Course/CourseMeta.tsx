"use client";
import { Course } from "@/types/productTypes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CourseCart from "./CourseCart";
import CourseVisuals from "./CourseVisuals";
import Slider from "./Slider";

const CourseMeta = ({ courseData }: { courseData: Course }) => {
  return (
    <>
      <div className="hidden md:block">
        <div className="w-full bg-[url('/background/course_meta_bg.jpeg')] bg-cover bg-center h-64 flex items-center justify-center ">
          <div className="max-w-6xl mx-auto grid grid-cols-6 justify-between items-center h-full gap-4">
            {/* Course Title and Rating */}
            <div className="col-span-4 h-full flex items-center justify-center">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold text-white">{courseData.title}</h1>
                {/* Course Rating */}
                <div className="flex gap-2">
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
                  <span className="inline-block text-white font-medium">
                    (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
                  </span>
                </div>
                {/* Course Description */}
                <div
                  className="text-gray-400 font-medium"
                  dangerouslySetInnerHTML={{ __html: courseData.description }}></div>
              </div>
            </div>
            {/* Course Image and cta */}
            <div className="col-span-2 h-full relative">
              <div className="absolute top-[50px] left-0 w-full flex items-center justify-center">
                <CourseVisuals
                  media={courseData.media}
                  cta_text={courseData.cta_text}
                  checklist={courseData.checklist}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseMetaResponsive courseData={courseData} />
    </>
  );
};

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
          <div className="flex gap-2">
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
              (82.6% শিক্ষার্থী কোর্স শেষে ৫ রেটিং দিয়েছেন)
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
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
          isSticky && isOutOfView ? "translate-y-0" : "translate-y-full"
        }`}>
        <div className="px-3 flex flex-col gap-3 py-3">
          <span className="text-3xl font-semibold">৳1000</span>
          <button className="w-full py-3 bg-green-500 text-white font-semibold text-lg rounded-lg hover:bg-green-600 transition-colors duration-200 capitalize shadow-sm border-b-[7px] border-b-green-600">
            {courseData.cta_text.value}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMeta;
