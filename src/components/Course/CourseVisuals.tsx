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
  const [isFooterVisible, setIsFooterVisible] = useState(false);
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

    // Footer observer to hide sticky when footer comes into view
    const footerObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // When footer is visible, mark it as visible
          setIsFooterVisible(true);
        } else {
          // When footer is not visible, mark it as not visible
          setIsFooterVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before footer comes into view
      },
    );

    observer.observe(container);

    // Find and observe the footer element
    const footer = document.querySelector("footer");
    if (footer) {
      footerObserver.observe(footer);
    }

    return () => {
      observer.disconnect();
      footerObserver.disconnect();
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
        className={`fixed top-[100px] z-40 w-full md:w-[290px] lg:w-[380px] ${
          isSticky && isOutOfView && !isFooterVisible ? "opacity-100 " : "opacity-0 pointer-events-none"
        }`}>
        <CourseCart media={media} cta_text={cta_text} checklist={checklist} />
      </div>
    </div>
  );
};

export default CourseVisuals;
