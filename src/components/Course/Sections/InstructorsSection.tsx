import Image from "next/image";

interface SectionValue {
  id?: string;
  name?: string;
  image?: string;
  description?: string;
  short_description?: string;
  slug?: string;
  has_instructor_page?: boolean;
  [key: string]: unknown;
}

interface InstructorsSectionProps {
  instructors?: SectionValue[];
}

export default function InstructorsSection({ instructors = [] }: InstructorsSectionProps) {
  return (
    <div className="space-y-4">
      {instructors.map((instructor, index) => (
        <div
          key={instructor.slug || instructor.id || index}
          className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            {/* Profile Image */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
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
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
              </div>

              {/* Description with HTML */}
              {instructor.description && (
                <div
                  className="text-gray-700 text-sm leading-relaxed mb-2"
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
