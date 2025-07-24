"use client";

import { MediaItem } from "@/types/productTypes";
import { useEffect, useRef, useState } from "react";
import Slider from "./Slider";

const CourseVisuals = ({ media }: { media: MediaItem[] }) => {
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
    <div className="relative w-full overflow-hidden shadow">
      {/* Original CourseVisuals */}
      <div ref={containerRef} className="w-full h-[500px] bg-white shadow p-2">
        <Slider media={media} />
      </div>

      {/* Sticky CourseVisuals - Different appearance when out of view */}
      <div
        ref={stickyRef}
        className={`fixed top-[100px] z-50 ${
          isSticky && isOutOfView ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}>
        <div className="w-[380px] shadow">
          <div className="w-full h-[500px] bg-white shadow p-2">
            <Slider media={media} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseVisuals;
