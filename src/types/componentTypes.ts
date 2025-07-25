import { BaseSection } from "./sectionTypes";

// Instructor Section Types
export interface InstructorData extends BaseSection {
  profile_image?: string;
  education?: string;
  image?: string;
  short_description?: string;
  slug?: string;
  has_instructor_page?: boolean;
}

export interface InstructorsSectionProps {
  instructors?: InstructorData[];
}

// Features Section Types
export interface FeatureData extends BaseSection {
  icon?: string;
  text?: string;
  title?: string;
  subtitle?: string;
}

export interface FeaturesSectionProps {
  features?: FeatureData[];
}

// Pointers Section Types
export interface PointerData extends BaseSection {
  text?: string;
  color?: string;
  icon?: string;
}

export interface PointersSectionProps {
  pointers?: PointerData[];
}

// About Section Types
export interface AboutData extends BaseSection {
  title?: string;
  icon?: string;
}

export interface AboutSectionProps {
  about?: AboutData[];
}

// FAQ Section Types
export interface FAQData extends BaseSection {
  question?: string;
  answer?: string;
}

export interface FAQSectionProps {
  faqs?: FAQData[];
}

// Group Join Engagement Section Types
export interface GroupJoinEngagementData extends BaseSection {
  title?: string;
  subtitle?: string;
  image?: string;
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
}

export interface GroupJoinEngagementSectionProps {
  engagements?: GroupJoinEngagementData[];
}

// Feature Explanations Section Types
export interface FeatureExplanationData extends BaseSection {
  title?: string;
  checklist?: string[];
  file_type?: string;
  file_url?: string;
  video_thumbnail?: string;
}

export interface FeatureExplanationsSectionProps {
  featureExplanations?: FeatureExplanationData[];
}

// Testimonials Section Types (placeholder for future implementation)
export interface TestimonialData extends BaseSection {
  profile_image?: string;
  testimonial?: string;
}

export interface TestimonialsSectionProps {
  testimonials?: TestimonialData[];
}
