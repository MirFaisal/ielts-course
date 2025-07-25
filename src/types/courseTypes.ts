import { BaseSection } from "./sectionTypes";

// Course detail page types
export interface CourseDetailsProps {
  course: {
    title: string;
    sections: Array<{
      type: string;
      name: string;
      description?: string;
      bg_color?: string;
      order_idx?: number;
      values: BaseSection[];
    }>;
  };
}

// Course section navigation types
export interface CourseSection {
  type: string;
  name: string;
  description?: string;
  values: BaseSection[];
}
