interface InstructorValue {
  description: string;
  has_instructor_page: boolean;
  image: string;
  name: string;
  short_description: string;
  slug: string;
}

export interface InstructorBlock {
  type: "instructors";
  name: string;
  description?: string;
  bg_color?: string;
  order_idx: number;
  values: InstructorValue[];
}
