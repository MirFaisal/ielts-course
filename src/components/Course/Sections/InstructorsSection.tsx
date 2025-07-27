import { InstructorsSectionProps } from "@/types/componentTypes";
import Image from "next/image";

export default function InstructorsSection({ instructors = [] }: InstructorsSectionProps) {
  return (
    <div className="space-y-4">
      {instructors.map((instructor, index) => (
        <div
          key={instructor.slug || instructor.id || index}
          className="bg-white md:border border-gray-200 rounded-lg md:p-6">
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 mt-2 md:mt-0">
              <Image
                src={instructor.image || "/api/placeholder/80/80"}
                alt={instructor.name || "Instructor"}
                fill
                className="object-cover"
              />
            </div>

            {/* Instructor Details */}
            <div className="flex-1">
              {/* Name with Arrow */}
              <div className="flex items-center space-x-2 cursor-pointer hover:text-green-400">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-green-400">
                  {instructor.name}
                </h3>
                {instructor.has_instructor_page && (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>

              {/* Description with HTML */}
              {instructor.description && (
                <div
                  className="text-gray-700 text-sm font-medium leading-relaxed mb-2"
                  dangerouslySetInnerHTML={{ __html: instructor.description }}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Show message if no instructors */}
      {instructors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No instructors data available</p>
        </div>
      )}
    </div>
  );
}
