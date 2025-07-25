import { FeatureExplanationsSectionProps } from "@/types/componentTypes";
import Image from "next/image";

export default function FeatureExplanationsSection({
  featureExplanations = [],
}: FeatureExplanationsSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      {featureExplanations.map((feature, index) => (
        <div key={feature.id || index}>
          <div className="bg-white rounded-lg p-6 flex justify-between">
            <section className="flex-1">
              {/* Title */}
              <h3 className="text-base font-medium text-gray-900 mb-4">{feature.title}</h3>

              {/* Content Layout: Checklist Left, Image Right */}

              <div className="flex items-start gap-8">
                {/* Checklist - Left Side */}
                {feature.checklist && feature.checklist.length > 0 && (
                  <div className="flex-1">
                    <ul className="space-y-2">
                      {feature.checklist.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          {/* Checkmark Icon */}
                          <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          {/* Text */}
                          <span className="text-sm font-medium text-gray-700 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
            {/* Image - Right Side */}
            {feature.file_url && (
              <div className="flex-shrink-0">
                <div className="relative w-60 h-60 overflow-hidden">
                  <Image
                    src={feature.file_url}
                    alt={feature.title || "Feature"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Divider - only show if not the last item */}
          {index < featureExplanations.length - 1 && (
            <div className="border-b border-gray-200 w-[95%] mx-auto"></div>
          )}
        </div>
      ))}

      {/* Show message if no feature explanations */}
      {featureExplanations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No feature explanations data available</p>
        </div>
      )}
    </div>
  );
}
