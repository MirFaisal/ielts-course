"use client";

import { FAQSectionProps } from "@/types/componentTypes";
import { useState } from "react";

export default function FAQSection({ faqs = [] }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // Show only first 5 items initially, or all if showAll is true
  const displayedFAQs = showAll ? faqs : faqs.slice(0, 5);
  const hasMoreItems = faqs.length > 5;

  return (
    <div className="relative">
      <div className="md:border border-gray-200 rounded-lg overflow-hidden bg-white">
        {displayedFAQs.map((faq, index) => {
          if (!faq.id || !faq.question || !faq.answer) return null;

          const isOpen = openItems.has(faq.id);

          return (
            <div key={faq.id}>
              {/* Accordion Header */}
              <button
                onClick={() => toggleItem(faq.id!)}
                className={`w-full px-2 md:px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between ${
                  !isOpen && index < displayedFAQs.length - 1 ? "border-b border-dashed border-gray-200" : ""
                }`}>
                <div className="text-sm md:text-base font-semibold text-gray-900 pr-4">{faq.question}</div>

                {/* Arrow Icon */}
                <div className="flex-shrink-0">
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div
                  className={`px-6 py-4 bg-white ${
                    index < displayedFAQs.length - 1 ? "border-b border-dashed border-gray-200" : ""
                  }`}>
                  <div
                    className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Show message if no FAQs */}
        {faqs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No FAQ data available</p>
          </div>
        )}
      </div>

      {/* See All Button - Outside the container */}
      {hasMoreItems && !showAll && (
        <div className="flex justify-center mt-4 absolute -translate-x-1/2 left-1/2 bottom-[-12px]">
          <button
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors bg-white rounded-full px-3 shadow-md">
            <span>See all</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Show Less Button - Outside the container */}
      {showAll && hasMoreItems && (
        <div className="flex justify-center mt-4 absolute -translate-x-1/2 left-1/2 bottom-[-12px]">
          <button
            onClick={() => setShowAll(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium transition-colors bg-white rounded-full px-3 shadow-md">
            <span>Show less</span>
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
