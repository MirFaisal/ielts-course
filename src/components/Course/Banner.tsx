"use client";
import Image from "next/image";
import { useState } from "react";
export default function Banner() {
  const [isShown, setIsShown] = useState(true);
  return (
    isShown && (
      <div className="relative w-full">
        {/* Desktop Banner */}
        <div className="relative w-full h-[10vh] hidden lg:block">
          <Image
            src="https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png"
            alt="Banner Image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Mobile Banner */}
        <div className="relative w-full h-[80px] md:h-[130px] lg:hidden">
          <Image
            src="https://cdn.10minuteschool.com/images/mobile_banner_1753355543677.png"
            alt="Banner Image"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <button
          onClick={() => setIsShown(false)}
          className="absolute top-1 right-1 md:top-2 md:right-2 z-10 text-white md:p-2 ">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  );
}
