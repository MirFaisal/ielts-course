import DefaultSection from "./Sections/DefaultSection";
import FaqSection from "./Sections/FaqSection";
import FeaturesSection from "./Sections/FeaturesSection";
import InstructorsSection from "./Sections/InstructorsSection";
import PointersSection from "./Sections/PointersSection";
import TestimonialsSection from "./Sections/TestimonialsSection";
import SectionWrapper from "./SectionWrapper";

interface SectionValue {
  id?: string;
  name?: string;
  image?: string;
  description?: string;
  short_description?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  text?: string;
  profile_image?: string;
  testimonial?: string;
  question?: string;
  answer?: string;
  [key: string]: unknown;
}

interface Section {
  type: string;
  name: string;
  description?: string;
  values: SectionValue[];
}

interface SectionRendererProps {
  section: Section;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  const renderSectionContent = () => {
    switch (section.type) {
      case "instructors":
        return <InstructorsSection />;
      case "features":
        return <FeaturesSection />;
      case "pointers":
        return <PointersSection />;
      case "testimonials":
        return <TestimonialsSection />;
      case "faq":
        return <FaqSection />;
      default:
        return <DefaultSection />;
    }
  };

  return (
    <SectionWrapper sectionId={section.type} title={section.name}>
      {renderSectionContent()}
    </SectionWrapper>
  );
}
