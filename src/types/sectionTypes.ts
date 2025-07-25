import React from "react";

// Common types used across sections
export interface BaseSection {
  id?: string;
  name?: string;
  description?: string;
  [key: string]: unknown;
}

// Section wrapper types
export interface SectionWrapperProps {
  sectionId: string;
  title?: string;
  children: React.ReactNode;
}

// Course navigation types
export interface NavigationItem {
  type: string;
  name: string;
}

export interface AnchorItem {
  key: string;
  href: string;
  title: string;
}

export interface CourseNavigationProps {
  anchorItems: AnchorItem[];
  activeSection: string;
  onSectionClick: (sectionType: string) => void;
}
