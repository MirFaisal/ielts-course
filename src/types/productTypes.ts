export interface OldInfo {
  cat_id: number;
  course_id: number;
  platform: string;
  skills_cat_id: number;
  slug: string;
}

export interface MediaItem {
  name: string;
  resource_type: "image" | "video";
  resource_value: string;
  thumbnail_url?: string;
}

export interface ChecklistItem {
  id: string;
  icon: string;
  text: string;
  color: string;
  list_page_visibility: boolean;
}

export interface CTA {
  name: string;
  value: string;
}

export interface Seo {
  defaultMeta: SeoMeta[];
  title: string;
  description: string;
  keywords: string[];
  schema: SchemaItem[];
}

export interface SeoMeta {
  content: string;
  type: "property" | "name";
  value: string;
}

export interface SchemaItem {
  meta_name: string;
  meta_value: string;
  type: "ld-json";
}

export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: any[];
}

export interface Course {
  slug: string;
  id: number;
  title: string;
  description: string;
  platform: string;
  type: string;
  modality: string;
  old_info: OldInfo;
  start_at: string;
  media: MediaItem[];
  checklist: ChecklistItem[];
  seo: Seo;
  cta_text: CTA;
  sections: Section[];
  is_cohort_based_course: boolean;
  secondary_cta_group: any[];
  delivery_method: string;
}
