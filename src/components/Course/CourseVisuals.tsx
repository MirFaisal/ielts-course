"use client";

import { ChecklistItem, CTA, MediaItem } from "@/types/productTypes";
import { useEffect, useRef, useState } from "react";
import CourseCart from "./CourseCart";

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
      <div ref={containerRef}>
        <CourseCart enableSlider={true} media={media} cta_text={cta_text} checklist={checklist} />
      </div>

      {/* Sticky CourseVisuals - Different appearance when out of view */}
      <div
        ref={stickyRef}
        className={`fixed top-[100px] z-50 w-[290px] lg:w-[380px] ${
          isSticky && isOutOfView ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}>
        <CourseCart media={media} cta_text={cta_text} checklist={checklist} />
      </div>
    </div>
  );
};

export default CourseVisuals;
