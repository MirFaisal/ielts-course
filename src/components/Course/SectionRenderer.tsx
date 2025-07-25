import { Section } from "@/types/productTypes";
import AboutSection from "./Sections/AboutSection";
import DefaultSection from "./Sections/DefaultSection";
import FaqSection from "./Sections/FaqSection";
import FeatureExplanationsSection from "./Sections/FeatureExplanationsSection";
import FeaturesSection from "./Sections/FeaturesSection";
import GroupJoinEngagementSection from "./Sections/GroupJoinEngagementSection";
import InstructorsSection from "./Sections/InstructorsSection";
import PointersSection from "./Sections/PointersSection";
import TestimonialsSection from "./Sections/TestimonialsSection";
import SectionWrapper from "./SectionWrapper";

interface SectionRendererProps {
  section: Section;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  const renderSectionContent = () => {
    switch (section.type) {
      case "instructors":
        return <InstructorsSection instructors={section.values} />;
      case "features":
        return <FeaturesSection features={section.values} />;
      case "pointers":
        return <PointersSection pointers={section.values} />;
      case "testimonials":
        return <TestimonialsSection />;
      case "faq":
        return <FaqSection faqs={section.values} />;
      case "group_join_engagement":
        return <GroupJoinEngagementSection engagements={section.values} />;
      case "about":
        return <AboutSection about={section.values} />;
      case "feature_explanations":
        return <FeatureExplanationsSection featureExplanations={section.values} />;
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
