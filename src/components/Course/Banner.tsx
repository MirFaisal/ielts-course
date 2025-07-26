"use client";
import Image from "next/image";
import { useState } from "react";
export default function Banner() {
  const [isShown, setIsShown] = useState(true);
  return (
    isShown && (
      <div className="relative">
        <div className="relative w-full h-[150px]">
          <Image
            src="https://cdn.10minuteschool.com/images/dasktop_banner_1753270611489.png"
            alt="Banner Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <button
          onClick={() => setIsShown(false)}
          className="absolute top-2 right-2 text-white p-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  );
}
