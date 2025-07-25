import { PointersSectionProps } from "@/types/componentTypes";

export default function PointersSection({ pointers = [] }: PointersSectionProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pointers.map((pointer, index) => (
          <div key={pointer.id || index} className="flex items-start space-x-3">
            {/* Checkmark Icon */}
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p className="text-gray-800 text-sm leading-relaxed">{pointer.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show message if no pointers */}
      {pointers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No pointers data available</p>
        </div>
      )}
    </div>
  );
}
