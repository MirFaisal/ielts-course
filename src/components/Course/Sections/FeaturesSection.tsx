import { FeaturesSectionProps } from "@/types/componentTypes";
import Image from "next/image";

export default function FeaturesSection({ features = [] }: FeaturesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-900 rounded-lg px-2 md:px-0">
      {features.map((feature, index) => (
        <div key={feature.id || index} className="text-white p-4 md:p-6">
          <div className="flex items-start space-x-4">
            {/* Icon */}
            {feature.icon && (
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src={feature.icon} alt={feature.title || "Feature"} fill className="object-contain" />
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              {/* Title */}
              <h3 className="text-lg leading-[26px] font-semibold text-white mb-2">{feature.title}</h3>

              {/* Subtitle/Description */}
              {feature.subtitle && (
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{feature.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Show message if no features */}
      {features.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          <p>No features data available</p>
        </div>
      )}
    </div>
  );
}
