"use client";
import { Course } from "@/types/productTypes";
import { useEffect, useMemo, useState } from "react";
import CourseNavigation from "./CourseNavigation";
import SectionRenderer from "./SectionRenderer";

export default function CourseDetails({ courseData }: { courseData: Course }) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isManualScroll, setIsManualScroll] = useState<boolean>(false);

  const scrollToSection = (sectionType: string) => {
    const element = document.getElementById(sectionType);
    if (element) {
      const navHeight = 120; // Account for sticky nav height + margin
      const elementPosition = element.offsetTop - navHeight;

      // Set flag to prevent intersection observer conflicts
      setIsManualScroll(true);
      setActiveSection(sectionType);

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Reset flag after scroll animation completes
      setTimeout(() => {
        setIsManualScroll(false);
      }, 1000);
    }
  };

  // Filter sections that have names and sort by order_idx
  const visibleSections = useMemo(
    () =>
      courseData.sections
        ?.filter((section) => section.values.length > 0 && section.type !== "offers")
        ?.sort((a, b) => a.order_idx - b.order_idx) || [],
    [courseData.sections],
  );

  // Generate anchor items from sections
  const anchorItems = useMemo(
    () =>
      visibleSections
        .filter((section) => section.name && section.name.trim() !== "")
        .map((section) => ({
          key: section.type,
          href: `#${section.type}`,
          title: section.name,
        })),
    [visibleSections],
  );

  // Set up intersection observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only update if not manually scrolling
        if (!isManualScroll) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-120px 0px -60% 0px",
      },
    );

    // Observe all section elements
    visibleSections.forEach((section) => {
      const element = document.getElementById(section.type);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [visibleSections, isManualScroll]);

  // Set initial active section
  useEffect(() => {
    if (visibleSections.length > 0 && !activeSection) {
      setActiveSection(visibleSections[0].type);
    }
  }, [visibleSections, activeSection]);

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-6">
      <div className="col-span-6 px-3 md:col-span-4 md:px-8">
        {/* Navigation Slider */}
        <CourseNavigation
          anchorItems={anchorItems}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

        {/* Render sections dynamically */}
        <div className="max-w-5xl">
          {visibleSections.map((section) => (
            <SectionRenderer key={section.type} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
