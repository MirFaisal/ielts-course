import { AboutSectionProps } from "@/types/componentTypes";
import { useState } from "react";

export default function AboutSection({ about = [] }: AboutSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {about.map((item, index) => {
        const itemId = item.id || index.toString();
        const isOpen = openItems.has(itemId);

        return (
          <div key={itemId}>
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(itemId)}
              className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between ${
                !isOpen && index < about.length - 1 ? "border-b border-dashed border-gray-200" : ""
              }`}>
              <div
                className="text-base flex justify-baseline font-medium text-gray-900 pr-4"
                dangerouslySetInnerHTML={{ __html: item.title || "" }}></div>

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
                  index < about.length - 1 ? "border-b border-dashed border-gray-200" : ""
                }`}>
                <div
                  className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.description || "" }}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Show message if no about data */}
      {about.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No about data available</p>
        </div>
      )}
    </div>
  );
}
