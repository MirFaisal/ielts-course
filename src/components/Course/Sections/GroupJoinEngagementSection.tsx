import Image from "next/image";

interface EngagementData {
  id?: string;
  title?: string;
  description?: string;
  title_color?: string;
  description_color?: string;
  thumbnail?: string;
  top_left_icon_img?: string;
  background?: {
    image?: string;
    primary_color?: string;
    secondary_color?: string;
  };
  cta?: {
    text?: string;
    clicked_url?: string;
    color?: string;
  };
  [key: string]: unknown;
}

interface GroupJoinEngagementSectionProps {
  engagements?: EngagementData[];
}

export default function GroupJoinEngagementSection({ engagements = [] }: GroupJoinEngagementSectionProps) {
  return (
    <div className="space-y-6">
      {engagements.map((engagement, index) => (
        <div key={engagement.id || index} className="relative">
          {/* Card Container */}
          <div
            className="relative rounded-2xl overflow-hidden p-8 min-h-[240px] flex items-center"
            style={{
              backgroundImage: engagement.background?.image
                ? `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${engagement.background.image})`
                : "linear-gradient(135deg, #1a1a2e, #16213e)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}>
            {/* Content Container */}
            <div className="flex items-center justify-between w-full">
              {/* Left Content */}
              <div className="flex-1 max-w-md">
                {/* Top Left Icon with Title */}
                <div className="flex gap-3">
                  {engagement.top_left_icon_img && (
                    <div className="relative w-[190px] h-[70px]">
                      <Image src={engagement.top_left_icon_img} alt="Icon" fill className="object-contain" />
                    </div>
                  )}
                </div>

                {/* Title */}
                {engagement.title && (
                  <h3
                    className="text-xl font-bold mb-3 leading-tight"
                    style={{
                      color: engagement.title_color || "#ffffff",
                    }}>
                    {engagement.title}
                  </h3>
                )}

                {/* Description */}
                {engagement.description && (
                  <p
                    className="text-[14px] leading-relaxed mb-6"
                    style={{
                      color: engagement.description_color || "#e5e7eb",
                    }}>
                    {engagement.description}
                  </p>
                )}

                {/* CTA Button */}
                {engagement.cta && (
                  <a
                    href={engagement.cta.clicked_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors duration-200">
                    {engagement.cta.text}
                  </a>
                )}
              </div>

              {/* Right Thumbnail */}
              {engagement.thumbnail && (
                <div className="flex-shrink-0 ml-8">
                  <div className="relative w-80 h-44 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={engagement.thumbnail}
                      alt={engagement.title || "Engagement"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Show message if no engagements */}
      {engagements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No engagement data available</p>
        </div>
      )}
    </div>
  );
}
